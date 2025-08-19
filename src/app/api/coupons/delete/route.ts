import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { id } = await request.json();
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: '쿠폰 ID가 필요합니다' },
        { status: 400 }
      );
    }
    
    // 쿠폰 삭제
    await prisma.coupon.delete({
      where: { id }
    });
    
    return NextResponse.json({
      success: true,
      message: '쿠폰이 삭제되었습니다'
    });
    
  } catch (error: any) {
    
    if (error.code === 'P2025') {
      return NextResponse.json(
        { success: false, error: '쿠폰을 찾을 수 없습니다' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: '쿠폰 삭제 중 오류가 발생했습니다' },
      { status: 500 }
    );
  }
}