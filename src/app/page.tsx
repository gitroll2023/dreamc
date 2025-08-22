'use client';

import { useState, useEffect } from 'react';
import Link from "next/link"
import { ArrowRight, Users, Sparkles, Heart, MapPin, Calendar, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface Announcement {
  id: string;
  category: string;
  title: string;
  preview: string;
  content: string;
  views: number;
  date: string;
  publishedAt: string;
}

export default function Home() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNoShowModal, setShowNoShowModal] = useState(false);

  // 최신 공지사항 4개 가져오기
  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await fetch('/api/announcements?category=all');
      const data = await response.json();
      // 최신 4개만 가져오기
      setAnnouncements(data.slice(0, 4));
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const getCategoryText = (category: string) => {
    switch(category) {
      case 'important': return '중요';
      case 'recruitment': return '모집';
      case 'event': return '행사';
      case 'notice': return '공지';
      default: return '공지';
    }
  };

  const programs = [
    {
      id: 1,
      title: "AI 시대에서 살아남기 인문학 부트캠프",
      subtitle: "AI가 대체할 수 없는 인간만의 가치 발견",
      description: "만 19세 이상 전연령이 함께하는 6개월 인문학 과정. AI 시대에 인간만의 고유한 가치와 역량을 개발합니다.",
      originalPrice: "월 200,000원",
      discountPrice: "월 20,000원",
      discount: "90%",
      tags: ["부트캠프", "협력프로그램", "6개월"],
      status: "2기 모집중",
      location: "나주 (2025년 9월)",
      isPartnership: true,
      partnerInfo: "※ 후원 기업 서포터즈와 함께하는 프로그램"
    },
    {
      id: 2,
      title: "동네북코칭",
      subtitle: "청년 인문학 스터디 (나주편)",
      description: "매주 다른 주제로 진행되는 인문학 과정. 철학, 역사, 문학, 예술 등 다양한 주제로 함께 생각하고 토론합니다.",
      originalPrice: "200,000원",
      discountPrice: "예치금 30,000원",
      discount: "수료시 환급",
      tags: ["인문학", "토론", "스터디"],
      status: "체험 모집중",
      location: "나주",
      programType: "humanities"
    },
    {
      id: 3,
      title: "칵테일 클래스",
      subtitle: "전문 바텐더와 함께하는 나만의 칵테일",
      description: "전문 바텐더에게 배우는 칵테일 제조 클래스. 파티 분위기에서 즐기는 특별한 체험입니다.",
      originalPrice: "50,000원",
      discountPrice: "5,000원",
      discount: "90%",
      tags: ["체험", "창작", "힐링"],
      status: "체험 모집중",
      location: "여수, 목포, 나주",
      programType: "cocktail"
    },
    {
      id: 4,
      title: "홈베이킹 클래스",
      subtitle: "달콤한 디저트 만들기",
      description: "마들렌, 브라우니, 쿠키 등 다양한 베이킹을 배워보세요.",
      originalPrice: "50,000원",
      discountPrice: "5,000원",
      discount: "90%",
      tags: ["체험", "베이킹", "디저트"],
      status: "체험 모집중",
      location: "여수, 목포, 나주",
      programType: "baking"
    },
    {
      id: 5,
      title: "캘리그라피 클래스",
      subtitle: "아름다운 손글씨 배우기",
      description: "전문가와 함께 캘리그라피의 기초를 배워보세요.",
      originalPrice: "40,000원",
      discountPrice: "5,000원",
      discount: "88%",
      tags: ["체험", "예술", "취미"],
      status: "체험 모집중",
      location: "여수, 목포, 나주",
      programType: "calligraphy"
    },
    {
      id: 6,
      title: "보드게임 체험",
      subtitle: "다양한 보드게임 체험",
      description: "50여종의 보드게임과 함께 즐거운 시간을 보내세요.",
      originalPrice: "5,000원/시간",
      discountPrice: "2,000원/시간",
      discount: "60%",
      tags: ["체험", "게임", "네트워킹"],
      status: "체험 모집중",
      location: "여수, 목포, 나주",
      programType: "board-game"
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-28 md:pb-24 lg:pt-32 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10"></div>
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center">
            <Badge className="mb-4 px-4 py-1.5" variant="secondary">
              <Sparkles className="w-3 h-3 mr-1" />
              2026년 3월 정식 서비스 런칭 예정
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              전라남도 청년들을 위한<br />
              <span className="text-primary">문화 체험 플랫폼</span> 드림캐쳐
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto px-4">
              다양한 문화 체험 프로그램을 통해 데이터를 수집하고 있습니다.<br />
              베타 테스트 기간 동안 <span className="font-semibold text-foreground">체험가</span>로 참여하실 수 있습니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" asChild className="text-base sm:text-lg px-6 sm:px-8">
                <Link href="/programs">
                  체험 프로그램 신청하기
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-base sm:text-lg px-6 sm:px-8">
                <Link href="/about">드림캐쳐 소개</Link>
              </Button>
            </div>
            <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 inline-block">
              <p className="text-sm font-medium text-accent">
                🎉 베타 테스트 참여자 모집 중! 체험가로 프로그램에 참여하세요
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section className="py-12 md:py-16 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">베타 테스트 참여 안내</h2>
            <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8">
              드림캐쳐는 2026년 3월 정식 서비스 런칭을 준비하고 있습니다.<br />
              서비스 개선을 위한 데이터 수집과 피드백이 필요한 시점입니다.
            </p>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              <Card className="border-primary/20">
                <CardHeader>
                  <Users className="h-10 w-10 text-primary mb-2" />
                  <CardTitle className="text-lg">베타 테스터</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    참가자들의 피드백을 바탕으로 서비스를 개선합니다.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-primary/20">
                <CardHeader>
                  <Sparkles className="h-10 w-10 text-primary mb-2" />
                  <CardTitle className="text-lg">데이터 수집</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    지역별 청년들의 니즈를 파악하여 맞춤형 프로그램을 개발합니다.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-primary/20">
                <CardHeader>
                  <Heart className="h-10 w-10 text-primary mb-2" />
                  <CardTitle className="text-lg">파트너십</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    협력 기관과의 파트너십을 통해 베타 테스트를 진행합니다.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">체험 프로그램</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              전라남도 청년들을 위한 문화 체험 프로그램<br />
              베타 테스트 기간 중 체험가로 참여 가능합니다
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((program) => (
              <Card key={program.id} className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full">
                <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-4">
                  <Badge className="mb-2" variant="destructive">
                    {program.discount} 할인
                  </Badge>
                  <Badge className="mb-2 ml-2" variant="outline">
                    {program.status}
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle>{program.title}</CardTitle>
                  <CardDescription className="text-base">{program.subtitle}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-sm text-muted-foreground mb-4">{program.description}</p>
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{program.location}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {program.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  {program.isPartnership ? (
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground line-through">정가</span>
                          <span className="text-sm line-through">{program.originalPrice}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold">체험가</span>
                          <span className="text-lg font-bold text-primary">{program.discountPrice}</span>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground border-t pt-3">
                        {program.partnerInfo}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground line-through">정가</span>
                        <span className="text-sm line-through">{program.originalPrice}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold">체험가</span>
                        <span className="text-lg font-bold text-primary">{program.discountPrice}</span>
                      </div>
                      {program.programType === 'humanities' && (
                        <div className="text-xs text-primary font-medium mt-2">
                          (수료 시 환급)
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  {program.isPartnership ? (
                    <Button className="w-full" asChild>
                      <Link href="/programs">자세히 보기</Link>
                    </Button>
                  ) : program.programType ? (
                    <Button className="w-full" variant="outline" asChild>
                      <Link href={`/programs/experience/apply?type=${program.programType}`}>
                        체험 신청하기
                      </Link>
                    </Button>
                  ) : (
                    <Button className="w-full" variant="outline" asChild>
                      <Link href="/programs">자세히 보기</Link>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-background to-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">사업 목표</h2>
              <p className="text-lg text-muted-foreground">
                데이터 기반으로 지역 청년들을 위한 문화 서비스를 개발합니다
              </p>
            </div>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl">현재 활동</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">전라남도 4개 도시 활동</p>
                      <p className="text-sm text-muted-foreground">여수, 목포, 화순, 나주 중심 프로그램 운영</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">체험 프로그램 데이터 수집</p>
                      <p className="text-sm text-muted-foreground">청년 니즈 파악 및 프로그램 개선</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">협력 기관 네트워크</p>
                      <p className="text-sm text-muted-foreground">다양한 기관과의 파트너십 구축</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl">미래 비전</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">2026년 3월 정식 서비스</p>
                      <p className="text-sm text-muted-foreground">체계적인 청년 문화 프로그램 론칭</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">전국 확대 계획</p>
                      <p className="text-sm text-muted-foreground">인구감소 지역 중심 단계적 확장</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">지속가능한 비즈니스 모델</p>
                      <p className="text-sm text-muted-foreground">지역별 맞춤형 문화 콘텐츠 개발</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">새소식</h2>
              <p className="text-muted-foreground">드림캐쳐의 최신 소식과 활동을 확인하세요</p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/community">
                전체보기
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {announcements.map((item) => (
                <Link href="/community" key={item.id}>
                  <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant={item.category === 'important' ? "destructive" : "secondary"}>
                          {getCategoryText(item.category)}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{item.date}</span>
                      </div>
                      <CardTitle className="text-base line-clamp-2">{item.title}</CardTitle>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6">
              문화 체험 플랫폼<br />
              베타 테스트 참여자 모집
            </h2>
            <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8">
              베타 테스트 기간 동안 다양한 프로그램을 체험가로 이용하실 수 있습니다.<br />
              참여자의 피드백은 서비스 개선에 활용됩니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8" asChild>
                <Link href="/programs">
                  체험 프로그램 참여하기
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8" asChild>
                <Link href="/contact">문의하기</Link>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              * 베타 테스트 기간 중 재료비 및 운영비 수준의 체험가로 운영됩니다
            </p>
          </div>
        </div>
      </section>

      {/* No-show 안내 모달 */}
      <Dialog open={showNoShowModal} onOpenChange={setShowNoShowModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-amber-500" />
              홈페이지 신청 일시 중단 안내
            </DialogTitle>
            <DialogDescription className="pt-4 space-y-3">
              <p>
                현재 <strong>노쇼(No-show)</strong> 문제로 인해 홈페이지를 통한 
                체험 프로그램 신청을 일시적으로 중단하고 있습니다.
              </p>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                <p className="text-sm font-medium text-amber-900 mb-1">
                  현장 신청 안내
                </p>
                <p className="text-sm text-amber-800">
                  체험 프로그램 신청은 현재 <strong>현장에서 서포터즈의 도움</strong>으로만 
                  접수받고 있습니다.
                </p>
              </div>
              <p className="text-sm">
                양해 부탁드리며, 빠른 시일 내에 홈페이지 신청을 재개할 수 있도록 
                노력하겠습니다.
              </p>
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setShowNoShowModal(false)}>
              확인
            </Button>
            <Button asChild>
              <Link href="/contact">문의하기</Link>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}