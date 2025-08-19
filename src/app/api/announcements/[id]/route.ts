import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// 한국 시간으로 오늘 날짜 문자열 생성 (YYYY-MM-DD)
function getKoreanDateString() {
  const now = new Date();
  const kstOffset = 9 * 60; // KST is UTC+9
  const kstTime = new Date(now.getTime() + kstOffset * 60 * 1000);
  
  const year = kstTime.getUTCFullYear();
  const month = String(kstTime.getUTCMonth() + 1).padStart(2, '0');
  const day = String(kstTime.getUTCDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    // IP 주소 가져오기
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0].trim() : 
               request.headers.get('x-real-ip') || 
               '127.0.0.1';
    
    // 공지사항 조회
    const announcement = await prisma.announcement.findUnique({
      where: { id }
    });
    
    if (!announcement) {
      return NextResponse.json(
        { error: 'Announcement not found' },
        { status: 404 }
      );
    }
    
    // 오늘 이 IP가 이미 조회했는지 확인
    const todayString = getKoreanDateString();
    
    const existingView = await prisma.announcementView.findFirst({
      where: {
        announcementId: id,
        ipAddress: ip,
        viewDate: todayString
      }
    });
    
    // 오늘 처음 조회하는 경우에만 조회수 증가
    if (!existingView) {
      // 조회 기록 생성
      await prisma.announcementView.create({
        data: {
          announcementId: id,
          ipAddress: ip,
          viewDate: todayString,
          viewedAt: new Date()
        }
      });
      
      // 조회수 증가
      await prisma.announcement.update({
        where: { id },
        data: {
          views: {
            increment: 1
          }
        }
      });
    }
    
    // 최신 공지사항 정보 반환
    const updatedAnnouncement = await prisma.announcement.findUnique({
      where: { id }
    });
    
    // 한국 시간으로 날짜 포맷팅
    const formattedAnnouncement = {
      id: updatedAnnouncement!.id,
      category: updatedAnnouncement!.category,
      title: updatedAnnouncement!.title,
      preview: updatedAnnouncement!.preview,
      content: updatedAnnouncement!.content,
      views: updatedAnnouncement!.views,
      date: new Date(updatedAnnouncement!.publishedAt).toLocaleDateString('ko-KR', {
        timeZone: 'Asia/Seoul',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }).replace(/\. /g, '-').replace(/\./g, ''),
      publishedAt: updatedAnnouncement!.publishedAt
    };
    
    return NextResponse.json(formattedAnnouncement);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch announcement' },
      { status: 500 }
    );
  }
}