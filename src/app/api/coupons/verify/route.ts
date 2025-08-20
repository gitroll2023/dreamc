import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { code, phone, programType } = await request.json();
    
    if (!code || code.trim() === '') {
      return NextResponse.json(
        { success: false, error: '체험권 코드를 입력해주세요' },
        { status: 400 }
      );
    }
    
    if (!phone || phone.trim() === '') {
      return NextResponse.json(
        { success: false, error: '전화번호를 입력해주세요' },
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
    
    // 프로그램 타입이 제공된 경우, 해당 프로그램에 대한 사용 이력 확인
    let isFirstTime = true;
    let discountInfo = null;
    
    if (programType) {
      const previousExperience = await prisma.userExperienceHistory.findUnique({
        where: {
          userPhone_programType: {
            userPhone: phone.trim(),
            programType: programType
          }
        }
      });
      
      isFirstTime = !previousExperience;
      
      // 프로그램별 할인 정보 설정
      const discountRates: { [key: string]: { discount: number, firstTimePrice: number, regularPrice: number } } = {
        'cocktail': { discount: 88, firstTimePrice: 10000, regularPrice: 80000 },
        'baking': { discount: 83, firstTimePrice: 10000, regularPrice: 60000 },
        'craft': { discount: 89, firstTimePrice: 5000, regularPrice: 45000 },
        'boardgame': { discount: 33, firstTimePrice: 2000, regularPrice: 3000 },
        'calligraphy': { discount: 88, firstTimePrice: 5000, regularPrice: 40000 },
        'photo': { discount: 90, firstTimePrice: 5000, regularPrice: 50000 },
        'bookclub': { discount: 100, firstTimePrice: 0, regularPrice: 20000 },
        'humanities': { discount: 85, firstTimePrice: 30000, regularPrice: 200000 }
      };
      
      const programDiscount = discountRates[programType] || { discount: 80, firstTimePrice: 10000, regularPrice: 50000 };
      
      discountInfo = {
        isFirstTime,
        discountRate: isFirstTime ? programDiscount.discount : 0,
        finalPrice: isFirstTime ? programDiscount.firstTimePrice : programDiscount.regularPrice,
        regularPrice: programDiscount.regularPrice,
        message: isFirstTime 
          ? `첫 체험 ${programDiscount.discount}% 할인이 적용됩니다` 
          : '재체험은 정가로 이용하실 수 있습니다'
      };
    }
    
    // 유효한 쿠폰
    return NextResponse.json({
      success: true,
      status: 'valid',
      message: '사용 가능한 체험권입니다',
      coupon: formatCoupon(coupon),
      discountInfo
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