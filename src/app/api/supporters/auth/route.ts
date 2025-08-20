import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body;

    const correctPassword = process.env.SUPPORTERS_PASSWORD;

    if (!correctPassword) {
      console.error('SUPPORTERS_PASSWORD not configured');
      return NextResponse.json(
        { error: '서버 설정 오류' },
        { status: 500 }
      );
    }

    if (password === correctPassword) {
      // 세션 쿠키 설정
      const cookieStore = cookies();
      cookieStore.set('supporters-auth', 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 4, // 4시간
        path: '/',
      });

      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: '비밀번호가 올바르지 않습니다.' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Supporters auth error:', error);
    return NextResponse.json(
      { error: '인증 처리 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const cookieStore = cookies();
    cookieStore.delete('supporters-auth');
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Supporters logout error:', error);
    return NextResponse.json(
      { error: '로그아웃 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}