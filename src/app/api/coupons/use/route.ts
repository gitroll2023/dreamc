import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { 
      code, 
      usedProgram, 
      usedBy, 
      phone, 
      programType, 
      programTitle,
      originalPrice,
      discountRate,
      finalPrice,
      dataCollectionAgreed = true,
      marketingAgreed = false
    } = await request.json();
    
    if (!code) {
      return NextResponse.json(
        { success: false, error: '쿠폰 코드를 입력해주세요.' },
        { status: 400 }
      );
    }
    
    // 쿠폰 조회
    const coupon = await prisma.coupon.findUnique({
      where: { code: code.toUpperCase() }
    });
    
    if (!coupon) {
      return NextResponse.json({
        success: false,
        error: '유효하지 않은 쿠폰 코드입니다.'
      }, { status: 404 });
    }
    
    // 이미 사용된 쿠폰인지 확인
    if (coupon.isUsed) {
      return NextResponse.json({
        success: false,
        error: '이미 사용된 쿠폰입니다.'
      }, { status: 400 });
    }
    
    // 만료 확인
    const now = new Date();
    const expiryDate = new Date(coupon.expiryDate);
    
    if (expiryDate < now) {
      return NextResponse.json({
        success: false,
        error: '만료된 쿠폰입니다.'
      }, { status: 400 });
    }
    
    // 사용자의 체험 이력 확인
    let isFirstTime = true;
    if (phone && programType) {
      const previousExperience = await prisma.userExperienceHistory.findUnique({
        where: {
          userPhone_programType: {
            userPhone: phone,
            programType: programType
          }
        }
      });
      isFirstTime = !previousExperience;
    }
    
    // 트랜잭션으로 쿠폰 사용 처리 및 체험 이력 저장
    const result = await prisma.$transaction(async (tx) => {
      // 쿠폰 사용 처리
      const updatedCoupon = await tx.coupon.update({
        where: { id: coupon.id },
        data: {
          isUsed: true,
          usedAt: new Date(),
          usedProgram: usedProgram || '체험 프로그램',
          usedBy: usedBy || undefined,
          recipientPhone: phone || undefined,
          isFirstTime: isFirstTime,
          discountRate: discountRate || undefined,
          finalPrice: finalPrice || undefined
        }
      });
      
      // 체험 이력 저장 (전화번호와 프로그램 타입이 있는 경우)
      if (phone && programType) {
        await tx.userExperienceHistory.create({
          data: {
            userPhone: phone,
            userName: usedBy || undefined,
            programType: programType,
            programTitle: programTitle || usedProgram || '체험 프로그램',
            experienceDate: new Date(),
            originalPrice: originalPrice || 0,
            discountRate: discountRate || 0,
            finalPrice: finalPrice || 0,
            isFirstTime: isFirstTime,
            couponCode: code,
            dataCollectionAgreed: dataCollectionAgreed,
            marketingAgreed: marketingAgreed
          }
        });
      }
      
      return updatedCoupon;
    });
    
    return NextResponse.json({
      success: true,
      message: isFirstTime 
        ? '체험권이 사용 처리되었습니다. 첫 체험 할인이 적용되었습니다.' 
        : '체험권이 사용 처리되었습니다.',
      coupon: {
        code: result.code,
        usedAt: new Date(result.usedAt!).toLocaleDateString('ko-KR', { 
          timeZone: 'Asia/Seoul' 
        }),
        usedProgram: result.usedProgram,
        isFirstTime: isFirstTime,
        discountRate: result.discountRate,
        finalPrice: result.finalPrice
      }
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: '쿠폰 사용 처리 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}