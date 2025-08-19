import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json();
    
    if (!code || code.trim() === '') {
      return NextResponse.json(
        { success: false, error: '쿠폰 코드를 입력해주세요' },
        { status: 400 }
      );
    }
    
    // DB에서 쿠폰 조회
    const coupon = await prisma.coupon.findUnique({
      where: { code: code.trim().toUpperCase() }
    });
    
    if (!coupon) {
      return NextResponse.json({
        success: false,
        status: 'invalid',
        message: '유효하지 않은 쿠폰 코드입니다'
      });
    }
    
    // 현재 시간 (한국 시간)
    const now = new Date();
    
    // 만료 확인
    if (coupon.expiryDate < now) {
      return NextResponse.json({
        success: false,
        status: 'expired',
        message: '만료된 쿠폰입니다',
        coupon: formatCoupon(coupon)
      });
    }
    
    // 사용 여부 확인
    if (coupon.isUsed) {
      return NextResponse.json({
        success: false,
        status: 'used',
        message: '이미 사용된 쿠폰입니다',
        coupon: formatCoupon(coupon)
      });
    }
    
    // 유효한 쿠폰
    return NextResponse.json({
      success: true,
      status: 'valid',
      message: '사용 가능한 쿠폰입니다',
      coupon: formatCoupon(coupon)
    });
    
  } catch (error) {
    return NextResponse.json(
      { success: false, error: '쿠폰 확인 중 오류가 발생했습니다' },
      { status: 500 }
    );
  }
}

// 쿠폰 정보 포맷팅
function formatCoupon(coupon: any) {
  const formatKoreanDate = (date: Date) => {
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      timeZone: 'Asia/Seoul'
    }).replace(/\. /g, '년 ').replace(/\./g, '월 ').replace(/$/g, '일');
  };
  
  return {
    code: coupon.code,
    recipientName: coupon.recipientName || '미지정',
    issueDate: formatKoreanDate(coupon.issueDate),
    expiryDate: formatKoreanDate(coupon.expiryDate),
    isUsed: coupon.isUsed,
    usedAt: coupon.usedAt ? formatKoreanDate(coupon.usedAt) : null,
    usedProgram: coupon.usedProgram
  };
}