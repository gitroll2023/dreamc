import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// 쿠폰 코드 생성 함수
function generateCouponCode(): string {
  const prefix = 'DC';
  const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  const suffix = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${randomNum}-${suffix}`;
}

// 한국 시간 기준으로 15일 후 날짜 계산
function getExpiryDate(): Date {
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + 15);
  return expiry;
}

export async function POST(request: NextRequest) {
  try {
    const { recipientName } = await request.json();
    
    // 유니크한 쿠폰 코드 생성 (중복 체크)
    let code = generateCouponCode();
    let attempts = 0;
    
    while (attempts < 10) {
      const existing = await prisma.coupon.findUnique({
        where: { code }
      });
      
      if (!existing) break;
      
      code = generateCouponCode();
      attempts++;
    }
    
    if (attempts >= 10) {
      return NextResponse.json(
        { success: false, error: '쿠폰 생성에 실패했습니다. 다시 시도해주세요.' },
        { status: 500 }
      );
    }
    
    // 쿠폰 생성
    const coupon = await prisma.coupon.create({
      data: {
        code,
        recipientName: recipientName || undefined,
        expiryDate: getExpiryDate(),
      }
    });
    
    // 한국 시간으로 날짜 포맷팅
    const issueDate = new Date(coupon.issueDate).toLocaleDateString('ko-KR', { 
      timeZone: 'Asia/Seoul' 
    });
    const expiryDate = new Date(coupon.expiryDate).toLocaleDateString('ko-KR', { 
      timeZone: 'Asia/Seoul' 
    });
    
    return NextResponse.json({
      success: true,
      coupon: {
        ...coupon,
        issueDate,
        expiryDate
      }
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: '쿠폰 생성 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}