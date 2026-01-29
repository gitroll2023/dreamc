import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';

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
        const surveys = await prisma.survey.findMany({
            orderBy: {
                submittedAt: 'desc',
            },
        });

        return NextResponse.json({
            success: true,
            surveys,
        });
    } catch (error) {
        console.error('Fetch surveys error:', error);
        return NextResponse.json(
            { error: '설문 데이터 조회 중 오류가 발생했습니다.' },
            { status: 500 }
        );
    }
}

export async function DELETE(request: NextRequest) {
    // 인증 확인
    if (!checkAuth()) {
        return NextResponse.json(
            { error: '인증이 필요합니다.' },
            { status: 401 }
        );
    }

    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { error: '삭제할 설문 ID가 필요합니다.' },
                { status: 400 }
            );
        }

        await prisma.survey.delete({
            where: { id },
        });

        return NextResponse.json({
            success: true,
            message: '설문이 삭제되었습니다.',
        });
    } catch (error) {
        console.error('Delete survey error:', error);
        return NextResponse.json(
            { error: '설문 삭제 중 오류가 발생했습니다.' },
            { status: 500 }
        );
    }
}
