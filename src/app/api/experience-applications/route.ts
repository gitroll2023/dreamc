import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { formatInTimeZone } from 'date-fns-tz';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Get current time in Korea timezone
    const koreaTime = new Date();
    const koreaTimeString = formatInTimeZone(koreaTime, 'Asia/Seoul', 'yyyy-MM-dd HH:mm:ss zzz');
    
    console.log('Experience application received at (Korea time):', koreaTimeString);
    
    // Create experience application in database
    const application = await prisma.experienceApplication.create({
      data: {
        programType: body.programType,
        programTitle: body.programTitle,
        name: body.name,
        phone: body.phone,
        age: body.age,
        location: body.location,
        preferredDate: body.preferredDate,
        preferredTime: body.preferredTime,
        message: body.message || null,
        agreement: body.agreement,
        depositAgreement: body.depositAgreement || false,
        applicationDate: koreaTime,
      },
    });
    
    console.log('Experience application saved:', application.id);
    
    return NextResponse.json({ 
      success: true, 
      applicationId: application.id,
      message: '체험 프로그램 신청이 성공적으로 접수되었습니다.'
    });
  } catch (error) {
    console.error('Error saving experience application:', error);
    return NextResponse.json(
      { success: false, error: '신청 처리 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// Get all experience applications (protected - you should add authentication)
export async function GET(request: NextRequest) {
  try {
    // TODO: Add authentication check here
    
    const { searchParams } = new URL(request.url);
    const programType = searchParams.get('type');
    
    const where = programType ? { programType } : {};
    
    const applications = await prisma.experienceApplication.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    // Format dates to Korea timezone for display
    const formattedApplications = applications.map(app => ({
      ...app,
      createdAtKST: formatInTimeZone(app.createdAt, 'Asia/Seoul', 'yyyy-MM-dd HH:mm:ss'),
      applicationDateKST: formatInTimeZone(app.applicationDate, 'Asia/Seoul', 'yyyy-MM-dd HH:mm:ss'),
      preferredDateKST: app.preferredDate,
    }));
    
    return NextResponse.json({ 
      success: true, 
      applications: formattedApplications 
    });
  } catch (error) {
    console.error('Error fetching experience applications:', error);
    return NextResponse.json(
      { success: false, error: '데이터 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// Update application status
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status } = body;
    
    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: '필수 정보가 누락되었습니다.' },
        { status: 400 }
      );
    }
    
    const updatedApplication = await prisma.experienceApplication.update({
      where: { id },
      data: { status },
    });
    
    return NextResponse.json({ 
      success: true, 
      application: updatedApplication,
      message: '상태가 업데이트되었습니다.'
    });
  } catch (error) {
    console.error('Error updating experience application:', error);
    return NextResponse.json(
      { success: false, error: '업데이트 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}