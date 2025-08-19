import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { code, usedProgram, usedBy } = await request.json();
    
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
    
    // 쿠폰 사용 처리
    const updatedCoupon = await prisma.coupon.update({
      where: { id: coupon.id },
      data: {
        isUsed: true,
        usedAt: new Date(),
        usedProgram: usedProgram || '체험 프로그램',
        usedBy: usedBy || undefined
      }
    });
    
    return NextResponse.json({
      success: true,
      message: '쿠폰이 사용 처리되었습니다.',
      coupon: {
        code: updatedCoupon.code,
        usedAt: new Date(updatedCoupon.usedAt!).toLocaleDateString('ko-KR', { 
          timeZone: 'Asia/Seoul' 
        }),
        usedProgram: updatedCoupon.usedProgram
      }
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: '쿠폰 사용 처리 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}