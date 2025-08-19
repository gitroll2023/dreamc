import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import crypto from 'crypto';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin';
const SESSION_DURATION = 20 * 60; // 20분 (초 단위)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body;

    if (password === ADMIN_PASSWORD) {
      // Generate a simple session token
      const sessionToken = crypto.randomBytes(32).toString('hex');
      const currentTime = Date.now();
      
      // Set cookie with session token (20분 만료)
      cookies().set('admin_session', sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: SESSION_DURATION, // 20분
        path: '/',
      });
      
      // Set session time cookie
      cookies().set('admin_session_time', currentTime.toString(), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: SESSION_DURATION, // 20분
        path: '/',
      });

      return NextResponse.json({ 
        success: true, 
        message: '로그인 성공' 
      });
    } else {
      return NextResponse.json(
        { success: false, error: '비밀번호가 올바르지 않습니다.' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, error: '로그인 처리 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    cookies().delete('admin_session');
    cookies().delete('admin_session_time');
    return NextResponse.json({ 
      success: true, 
      message: '로그아웃 되었습니다.' 
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: '로그아웃 처리 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}