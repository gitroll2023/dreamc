'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, Calendar, Clock, MapPin, Users, CheckCircle2, ArrowRight, BookOpen, Target, Brain, Sparkles } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function AIBootcampPage() {
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [selectedMonth, setSelectedMonth] = useState<string>('9');
  const [reviewLanguages, setReviewLanguages] = useState<{ [key: string]: 'kr' | 'en' }>({
    review1: 'kr',
    review2: 'kr',
    review3: 'kr',
    review4: 'kr',
    review5: 'kr',
    review6: 'kr',
  });

  const toggleReviewLanguage = (reviewId: string) => {
    setReviewLanguages(prev => ({
      ...prev,
      [reviewId]: prev[reviewId] === 'kr' ? 'en' : 'kr'
    }));
  };

  const locations = [
    { id: 'naju', name: '나주시', available: ['9'] },
    { id: 'yeosu', name: '여수시', available: [] },
    { id: 'mokpo', name: '목포시', available: [] },
    { id: 'hwasun', name: '화순군', available: [] },
  ];

  const reviews = [
    {
      id: 'review1',
      name: '김*현',
      age: 26,
      role: '대학생',
      roleEn: 'University Student',
      badge: '20대',
      reviewKr: 'AI가 모든 걸 대체한다고 두려워했는데, 오히려 인간만이 할 수 있는 일이 무엇인지 명확해졌어요. AI 시대를 살아가는 방법을 배운 것 같아 큰 자산이 되었습니다.',
      reviewEn: 'I was afraid that AI would replace everything, but instead, I clearly understood what only humans can do. Learning how to live in the AI era has become a great asset.',
      rating: 5
    },
    {
      id: 'review2',
      name: '이*영',
      age: 29,
      role: '직장인',
      roleEn: 'Office Worker',
      badge: '20대',
      reviewKr: '창의성과 공감 능력이 왜 중요한지 깨달았습니다. 특히 다양한 세대와 함께 토론하면서 시야가 넓어진 것 같아요.',
      reviewEn: 'I realized why creativity and empathy are important. Especially discussing with different generations has broadened my perspective.',
      rating: 5
    },
    {
      id: 'review3',
      name: '박*수',
      age: 45,
      role: '자영업',
      roleEn: 'Self-employed',
      badge: '40대',
      reviewKr: 'AI 시대가 막연히 두려웠는데, 오히려 기회가 될 수 있다는 걸 배웠습니다. 인간의 가치를 재발견하는 소중한 시간이었어요.',
      reviewEn: 'I was vaguely afraid of the AI era, but I learned it could be an opportunity. It was a precious time rediscovering human value.',
      rating: 5
    },
    {
      id: 'review4',
      name: '정*희',
      age: 52,
      role: '주부',
      roleEn: 'Homemaker',
      badge: '50대',
      reviewKr: '젊은 세대와 함께 배우니 더 활력이 생겼어요. AI 시대에도 인간관계와 소통이 얼마나 중요한지 깨달았습니다.',
      reviewEn: 'Learning with the younger generation gave me more vitality. I realized how important human relationships and communication are even in the AI era.',
      rating: 5
    },
    {
      id: 'review5',
      name: '최*규',
      age: 63,
      role: '은퇴자',
      roleEn: 'Retiree',
      badge: '60대',
      reviewKr: '나이가 많아도 새로운 것을 배울 수 있다는 자신감을 얻었습니다. AI와 함께 살아가는 방법을 배워서 손주들과도 대화가 통해요.',
      reviewEn: 'I gained confidence that I can learn new things despite my age. Learning how to live with AI helps me communicate with my grandchildren.',
      rating: 5
    },
    {
      id: 'review6',
      name: '한*민',
      age: 24,
      role: '취업준비생',
      roleEn: 'Job Seeker',
      badge: '20대',
      reviewKr: 'AI에 대체되지 않을 직업을 찾고 있었는데, 결국 중요한 건 직업이 아니라 인간만의 역량을 키우는 것이라는 걸 배웠습니다.',
      reviewEn: "I was looking for a job that won't be replaced by AI, but I learned that what's important is not the job itself but developing uniquely human capabilities.",
      rating: 5
    }
  ];

  const curriculum = [
    {
      month: 1,
      title: '인간만의 가치와 존재 의미',
      topics: [
        'AI가 대체할 수 없는 인간의 본질',
        '인간의 고유한 감정과 직관',
        '창의성과 상상력의 근원',
        '인간관계와 신뢰의 가치'
      ]
    },
    {
      month: 2,
      title: '비공개 커리큘럼',
      topics: [
        '수강생에게만 공개되는 특별 커리큘럼',
        '세부 내용은 첫 주 오리엔테이션에서 안내',
        '',
        ''
      ]
    },
    {
      month: 3,
      title: '비공개 커리큘럼',
      topics: [
        '수강생에게만 공개되는 특별 커리큘럼',
        '세부 내용은 첫 주 오리엔테이션에서 안내',
        '',
        ''
      ]
    },
    {
      month: 4,
      title: '비공개 커리큘럼',
      topics: [
        '수강생에게만 공개되는 특별 커리큘럼',
        '세부 내용은 첫 주 오리엔테이션에서 안내',
        '',
        ''
      ]
    },
    {
      month: 5,
      title: '비공개 커리큘럼',
      topics: [
        '수강생에게만 공개되는 특별 커리큘럼',
        '세부 내용은 첫 주 오리엔테이션에서 안내',
        '',
        ''
      ]
    },
    {
      month: 6,
      title: '비공개 커리큘럼',
      topics: [
        '수강생에게만 공개되는 특별 커리큘럼',
        '최종 프로젝트 및 수료식',
        '',
        ''
      ]
    }
  ];

  const benefits = [
    { icon: Brain, title: 'AI가 대체할 수 없는 능력 개발', description: '인간만의 고유한 가치와 역량 강화' },
    { icon: Users, title: '대규모 강의 + 소규모 모임', description: '50명 이상 대규모 강의와 별도 소그룹 모임 병행' },
    { icon: Target, title: '온오프라인 하이브리드', description: '현지 거주자는 오프라인, 타지 거주자는 온라인 수강' },
    { icon: Sparkles, title: '지역 청년 네트워크', description: '같은 지역 청년들과의 네트워킹' }
  ];

  const getAvailableLocations = (month: string) => {
    return locations.filter(loc => loc.available.includes(month));
  };

  const isLocationAvailable = (locationId: string, month: string) => {
    const location = locations.find(loc => loc.id === locationId);
    return location ? location.available.includes(month) : false;
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-12 md:py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-background"></div>
        <div className="absolute inset-0 dreamcatcher-pattern opacity-30"></div>
        <div className="container relative z-10 max-w-6xl mx-auto px-4">
          <div className="text-center">
            <Badge className="mb-6 px-4 py-1 inline-flex items-center" variant="secondary">
              <Sparkles className="w-3 h-3 mr-1" />
              협력 프로그램
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              AI 시대에서 살아남기 인문학 부트캠프
            </h1>
            <p className="text-lg text-muted-foreground mb-2">
              Humanities Bootcamp for Surviving in the AI Era
            </p>
            <p className="text-sm text-muted-foreground mb-6 italic">
              ※ 가칭 (Working Title) - 정식 명칭은 추후 공개 예정
            </p>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-6 leading-relaxed">
              AI가 대체할 수 없는 <span className="text-foreground font-semibold">인간만의 가치</span>를 
              발견하고 개발하는 6개월 집중 과정
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              만 19세 이상 전연령, 모든 세대가 함께 배우는 특별한 인문학 강의
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 inline-flex items-center" asChild>
                <Link href="#registration">
                  지금 신청하기
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8" asChild>
                <Link href="#curriculum">
                  커리큘럼 보기
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Previous Participants Reviews Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-background to-secondary/20">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4" variant="outline">1기 수료생 후기</Badge>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 leading-tight">
              2024년 12월 말 시작한 1기 인문학 부트캠프가<br className="hidden md:block"/>
              6개월 과정을 성공적으로 마무리했습니다
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Started in Late December 2024, the First Cohort Successfully Completed the 6-Month Journey
            </p>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              만 19세 이상 전연령, 다양한 연령대의 참가자들이 함께한 특별한 여정<br/>
              2025년 6월 수료한 1기 참가자들의 진솔한 이야기를 들어보세요
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {reviews.map((review) => {
              const isEnglish = reviewLanguages[review.id] === 'en';
              return (
                <Card key={review.id} className="hover:shadow-lg transition-shadow relative">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <p className="font-semibold">{review.name} ({review.age}세)</p>
                        <p className="text-sm text-muted-foreground">
                          {isEnglish ? review.roleEn : review.role}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{review.badge}</Badge>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-6 px-2 text-xs"
                          onClick={() => toggleReviewLanguage(review.id)}
                        >
                          {isEnglish ? 'KR' : 'EN'}
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed italic min-h-[80px]">
                      &ldquo;{isEnglish ? review.reviewEn : review.reviewKr}&rdquo;
                    </p>
                    <div className="flex mt-4">
                      {[...Array(review.rating)].map((_, i) => (
                        <span key={i} className="text-yellow-500">★</span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center p-6 bg-primary/5 rounded-lg">
            <p className="text-lg font-semibold mb-2">1기 참가자 통계</p>
            <div className="flex justify-center gap-8 flex-wrap text-sm text-muted-foreground">
              <span>👥 총 58명 참가</span>
              <span>📊 20대 45% | 30대 20% | 40대 18% | 50대 12% | 60대 5%</span>
              <span>⭐ 만족도 4.8/5.0</span>
            </div>
          </div>
        </div>
      </section>

      {/* Special Offer Section */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-secondary/20 to-background">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <Badge className="mb-4" variant="secondary">2기 모집</Badge>
            <h2 className="text-3xl font-bold mb-4">2025년 9월, 나주에서 2기가 시작됩니다</h2>
            <p className="text-lg text-muted-foreground">1기의 성공적인 수료 이후, 2026년 3월 정식 런칭 전 마지막 시범 운영</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="border-primary/20 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <h3 className="font-semibold mb-2">첫 주 무료 체험</h3>
                <p className="text-sm text-muted-foreground">부담 없이 수업을 참관하고 결정하세요</p>
              </CardContent>
            </Card>
            <Card className="border-accent/20 hover:shadow-lg transition-shadow bg-accent/5">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-sm font-bold text-accent">90%</span>
                </div>
                <h3 className="font-semibold mb-2">파격 할인</h3>
                <p className="text-sm text-muted-foreground">
                  정가 <span className="line-through">월 20만원</span> → <span className="font-bold text-primary">월 2만원</span>
                </p>
              </CardContent>
            </Card>
            <Card className="border-primary/20 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">지역별 오픈</h3>
                <p className="text-sm text-muted-foreground">9월 나주 시작, 10월부터 전 지역</p>
              </CardContent>
            </Card>
          </div>
          <div className="text-center mt-8">
            <Badge variant="outline" className="px-4 py-2 inline-flex items-center">
              <AlertCircle className="w-4 h-4 mr-2" />
              참가비는 전액 시설관리비로 투자됩니다
            </Badge>
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section id="registration" className="py-20">
        <div className="container max-w-6xl mx-auto px-4">
          <Card className="border-2 shadow-xl">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-3xl">부트캠프 신청하기</CardTitle>
              <CardDescription className="text-lg mt-2">
                시작 월과 지역을 선택하여 신청하세요
              </CardDescription>
              <Alert className="mt-4 text-left flex items-center gap-2">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <AlertDescription className="flex-1">
                  <strong>10월부터 12월까지 지역별로 순차적으로 오픈 예정입니다.</strong><br/>
                  2026년 3월 정식 런칭 전, 여러분의 소중한 피드백이 필요합니다.
                </AlertDescription>
              </Alert>
            </CardHeader>
            <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Month Selection */}
            <div>
              <label className="text-sm font-medium mb-2 block">시작 월 선택</label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={selectedMonth === '9' ? 'default' : 'outline'}
                  onClick={() => setSelectedMonth('9')}
                  className="w-full"
                >
                  9월
                </Button>
                <Button
                  variant="outline"
                  disabled
                  className="w-full opacity-50"
                >
                  10월
                </Button>
                <Button
                  variant="outline"
                  disabled
                  className="w-full opacity-50"
                >
                  11월
                </Button>
                <Button
                  variant="outline"
                  disabled
                  className="w-full opacity-50"
                >
                  12월
                </Button>
              </div>
            </div>

            {/* Location Selection */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                지역 선택 <span className="text-muted-foreground">(2025년 9월은 나주시만 가능)</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={selectedLocation === 'naju' ? 'default' : 'outline'}
                  onClick={() => setSelectedLocation('naju')}
                  className="w-full"
                >
                  나주시
                </Button>
                <Button
                  variant="outline"
                  disabled
                  className="w-full opacity-50"
                >
                  여수시
                </Button>
                <Button
                  variant="outline"
                  disabled
                  className="w-full opacity-50"
                >
                  목포시
                </Button>
                <Button
                  variant="outline"
                  disabled
                  className="w-full opacity-50"
                >
                  화순군
                </Button>
              </div>
            </div>
          </div>

          {selectedLocation && (
            <div className="mt-6 p-6 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-primary/20">
              <p className="font-semibold text-lg mb-3">선택하신 정보</p>
              <p className="text-muted-foreground mb-4">
                📅 2025년 {selectedMonth}월 시작 · 📍 {locations.find(l => l.id === selectedLocation)?.name} · ⏱️ 6개월 과정
              </p>
              <Link href="/programs/ai-bootcamp/apply">
                <Button size="lg" className="w-full sm:w-auto inline-flex items-center justify-center">
                  신청서 작성하기
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Curriculum Section */}
      <section id="curriculum" className="py-20 bg-secondary/30">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">6개월 커리큘럼</h2>
            <p className="text-lg text-muted-foreground">체계적인 단계별 학습 프로그램</p>
          </div>
          <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview">전체 개요</TabsTrigger>
            <TabsTrigger value="detailed">월별 상세</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {curriculum.map((month) => (
                <Card key={month.month}>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {month.month}개월차: {month.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {month.month === 1 ? (
                      <ul className="space-y-2">
                        {month.topics.map((topic, idx) => (
                          topic && (
                            <li key={idx} className="flex items-start">
                              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                              <span className="text-sm">{topic}</span>
                            </li>
                          )
                        ))}
                      </ul>
                    ) : (
                      <div className="text-center py-8">
                        <div className="mb-4">
                          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
                            <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                          </div>
                        </div>
                        <p className="text-sm font-medium text-muted-foreground">비공개 커리큘럼</p>
                        <p className="text-xs text-muted-foreground mt-2">수강생에게만 공개됩니다</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="detailed" className="mt-6">
            <div className="space-y-6">
              {curriculum.map((month) => (
                <Card key={month.month}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>{month.month}개월차</CardTitle>
                      <Badge variant="outline">{month.title}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {month.month === 1 ? (
                      <div className="grid md:grid-cols-2 gap-4">
                        {month.topics.map((topic, idx) => (
                          topic && (
                            <div key={idx} className="flex items-start space-x-3">
                              <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                                <span className="text-sm font-medium">{idx + 1}</span>
                              </div>
                              <div>
                                <h4 className="font-medium">{topic}</h4>
                                <p className="text-sm text-muted-foreground mt-1">
                                  주 2회 수업 · 회당 2시간 · 실습 포함
                                </p>
                              </div>
                            </div>
                          )
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg className="w-10 h-10 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        </div>
                        <p className="font-medium text-muted-foreground">비공개 커리큘럼</p>
                        <p className="text-sm text-muted-foreground mt-2">
                          수강생에게만 공개되는 특별 커리큘럼입니다.<br/>
                          첫 주 오리엔테이션에서 상세 내용을 안내합니다.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Important Notice Section */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container max-w-6xl mx-auto px-4">
          <Card className="border-2 border-accent/30 bg-gradient-to-br from-accent/5 to-background">
            <CardContent className="p-8 md:p-12">
              <div className="flex items-start gap-4">
                <div className="hidden md:block">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
                    <Users className="h-8 w-8 text-accent" />
                  </div>
                </div>
                <div className="flex-1 space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">다양한 세대가 함께하는 인문학 수업</h3>
                    <p className="text-lg leading-relaxed text-muted-foreground">
                      본 프로그램은 <span className="text-foreground font-medium">만 19세 이상 전연령</span> 다양한 연령대가 함께 수강하는 인문학 강의입니다.
                    </p>
                  </div>
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    세대 간 경험과 지식의 차이로 인해 수업 진행 속도나 예제가 일부 수강생에게는 낯설 수 있습니다.
                  </p>
                  <div className="pt-6 border-t-2 border-dashed">
                    <p className="text-lg font-medium mb-3">
                      하지만 우리의 목표는 하나입니다:
                    </p>
                    <p className="text-xl text-primary font-bold">
                      AI 시대에서 살아남기 위해 인간이 가져야 할 고유한 가치를 함께 탐구하고 개발하는 것
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-background to-secondary/20">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">프로그램 특징</h2>
            <p className="text-lg text-muted-foreground">드림캐쳐 AI 부트캠프만의 차별점</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, idx) => (
              <Card key={idx} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="pt-8 pb-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Supporters Section */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container max-w-6xl mx-auto px-4">
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="text-center text-3xl">함께하는 서포터즈</CardTitle>
              <CardDescription className="text-center text-lg">
                후원 기업 소속 서포터즈들과 함께 수강하는 특별한 프로그램
              </CardDescription>
            </CardHeader>
            <CardContent>
          <div className="mb-6 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              본 프로그램은 다양한 후원 기업의 서포터즈들이 함께 참여합니다.<br/>
              서포터즈들은 각 기업을 대표하여 프로그램에 참여하며, 수강생들과 함께 성장합니다.
            </p>
            <Alert className="max-w-2xl mx-auto mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-sm">
                <strong>프로그램명 안내:</strong> &ldquo;AI 시대에서 살아남기 인문학 부트캠프&rdquo;는 가칭이며, 
                정식 명칭은 프로그램 시작 전 확정되어 안내될 예정입니다.
              </AlertDescription>
            </Alert>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
            <div className="p-3 bg-primary/10 rounded-lg text-center font-medium">
              드림캐쳐
            </div>
            <div className="p-3 bg-muted rounded-lg text-center text-muted-foreground">
              위**즈
            </div>
            <div className="p-3 bg-muted rounded-lg text-center text-muted-foreground">
              청년***들
            </div>
            <div className="p-3 bg-muted rounded-lg text-center text-muted-foreground">
              디***스
            </div>
            <div className="p-3 bg-muted rounded-lg text-center text-muted-foreground">
              미래****
            </div>
            <div className="p-3 bg-muted rounded-lg text-center text-muted-foreground">
              스타**업
            </div>
            <div className="p-3 bg-muted rounded-lg text-center text-muted-foreground">
              청춘***
            </div>
            <div className="p-3 bg-muted rounded-lg text-center text-muted-foreground">
              드림**트
            </div>
            <div className="p-3 bg-muted rounded-lg text-center text-muted-foreground">
              유스***
            </div>
            <div className="p-3 bg-muted rounded-lg text-center text-muted-foreground">
              희망**래
            </div>
            <div className="p-3 bg-muted rounded-lg text-center text-muted-foreground">
              네**워크
            </div>
            <div className="p-3 bg-muted rounded-lg text-center text-muted-foreground">
              인**브
            </div>
            <div className="p-3 bg-muted rounded-lg text-center text-muted-foreground">
              커리**업
            </div>
            <div className="p-3 bg-muted rounded-lg text-center text-muted-foreground">
              라이**
            </div>
            <div className="p-3 bg-muted rounded-lg text-center text-muted-foreground">
              비전***
            </div>
            <div className="p-3 bg-muted rounded-lg text-center text-muted-foreground">
              퓨처**
            </div>
            <div className="p-3 bg-muted rounded-lg text-center text-muted-foreground">
              에듀***
            </div>
            <div className="p-3 bg-muted rounded-lg text-center text-muted-foreground">
              코**캠프
            </div>
            <div className="p-3 bg-muted rounded-lg text-center text-muted-foreground">
              테크**
            </div>
            <div className="p-3 bg-muted rounded-lg text-center text-muted-foreground">
              외 기타
            </div>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-6">
            ※ 각 기업의 서포터즈들은 해당 기업의 지원을 받아 프로그램에 참여합니다.
          </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Schedule Info */}
      <section className="py-12 md:py-16 lg:py-20 bg-secondary/20">
        <div className="container max-w-6xl mx-auto px-4">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-3xl">수업 일정 안내</CardTitle>
            </CardHeader>
            <CardContent>
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="flex items-start space-x-3">
              <Calendar className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium">수업 일정</p>
                <p className="text-sm text-muted-foreground">
                  주 2~3회<br/>
                  오전 or 저녁 선택 가능
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Clock className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium">총 교육 시간</p>
                <p className="text-sm text-muted-foreground">
                  6개월 과정<br/>
                  회당 2시간
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <MapPin className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium">교육 장소</p>
                <p className="text-sm text-muted-foreground">각 지역 후원사 지정 교육장</p>
              </div>
            </div>
          </div>
          <div className="border-t pt-6">
            <h4 className="font-semibold mb-3">수강 방식</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="font-medium mb-1">대규모 강의</p>
                <p className="text-sm text-muted-foreground">
                  • 온라인 + 오프라인 동시 진행<br/>
                  • 총 50명 이상 참여<br/>
                  • 전문가 강의 및 Q&A
                </p>
              </div>
              <div className="p-4 bg-primary/5 rounded-lg">
                <p className="font-medium mb-1">소규모 모임</p>
                <p className="text-sm text-muted-foreground">
                  • 지역별 오프라인 모임<br/>
                  • 10명 내외 소그룹 활동<br/>
                  • 심화 토론 및 네트워킹
                </p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              ※ 현지 거주자는 오프라인 참여만 가능하며, 타 지역 거주자는 온라인으로 수강 가능합니다.
            </p>
          </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 lg:py-24 bg-gradient-to-t from-primary/10 to-background">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            AI 시대, 인간의 가치를 지키는 여정에 함께하세요
          </h2>
          <p className="text-xl text-muted-foreground mb-10">
            지금 신청하고 특별 혜택을 받으세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="inline-flex items-center text-lg px-8 py-6" asChild>
              <Link href="#registration">
                지금 바로 신청하기
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6" asChild>
              <Link href="/contact">
                문의하기
              </Link>
            </Button>
          </div>
          <p className="mt-8 text-sm text-muted-foreground">
            ※ 조기 마감될 수 있으니 서둘러 신청해주세요
          </p>
        </div>
      </section>
    </div>
  );
}