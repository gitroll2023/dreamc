import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'http://dreamcatcher.sslab.cloud';
  
  const rssContent = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>드림캐쳐 - 청년 문화 체험 플랫폼</title>
    <link>${baseUrl}</link>
    <description>전라남도 청년들을 위한 문화 체험 플랫폼. 칵테일, 베이킹, 보드게임, 캘리그래피 등 다양한 문화 체험을 특별 할인가로 만나보세요. 청년들의 문화 향유 기회 확대와 창의적 활동 지원을 목표로 하는 문화 기업입니다.</description>
    <language>ko</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    
    <item>
      <title>AI 인문학 부트캠프 - AI가 절대 가질 수 없는 인간만의 영역</title>
      <link>${baseUrl}/programs/ai-bootcamp</link>
      <description>AI가 모든 것을 대체하는 시대, 그럼에도 AI가 침범할 수 없는 인간만의 고유한 영역을 탐구합니다. 인간의 감정, 창의성, 윤리, 직관, 삶의 의미 등 AI가 결코 이해할 수 없는 인간성의 본질을 함께 고민하고 개발합니다.</description>
      <pubDate>${new Date().toUTCString()}</pubDate>
      <guid>${baseUrl}/programs/ai-bootcamp</guid>
    </item>
    
    <item>
      <title>다양한 문화 체험 프로그램</title>
      <link>${baseUrl}/programs</link>
      <description>칵테일 클래스, 홈베이킹, 보드게임, 캘리그래피, 사진 클래스, 석고방향제 만들기 등 다양한 문화 체험 프로그램을 할인가로 만나보세요.</description>
      <pubDate>${new Date().toUTCString()}</pubDate>
      <guid>${baseUrl}/programs</guid>
    </item>
    
    <item>
      <title>할인 체험권 안내</title>
      <link>${baseUrl}/coupon</link>
      <description>드림캐쳐의 다양한 프로그램을 할인된 가격으로 체험할 수 있는 체험권 안내. 체험권은 드림캐쳐 서포터즈를 통해서만 발급 가능합니다. 첫 체험은 특별 할인가로 이용 가능합니다.</description>
      <pubDate>${new Date().toUTCString()}</pubDate>
      <guid>${baseUrl}/coupon</guid>
    </item>
    
    <item>
      <title>전남 청년 문화 체험</title>
      <link>${baseUrl}/programs/experience/apply</link>
      <description>전남 지역 청년들을 위한 특별한 문화 체험 프로그램. 지역 청년들의 문화 향유 기회를 확대하고 창의적인 활동을 지원합니다.</description>
      <pubDate>${new Date().toUTCString()}</pubDate>
      <guid>${baseUrl}/programs/experience/apply</guid>
    </item>
    
    <item>
      <title>드림캐쳐 소개 - 청년 문화 플랫폼 기업</title>
      <link>${baseUrl}/about</link>
      <description>청년들의 꿈을 응원하는 드림캐쳐. 문화 플랫폼 구축을 통해 청년들의 문화 향유 기회를 확대하고 창의적 활동을 지원하는 문화 기업입니다. 우리의 미션과 비전, 그리고 함께하는 사람들을 소개합니다.</description>
      <pubDate>${new Date().toUTCString()}</pubDate>
      <guid>${baseUrl}/about</guid>
    </item>
  </channel>
</rss>`;

  return new NextResponse(rssContent, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}