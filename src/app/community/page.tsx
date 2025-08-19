'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Sparkles } from 'lucide-react';

export default function CommunityPage() {
  // 하드코딩된 공지사항 데이터
  const announcements = [
    {
      id: 1,
      category: 'important',
      title: '드림캐쳐 2025년 1월 프로그램 안내',
      preview: '새해를 맞아 다양한 체험 프로그램을 준비했습니다. 많은 참여 부탁드립니다.',
      date: '2024.12.20',
      views: 152
    },
    {
      id: 2,
      category: 'notice',
      title: '연말 특별 이벤트 - 쿠폰 추가 발급',
      preview: '12월 한정으로 체험 쿠폰을 추가 발급합니다. 지역 서포터즈를 통해 신청해주세요.',
      date: '2024.12.15',
      views: 89
    },
    {
      id: 3,
      category: 'recruitment',
      title: 'AI 부트캠프 2기 모집 시작',
      preview: 'AI 시대에서 살아남기 인문학 부트캠프 2기를 모집합니다. 관심있는 청년들의 많은 지원 바랍니다.',
      date: '2024.12.10',
      views: 234
    },
    {
      id: 4,
      category: 'event',
      title: '크리스마스 특별 프로그램',
      preview: '크리스마스를 맞아 특별한 베이킹 클래스와 향수 만들기 체험을 준비했습니다.',
      date: '2024.12.05',
      views: 178
    },
    {
      id: 5,
      category: 'notice',
      title: '홈페이지 리뉴얼 안내',
      preview: '더 나은 서비스를 위해 홈페이지를 새롭게 단장했습니다.',
      date: '2024.12.01',
      views: 95
    }
  ];

  const getCategoryBadge = (category: string) => {
    switch(category) {
      case 'important':
        return <Badge variant="destructive">중요</Badge>;
      case 'recruitment':
        return <Badge variant="default">모집</Badge>;
      case 'event':
        return <Badge className="bg-accent text-white">행사</Badge>;
      default:
        return <Badge variant="secondary">공지</Badge>;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-12 md:py-16 lg:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-background"></div>
        <div className="container relative z-10 max-w-6xl mx-auto px-4">
          <div className="text-center">
            <Badge className="mb-4 px-4 py-1" variant="secondary">
              <Sparkles className="w-3 h-3 mr-1" />
              Community
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              공지사항
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              드림캐쳐의 새로운 소식과 공지사항을 확인하세요
            </p>
          </div>
        </div>
      </section>

      {/* Announcements List */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="space-y-4">
            {announcements.map(announcement => (
              <Card key={announcement.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {getCategoryBadge(announcement.category)}
                      <span className="text-sm text-muted-foreground flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {announcement.date}
                      </span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      조회 {announcement.views}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {announcement.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {announcement.preview}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}