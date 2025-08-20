import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // 서포터즈 페이지에서만 접근 가능하도록 referer 체크
  const referer = request.headers.get('referer');
  
  if (!referer || !referer.includes('/nj/sp')) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  return NextResponse.json({
    supportersPassword: process.env.SUPPORTERS_PASSWORD || 'not_set',
    couponAccessPassword: process.env.COUPON_ACCESS_PASSWORD || 'not_set',
  });
}