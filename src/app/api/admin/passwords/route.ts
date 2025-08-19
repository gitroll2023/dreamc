import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  try {
    // 관리자 인증 확인
    const cookieStore = cookies();
    const sessionCookie = cookieStore.get('admin_session');
    
    if (!sessionCookie?.value) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // 환경변수에서 비밀번호 가져오기
    const passwords = {
      adminPassword: process.env.ADMIN_PASSWORD || '설정되지 않음',
      supportersPassword: process.env.SUPPORTERS_PASSWORD || '설정되지 않음',
      couponAccessPassword: process.env.COUPON_ACCESS_PASSWORD || '설정되지 않음',
    };
    
    return NextResponse.json({
      success: true,
      passwords
    });
  } catch (error) {
    console.error('Error fetching passwords:', error);
    return NextResponse.json(
      { success: false, error: '비밀번호를 가져오는데 실패했습니다.' },
      { status: 500 }
    );
  }
}