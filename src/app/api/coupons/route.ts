import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    // 쿠폰 목록 조회 (최신순)
    const coupons = await prisma.coupon.findMany({
      orderBy: {
        createdAt: 'desc'
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
    
    const formattedCoupons = coupons.map(coupon => ({
      id: coupon.id,
      code: coupon.code,
      recipientName: coupon.recipientName || '미지정',
      issueDate: formatKoreanDate(coupon.issueDate),
      expiryDate: formatKoreanDate(coupon.expiryDate),
      isUsed: coupon.isUsed,
      usedAt: coupon.usedAt ? formatKoreanDate(coupon.usedAt) : null,
      usedProgram: coupon.usedProgram,
      status: getStatus(coupon)
    }));
    
    return NextResponse.json({
      success: true,
      coupons: formattedCoupons,
      total: coupons.length
    });
    
  } catch (error) {
    return NextResponse.json(
      { success: false, error: '쿠폰 목록 조회 중 오류가 발생했습니다' },
      { status: 500 }
    );
  }
}

// 쿠폰 상태 판단
function getStatus(coupon: any): string {
  const now = new Date();
  
  if (coupon.isUsed) {
    return '사용완료';
  } else if (coupon.expiryDate < now) {
    return '만료';
  } else {
    return '사용가능';
  }
}