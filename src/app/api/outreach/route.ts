import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      name,
      phone,
      ageGroup,
      interestedPrograms,
      location,
      preferredDay,
      preferredTimes,
      specificTime,
      supporterName,
      supporterGroup,
      privacyAgreed,
      marketingAgreed,
      notes
    } = body;

    // 필수 필드 검증
    if (!name || !phone || !interestedPrograms || interestedPrograms.length === 0) {
      return NextResponse.json(
        { error: '필수 정보가 누락되었습니다.' },
        { status: 400 }
      );
    }

    // 개인정보 동의 확인
    if (!privacyAgreed) {
      return NextResponse.json(
        { error: '개인정보 수집 및 이용에 동의해주세요.' },
        { status: 400 }
      );
    }

    // 데이터베이스에 저장
    const contactData: any = {
      name,
      phone,
      ageGroup: ageGroup || null,
      interestedPrograms,
      location: location || '나주',
      preferredDay: preferredDay || '',
      supporterName: supporterName || '미지정',
      supporterGroup: supporterGroup || '나주',
      privacyAgreed,
      marketingAgreed: marketingAgreed || false,
      agreedAt: new Date(),
    };

    // preferredTimes와 specificTime 필드가 있으면 추가
    if (preferredTimes && preferredTimes.length > 0) {
      contactData.preferredTimes = preferredTimes;
    }
    if (specificTime) {
      contactData.specificTime = specificTime;
    }
    if (notes) {
      contactData.notes = notes;
    }

    const contact = await prisma.outreachContact.create({
      data: contactData,
    });

    return NextResponse.json({
      success: true,
      message: '체험 할인권 신청이 완료되었습니다.',
      contactId: contact.id,
    });
  } catch (error) {
    console.error('Outreach contact creation error:', error);
    return NextResponse.json(
      { error: '신청 처리 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const supporterName = searchParams.get('supporterName');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const location = searchParams.get('location');

    const where: any = {};

    if (supporterName) {
      where.supporterName = supporterName;
    }

    if (location) {
      where.location = location;
    }

    if (startDate && endDate) {
      where.createdAt = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      };
    }

    const contacts = await prisma.outreachContact.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
    });

    // 통계 정보
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
      contacts,
      stats,
    });
  } catch (error) {
    console.error('Outreach contacts fetch error:', error);
    return NextResponse.json(
      { error: '데이터 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// 쿠폰 발송 상태 업데이트
export async function PATCH(request: NextRequest) {
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
    console.error('Outreach contact update error:', error);
    return NextResponse.json(
      { error: '업데이트 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}