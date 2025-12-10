'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MapPin, Users, Target, Calendar, Heart, TrendingUp, 
  Lightbulb, HandshakeIcon, Rocket, Building2, ScrollText,
  ChevronRight, Star, Award, MessageSquare, BookOpen
} from 'lucide-react';

export default function HistoryPage() {
  const [activeSection, setActiveSection] = useState('overview');

  const timeline = [
    {
      date: '2024년 12월',
      title: '드림캐쳐의 시작',
      location: '여수시',
      description: '전라남도 여수시에서 문화 체험 플랫폼 서비스가 시작되었습니다.',
      milestone: true
    },
    {
      date: '2025년 1월',
      title: '목포시 확장',
      location: '목포시',
      description: '두 번째 거점인 목포시로 확장하며 더 많은 청년들과 만났습니다.'
    },
    {
      date: '2025년 3월',
      title: '화순군 진출',
      location: '화순군',
      description: '화순 지역 청년들의 열정적인 참여로 세 번째 거점을 마련했습니다.'
    },
    {
      date: '2025년 6월',
      title: '1기 수료',
      location: '여수시',
      description: '첫 AI 인문학 부트캠프 수료생 58명을 배출했습니다. 96%의 높은 만족도를 기록했습니다.',
      milestone: true
    },
    {
      date: '2025년 8월',
      title: '나주시 확대',
      location: '나주시',
      description: '네 번째 거점인 나주시로 활동 지역을 확대했습니다. 체험 프로그램을 통해 나주 지역 청년들과 만나고 있습니다.'
    },
    {
      date: '2026년 1월',
      title: 'AI 인문학 부트캠프 2기',
      location: '나주·화순',
      description: '후원사 주최로 나주·화순 통합 지역에서 AI 인문학 부트캠프 2기가 시작될 예정입니다.',
      future: true
    },
    {
      date: '2026년 3월',
      title: '정식 서비스 론칭',
      location: '전라남도',
      description: '체험 기간을 거쳐 정식 서비스를 론칭합니다.',
      future: true,
      milestone: true
    },
    {
      date: '2026년 하반기',
      title: '10개 시군 확장',
      location: '전라남도',
      description: '전라남도 10개 시군으로 서비스를 확대합니다.',
      future: true
    },
    {
      date: '2027년',
      title: '전라남도 전체 론칭',
      location: '전라남도 22개 시군',
      description: '전라남도 22개 시군 모두에서 서비스를 제공합니다.',
      future: true,
      milestone: true
    }
  ];

  const supporterValues = [
    {
      icon: <Heart className="h-6 w-6" />,
      title: '지역 청년 서비스',
      description: '지역 청년들을 위한 문화 체험 프로그램을 제공하고 서비스를 개발합니다.'
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: '전문가 네트워크',
      description: '다양한 분야의 전문가들이 협력하여 고품질 프로그램을 제공합니다.'
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: '명확한 목표',
      description: '2026년 정식 서비스 론칭을 위해 체계적으로 준비하고 데이터를 수집합니다.'
    },
    {
      icon: <HandshakeIcon className="h-6 w-6" />,
      title: '파트너십 기반',
      description: '협력 기관과의 파트너십을 통해 안정적인 운영 기반을 구축합니다.'
    }
  ];

  const operationModel = [
    {
      title: '유연한 공간 활용',
      description: '후원사의 지원으로 공유오피스를 대여하거나, 건물주와의 협의를 통해 우리의 목적에 맞는 공간을 활용합니다. 고정된 본부 사무실 대신 필요에 따라 유연하게 운영합니다.',
      icon: <Building2 className="h-5 w-5" />
    },
    {
      title: '온라인 기반 협업',
      description: '각 지역에 별도의 본부 사무실을 두지 않고, 온라인 회의를 통해 기획하고 협업합니다. 이를 통해 효율적으로 운영하며 각 지역에서 시범 프로그램을 진행합니다.',
      icon: <Users className="h-5 w-5" />
    },
    {
      title: '데이터 기반 성장',
      description: '체험 프로그램을 통해 수집한 데이터로 더 나은 서비스를 만들어갑니다.',
      icon: <TrendingUp className="h-5 w-5" />
    },
    {
      title: '단계적 확장',
      description: '검증된 모델을 바탕으로 차근차근 지역을 확대해 나갑니다.',
      icon: <Rocket className="h-5 w-5" />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Hero Section */}
      <section className="py-12 md:py-20 border-b">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4" variant="outline">
              <BookOpen className="w-3 h-3 mr-1" />
              드림캐쳐 스토리
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              문화 체험 플랫폼의 성장 스토리
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              지역 청년들을 위한 문화 서비스 플랫폼의 발전 과정
            </p>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-2">4</div>
                <p className="text-sm text-muted-foreground">운영 도시</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-2">58+</div>
                <p className="text-sm text-muted-foreground">참여 청년</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-2">96%</div>
                <p className="text-sm text-muted-foreground">만족도</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-2">2027</div>
                <p className="text-sm text-muted-foreground">전남 전체 목표</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container max-w-6xl mx-auto px-4">
          <Tabs defaultValue="story" className="space-y-8">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="story">우리의 이야기</TabsTrigger>
              <TabsTrigger value="timeline">성장 과정</TabsTrigger>
              <TabsTrigger value="operation">운영 방식</TabsTrigger>
              <TabsTrigger value="vision">미래 비전</TabsTrigger>
            </TabsList>

            {/* 우리의 이야기 */}
            <TabsContent value="story" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">시작의 이유</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray max-w-none">
                  <p className="text-lg leading-relaxed mb-6">
                    대한민국의 많은 지역이 인구감소로 인한 지역소멸 위기에 직면해 있습니다. 
                    특히 청년들이 떠나간 지역은 활력을 잃고, 문화적 인프라마저 사라지고 있습니다.
                  </p>
                  <p className="text-lg leading-relaxed mb-6">
                    드림캐쳐는 <strong>&ldquo;지역 청년들을 위한 문화 서비스의 필요성&rdquo;</strong>을 
                    인식하고 시작되었습니다. 데이터 기반으로 지역 청년들에게 
                    맞춤형 문화 프로그램을 제공하고 있습니다.
                  </p>
                  <div className="bg-primary/5 border-l-4 border-primary p-6 my-8">
                    <p className="text-lg font-medium">
                      2026년 3월 정식 서비스 론칭을 목표로, 현재는 체험 프로그램을 통해 
                      청년들의 목소리를 듣고 더 나은 서비스를 만들어가고 있습니다.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">운영 가치</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    {supporterValues.map((value, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="text-primary mt-1">{value.icon}</div>
                        <div>
                          <h3 className="font-semibold mb-2">{value.title}</h3>
                          <p className="text-muted-foreground">{value.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 p-6 bg-accent/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <strong>운영팀:</strong> 드림캐쳐는 다양한 분야의 전문가들로 
                      구성된 팀이 운영하고 있습니다. 각 분야의 전문성을 바탕으로 
                      고품질 프로그램을 제공합니다.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 성장 과정 */}
            <TabsContent value="timeline" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">우리가 걸어온 길</CardTitle>
                  <CardDescription>여수에서 시작하여 전라남도 전체로 확장하는 여정</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {timeline.map((item, index) => (
                      <div key={index} className="relative pl-8 pb-8 last:pb-0">
                        {index !== timeline.length - 1 && (
                          <div className="absolute left-[15px] top-8 bottom-0 w-0.5 bg-border" />
                        )}
                        <div className={`absolute left-0 w-8 h-8 rounded-full flex items-center justify-center ${
                          item.milestone ? 'bg-primary' : 'bg-background border-2 border-primary'
                        }`}>
                          {item.milestone ? (
                            <Star className="w-4 h-4 text-primary-foreground" />
                          ) : (
                            <div className="w-2 h-2 bg-primary rounded-full" />
                          )}
                        </div>
                        <div className={`${item.future ? 'opacity-60' : ''}`}>
                          <div className="flex items-center gap-3 mb-2">
                            <Badge variant={item.future ? 'outline' : 'default'}>
                              {item.date}
                            </Badge>
                            <Badge variant="secondary">
                              <MapPin className="w-3 h-3 mr-1" />
                              {item.location}
                            </Badge>
                            {item.future && <Badge variant="outline">예정</Badge>}
                          </div>
                          <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                          <p className="text-muted-foreground">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 운영 방식 */}
            <TabsContent value="operation" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">우리만의 운영 철학</CardTitle>
                  <CardDescription>효율적이고 유연한 운영 시스템</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    {operationModel.map((model, index) => (
                      <Card key={index} className="border-l-4 border-l-primary">
                        <CardContent className="pt-6">
                          <div className="flex items-start gap-3 mb-3">
                            <div className="text-primary">{model.icon}</div>
                            <h3 className="font-semibold">{model.title}</h3>
                          </div>
                          <p className="text-muted-foreground text-sm">
                            {model.description}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">우리의 활동 방식</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <ChevronRight className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">온라인 중심의 운영 체계</p>
                        <p className="text-sm text-muted-foreground">
                          각 지역에 고정된 본부 사무실 없이 온라인 회의를 통해 기획하고, 이를 기반으로 각 지역에서 시범 프로그램을 운영합니다
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <ChevronRight className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">유연한 공간 활용</p>
                        <p className="text-sm text-muted-foreground">
                          후원사 지원을 통한 공유오피스 대여 또는 건물주와의 협의를 통해 목적에 맞는 공간을 활용합니다
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <ChevronRight className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">지역 맞춤형 프로그램</p>
                        <p className="text-sm text-muted-foreground">
                          각 지역의 특성과 청년들의 니즈에 맞는 프로그램을 운영합니다
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <ChevronRight className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">청년들의 목소리 반영</p>
                        <p className="text-sm text-muted-foreground">
                          참가자들의 피드백을 적극 수렴하여 프로그램을 개선합니다
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <ChevronRight className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">지속가능한 성장</p>
                        <p className="text-sm text-muted-foreground">
                          단계적 확장을 통해 안정적이고 지속가능한 서비스를 구축합니다
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 미래 비전 */}
            <TabsContent value="vision" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">2026-2027 로드맵</CardTitle>
                  <CardDescription>전라남도 전체로 확장하는 구체적인 계획</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="p-6 bg-primary/5 rounded-lg border border-primary/20">
                      <div className="flex items-center gap-3 mb-3">
                        <Badge className="bg-primary text-primary-foreground">2026년 3월</Badge>
                        <h3 className="font-semibold">정식 서비스 론칭</h3>
                      </div>
                      <p className="text-muted-foreground mb-3">
                        체험 기간 동안 수집한 데이터와 피드백을 바탕으로 완성된 서비스를 선보입니다.
                      </p>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <Award className="w-4 h-4 text-primary" />
                          체계화된 프로그램 커리큘럼
                        </li>
                        <li className="flex items-center gap-2">
                          <Award className="w-4 h-4 text-primary" />
                          온라인 플랫폼 정식 오픈
                        </li>
                        <li className="flex items-center gap-2">
                          <Award className="w-4 h-4 text-primary" />
                          후원사 공식 발표
                        </li>
                      </ul>
                    </div>

                    <div className="p-6 bg-accent/10 rounded-lg border border-accent/20">
                      <div className="flex items-center gap-3 mb-3">
                        <Badge variant="outline">2026년 하반기</Badge>
                        <h3 className="font-semibold">10개 시군 확장</h3>
                      </div>
                      <p className="text-muted-foreground">
                        현재 4개 시군에서 10개 시군으로 서비스를 확대합니다. 
                        순천, 광양, 구례, 담양, 곡성, 보성 등이 포함될 예정입니다.
                      </p>
                    </div>

                    <div className="p-6 bg-secondary rounded-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <Badge variant="secondary">2027년</Badge>
                        <h3 className="font-semibold">전라남도 22개 시군 전체 론칭</h3>
                      </div>
                      <p className="text-muted-foreground">
                        전라남도 모든 시군의 청년들이 드림캐쳐와 함께할 수 있도록 
                        서비스를 전면 확대합니다.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">사업 목표</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Users className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2">10,000+</h3>
                      <p className="text-sm text-muted-foreground">
                        2027년까지 만날 청년들
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <MapPin className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2">22개 시군</h3>
                      <p className="text-sm text-muted-foreground">
                        전라남도 전체 커버리지
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Heart className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2">지속가능한</h3>
                      <p className="text-sm text-muted-foreground">
                        비즈니스 모델 구축
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Call to Action */}
          <Card className="mt-12 border-primary/30 bg-gradient-to-br from-primary/5 to-background">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-primary" />
                베타 테스트 참여 안내
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg leading-relaxed mb-6">
                드림캐쳐는 지역 청년들을 위한 문화 서비스 플랫폼입니다. 
                베타 테스트 참여자의 피드백을 통해 더 나은 서비스를 개발하고 있습니다.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="border-l-4 border-l-primary">
                  <CardContent className="pt-6">
                    <h4 className="font-semibold mb-2">체험 프로그램 참여</h4>
                    <p className="text-sm text-muted-foreground">
                      다양한 문화 체험 프로그램에 참여하여 새로운 경험을 쌓아보세요.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-l-4 border-l-accent">
                  <CardContent className="pt-6">
                    <h4 className="font-semibold mb-2">AI 부트캠프 신청</h4>
                    <p className="text-sm text-muted-foreground">
                      6개월 과정의 AI 인문학 부트캠프로 미래를 준비하세요.
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="text-center mt-8">
                <p className="text-sm text-muted-foreground mb-4">
                  <strong>현재 진행 중:</strong> 전라남도 4개 시군(여수, 목포, 화순, 나주)에서 체험 프로그램 운영 중
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>2026년 목표:</strong> 10개 시군 확장 | <strong>2027년 목표:</strong> 전라남도 22개 시군 전체
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}