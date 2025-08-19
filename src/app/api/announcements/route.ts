import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    
    // 카테고리 필터링
    const where = category && category !== 'all' 
      ? { category } 
      : {};
    
    // 공지사항 조회 (최신순)
    const announcements = await prisma.announcement.findMany({
      where,
      orderBy: {
        publishedAt: 'desc'
      },
      include: {
        _count: {
          select: { viewRecords: true }
        }
      }
    });
    
    // 한국 시간으로 날짜 포맷팅
    const formattedAnnouncements = announcements.map(announcement => ({
      id: announcement.id,
      category: announcement.category,
      title: announcement.title,
      preview: announcement.preview,
      content: announcement.content,
      views: announcement.views,
      date: new Date(announcement.publishedAt).toLocaleDateString('ko-KR', {
        timeZone: 'Asia/Seoul',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }).replace(/\. /g, '-').replace(/\./g, ''),
      publishedAt: announcement.publishedAt
    }));
    
    return NextResponse.json(formattedAnnouncements);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch announcements' },
      { status: 500 }
    );
  }
}