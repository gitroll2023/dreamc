import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { formatInTimeZone } from 'date-fns-tz';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Get current time in Korea timezone
    const koreaTime = new Date();
    const koreaTimeString = formatInTimeZone(koreaTime, 'Asia/Seoul', 'yyyy-MM-dd HH:mm:ss zzz');
    
    console.log('Application received at (Korea time):', koreaTimeString);
    
    // Create application in database
    const application = await prisma.application.create({
      data: {
        name: body.name,
        birthYear: body.birthYear,
        gender: body.gender,
        phone: body.phone,
        email: body.email || null,
        location: body.location,
        startMonth: body.startMonth,
        attendanceType: body.attendanceType,
        occupation: body.occupation,
        motivation: body.motivation,
        expectations: body.expectations,
        termsAgree: body.termsAgree,
        privacyAgree: body.privacyAgree,
        marketingAgree: body.marketingAgree || false,
        applicationDate: koreaTime,
      },
    });
    
    console.log('Application saved:', application.id);
    
    return NextResponse.json({ 
      success: true, 
      applicationId: application.id,
      message: '신청이 성공적으로 접수되었습니다.'
    });
  } catch (error) {
    console.error('Error saving application:', error);
    return NextResponse.json(
      { success: false, error: '신청 처리 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// Get all applications (protected - you should add authentication)
export async function GET(request: NextRequest) {
  try {
    // TODO: Add authentication check here
    
    const applications = await prisma.application.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    // Format dates to Korea timezone for display
    const formattedApplications = applications.map(app => ({
      ...app,
      createdAtKST: formatInTimeZone(app.createdAt, 'Asia/Seoul', 'yyyy-MM-dd HH:mm:ss'),
      applicationDateKST: formatInTimeZone(app.applicationDate, 'Asia/Seoul', 'yyyy-MM-dd HH:mm:ss'),
    }));
    
    return NextResponse.json({ 
      success: true, 
      applications: formattedApplications 
    });
  } catch (error) {
    console.error('Error fetching applications:', error);
    return NextResponse.json(
      { success: false, error: '데이터 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}