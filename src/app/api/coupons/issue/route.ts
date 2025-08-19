import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { recipientName } = await request.json();
    
    if (!recipientName || recipientName.trim() === '') {
      return NextResponse.json(
        { success: false, error: '수령인 이름을 입력해주세요' },
        { status: 400 }
      );
    }
    
    // 쿠폰 코드 생성 (고유성 보장)
    let couponCode: string;
    let isUnique = false;
    
    while (!isUnique) {
      couponCode = generateCouponCode();
      const existing = await prisma.coupon.findUnique({
        where: { code: couponCode }
      });
      if (!existing) {
        isUnique = true;
      }
    }
    
    // 한국 시간으로 발급일과 만료일 계산
    const kstOffset = 9 * 60; // KST is UTC+9
    const now = new Date();
    const kstTime = new Date(now.getTime() + (kstOffset - now.getTimezoneOffset()) * 60 * 1000);
    
    // 발급일 (한국 시간 기준)
    const issueDate = new Date(kstTime);
    
    // 만료일 계산 (15일 후)
    const expiryDate = new Date(kstTime);
    expiryDate.setDate(expiryDate.getDate() + 15);
    
    // DB에 쿠폰 저장
    const coupon = await prisma.coupon.create({
      data: {
        code: couponCode!,
        recipientName: recipientName.trim(),
        issueDate,
        expiryDate,
      }
    });
    
    // 한국 시간으로 날짜 포맷팅
    const formatKoreanDate = (date: Date) => {
      return date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        timeZone: 'Asia/Seoul'
      }).replace(/\. /g, '년 ').replace(/\./g, '월 ').replace(/$/g, '일');
    };
    
    return NextResponse.json({
      success: true,
      coupon: {
        id: coupon.id,
        code: coupon.code,
        recipientName: coupon.recipientName,
        issueDate: formatKoreanDate(coupon.issueDate),
        expiryDate: formatKoreanDate(coupon.expiryDate),
      }
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: '쿠폰 발급 중 오류가 발생했습니다' },
      { status: 500 }
    );
  }
}

// 쿠폰 코드 생성 함수
function generateCouponCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = 'DC-';
  for (let i = 0; i < 8; i++) {
    if (i === 4) code += '-';
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}