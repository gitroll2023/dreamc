import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    
    // 환경 변수에서 쿠폰 입력 접근 비밀번호 가져오기
    const couponAccessPassword = process.env.COUPON_ACCESS_PASSWORD;
    
    if (!couponAccessPassword) {
      return NextResponse.json(
        { success: false, error: '서버 설정 오류' },
        { status: 500 }
      );
    }
    
    // 비밀번호 확인
    if (password === couponAccessPassword) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { success: false, error: '비밀번호가 올바르지 않습니다' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Password verification error:', error);
    return NextResponse.json(
      { success: false, error: '서버 오류가 발생했습니다' },
      { status: 500 }
    );
  }
}