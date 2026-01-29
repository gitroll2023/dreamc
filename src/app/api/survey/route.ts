import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // 한국 시간으로 변환 (UTC+9)
    // 한국 시간으로 변환 (UTC+9) -> DB에는 UTC로 저장하고 조회 시 변환하도록 변경
    const now = new Date();

    // Survey 데이터 저장
    const survey = await prisma.survey.create({
      data: {
        supporterGroup: data.supporterGroup,
        participantName: data.participantName,
        programType: data.programType,
        customProgramName: data.customProgramName || undefined,
        kindnessRating: data.kindnessRating,
        explanationRating: data.explanationRating,
        satisfactionRating: data.satisfactionRating,
        recommendRating: data.recommendRating,
        participateAgain: data.participateAgain,
        nextExperience: data.nextExperience || undefined,
        participateLottery: data.participateLottery,
        phone: data.phone || undefined,
        goodPoints: data.goodPoints || undefined,
        improvements: data.improvements || undefined,
        additionalFeedback: data.additionalFeedback || undefined,
        submittedAt: now,
      },
    });

    return NextResponse.json({
      success: true,
      message: '설문이 성공적으로 제출되었습니다.',
      surveyId: survey.id
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: '설문 제출 중 오류가 발생했습니다.'
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // 관리자용 설문 조회 (추후 인증 추가 필요)
    const surveys = await prisma.survey.findMany({
      orderBy: {
        submittedAt: 'desc',
      },
    });

    return NextResponse.json({
      success: true,
      data: surveys
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: '설문 조회 중 오류가 발생했습니다.'
      },
      { status: 500 }
    );
  }
}