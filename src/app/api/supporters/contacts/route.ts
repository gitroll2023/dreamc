import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 인증 확인 미들웨어 함수
function checkAuth() {
  const cookieStore = cookies();
  const isAuthenticated = cookieStore.get('supporters-auth');
  return isAuthenticated?.value === 'true';
}

export async function GET(request: NextRequest) {
  // 인증 확인
  if (!checkAuth()) {
    return NextResponse.json(
      { error: '인증이 필요합니다.' },
      { status: 401 }
    );
  }

  try {
    const contacts = await prisma.outreachContact.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    // 통계 정보 계산
    const stats = {
      total: contacts.length,
      bySupporterName: {} as Record<string, number>,
      byLocation: {} as Record<string, number>,
      byProgram: {} as Record<string, number>,
      couponSent: contacts.filter(c => c.couponSent).length,
      marketingAgreed: contacts.filter(c => c.marketingAgreed).length,
    };

    // 서포터즈별 통계
    contacts.forEach(contact => {
      if (contact.supporterName) {
        stats.bySupporterName[contact.supporterName] = 
          (stats.bySupporterName[contact.supporterName] || 0) + 1;
      }
      
      // 지역별 통계
      stats.byLocation[contact.location] = 
        (stats.byLocation[contact.location] || 0) + 1;
      
      // 프로그램별 통계
      contact.interestedPrograms.forEach(program => {
        stats.byProgram[program] = (stats.byProgram[program] || 0) + 1;
      });
    });

    return NextResponse.json({
      success: true,
      contacts,
      stats,
    });
  } catch (error) {
    console.error('Fetch contacts error:', error);
    return NextResponse.json(
      { error: '데이터 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  // 인증 확인
  if (!checkAuth()) {
    return NextResponse.json(
      { error: '인증이 필요합니다.' },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const { contactId, couponSent } = body;

    if (!contactId) {
      return NextResponse.json(
        { error: '연락처 ID가 필요합니다.' },
        { status: 400 }
      );
    }

    const updatedContact = await prisma.outreachContact.update({
      where: { id: contactId },
      data: {
        couponSent,
        couponSentAt: couponSent ? new Date() : null,
      },
    });

    return NextResponse.json({
      success: true,
      contact: updatedContact,
    });
  } catch (error) {
    console.error('Update contact error:', error);
    return NextResponse.json(
      { error: '업데이트 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}