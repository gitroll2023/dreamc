import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { formatInTimeZone } from 'date-fns-tz';

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Simple auth check
async function isAuthenticated() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('admin_session');
  return !!sessionCookie?.value;
}

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    if (!(await isAuthenticated())) {
      return NextResponse.json(
        { success: false, error: '인증이 필요합니다.' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'all';

    let data: any = {};

    // Fetch AI Bootcamp Applications
    if (type === 'all' || type === 'bootcamp') {
      const bootcampApplications = await prisma.application.findMany({
        orderBy: { createdAt: 'desc' },
      });
      
      data.bootcampApplications = bootcampApplications.map(app => ({
        ...app,
        createdAtKST: formatInTimeZone(app.createdAt, 'Asia/Seoul', 'yyyy-MM-dd HH:mm:ss'),
        applicationDateKST: formatInTimeZone(app.applicationDate, 'Asia/Seoul', 'yyyy-MM-dd HH:mm:ss'),
      }));
    }

    // Fetch Experience Applications
    if (type === 'all' || type === 'experience') {
      const experienceApplications = await prisma.experienceApplication.findMany({
        orderBy: { createdAt: 'desc' },
      });
      
      data.experienceApplications = experienceApplications.map(app => ({
        ...app,
        createdAtKST: formatInTimeZone(app.createdAt, 'Asia/Seoul', 'yyyy-MM-dd HH:mm:ss'),
        applicationDateKST: formatInTimeZone(app.applicationDate, 'Asia/Seoul', 'yyyy-MM-dd HH:mm:ss'),
      }));
    }

    // Fetch Surveys
    if (type === 'all' || type === 'survey') {
      const surveys = await prisma.survey.findMany({
        orderBy: { submittedAt: 'desc' },
      });
      
      data.surveys = surveys.map(survey => ({
        ...survey,
        submittedAtKST: formatInTimeZone(survey.submittedAt, 'Asia/Seoul', 'yyyy-MM-dd HH:mm:ss'),
        createdAtKST: formatInTimeZone(survey.createdAt, 'Asia/Seoul', 'yyyy-MM-dd HH:mm:ss'),
      }));
    }

    // Fetch Announcements
    if (type === 'all' || type === 'announcement') {
      const announcements = await prisma.announcement.findMany({
        include: {
          _count: {
            select: { viewRecords: true }
          }
        },
        orderBy: { publishedAt: 'desc' },
      });
      
      data.announcements = announcements.map(ann => ({
        ...ann,
        publishedAtKST: formatInTimeZone(ann.publishedAt, 'Asia/Seoul', 'yyyy-MM-dd HH:mm:ss'),
        createdAtKST: formatInTimeZone(ann.createdAt, 'Asia/Seoul', 'yyyy-MM-dd HH:mm:ss'),
      }));
    }

    // Fetch Coupons
    if (type === 'all' || type === 'coupon') {
      const coupons = await prisma.coupon.findMany({
        orderBy: { createdAt: 'desc' },
      });
      
      const formatKoreanDate = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}년 ${month}월 ${day}일`;
      };
      
      data.coupons = coupons.map(coupon => {
        const now = new Date();
        let status = '사용가능';
        
        if (coupon.isUsed) {
          status = '사용완료';
        } else if (coupon.expiryDate < now) {
          status = '만료';
        }
        
        return {
          ...coupon,
          issueDate: formatKoreanDate(coupon.issueDate),
          expiryDate: formatKoreanDate(coupon.expiryDate),
          usedAt: coupon.usedAt ? formatKoreanDate(coupon.usedAt) : null,
          status
        };
      });
    }

    // Get statistics
    const stats = {
      totalBootcampApplications: await prisma.application.count(),
      totalExperienceApplications: await prisma.experienceApplication.count(),
      totalSurveys: await prisma.survey.count(),
      totalAnnouncements: await prisma.announcement.count(),
      totalCoupons: await prisma.coupon.count(),
      pendingBootcampApplications: await prisma.application.count({ where: { status: 'pending' } }),
      pendingExperienceApplications: await prisma.experienceApplication.count({ where: { status: 'pending' } }),
      unusedCoupons: await prisma.coupon.count({ where: { isUsed: false } }),
    };

    return NextResponse.json({ 
      success: true, 
      data,
      stats
    });
  } catch (error) {
    console.error('Error fetching admin data:', error);
    return NextResponse.json(
      { success: false, error: '데이터 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// Update application status
export async function PATCH(request: NextRequest) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json(
        { success: false, error: '인증이 필요합니다.' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { id, status, type } = body;

    let updatedItem;

    if (type === 'bootcamp') {
      updatedItem = await prisma.application.update({
        where: { id },
        data: { status }
      });
    } else if (type === 'experience') {
      updatedItem = await prisma.experienceApplication.update({
        where: { id },
        data: { status }
      });
    } else {
      return NextResponse.json(
        { success: false, error: '잘못된 타입입니다.' },
        { status: 400 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      data: updatedItem 
    });
  } catch (error) {
    console.error('Error updating status:', error);
    return NextResponse.json(
      { success: false, error: '상태 업데이트 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// Delete item
export async function DELETE(request: NextRequest) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json(
        { success: false, error: '인증이 필요합니다.' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const type = searchParams.get('type');

    if (!id || !type) {
      return NextResponse.json(
        { success: false, error: '필수 정보가 누락되었습니다.' },
        { status: 400 }
      );
    }

    if (type === 'bootcamp') {
      await prisma.application.delete({ where: { id } });
    } else if (type === 'experience') {
      await prisma.experienceApplication.delete({ where: { id } });
    } else if (type === 'survey') {
      await prisma.survey.delete({ where: { id } });
    } else if (type === 'announcement') {
      await prisma.announcement.delete({ where: { id } });
    } else if (type === 'coupon') {
      await prisma.coupon.delete({ where: { id } });
    } else {
      return NextResponse.json(
        { success: false, error: '잘못된 타입입니다.' },
        { status: 400 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: '삭제되었습니다.' 
    });
  } catch (error) {
    console.error('Error deleting item:', error);
    return NextResponse.json(
      { success: false, error: '삭제 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}