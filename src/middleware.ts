import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 20분 (밀리초)
const SESSION_DURATION = 20 * 60 * 1000;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // 관리자 대시보드 경로 체크
  if (pathname.startsWith('/nj/ad/min/dashboard')) {
    const sessionCookie = request.cookies.get('admin_session');
    const sessionTimeCookie = request.cookies.get('admin_session_time');
    
    // 세션이 없으면 로그인 페이지로 리다이렉트
    if (!sessionCookie?.value) {
      return NextResponse.redirect(new URL('/nj/ad/min', request.url));
    }
    
    // 세션 시간 체크
    if (sessionTimeCookie?.value) {
      const sessionTime = parseInt(sessionTimeCookie.value);
      const currentTime = Date.now();
      
      // 20분 경과 시 세션 삭제 및 로그인 페이지로 리다이렉트
      if (currentTime - sessionTime > SESSION_DURATION) {
        const response = NextResponse.redirect(new URL('/nj/ad/min', request.url));
        response.cookies.delete('admin_session');
        response.cookies.delete('admin_session_time');
        return response;
      }
      
      // 세션 시간 업데이트 (활동 시마다 연장)
      const response = NextResponse.next();
      response.cookies.set('admin_session_time', currentTime.toString(), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: SESSION_DURATION / 1000 // 20분
      });
      return response;
    }
  }
  
  // 서포터즈 대시보드 경로 체크
  if (pathname.startsWith('/nj/sp/dashboard') || pathname.startsWith('/nj/sp/guide') || pathname.startsWith('/nj/sp/quick')) {
    const supporterAuthCookie = request.cookies.get('supporters-auth');
    
    // 인증이 없으면 로그인 페이지로 리다이렉트
    if (!supporterAuthCookie?.value || supporterAuthCookie.value !== 'true') {
      return NextResponse.redirect(new URL('/nj/sp', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/nj/ad/min/dashboard/:path*',
    '/nj/sp/dashboard/:path*',
    '/nj/sp/guide/:path*',
    '/nj/sp/quick/:path*'
  ]
};