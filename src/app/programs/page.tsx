"use client"

import { useState } from "react"
import Link from "next/link"
import { MapPin, Calendar, Users, Clock, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProgramsPage() {
  const [selectedLocation, setSelectedLocation] = useState("all")

  const programs = [
    {
      id: 1,
      title: "동네에서 인문학?",
      subtitle: "청년 인문학 스터디 (나주편)",
      description: "매주 다른 주제로 진행되는 인문학 과정. 철학, 역사, 문학, 예술 등 다양한 주제로 함께 생각하고 토론합니다.",
      originalPrice: "200,000원",
      discountPrice: "예치금 30,000원",
      discount: "수료시 환급",
      tags: ["인문학", "토론", "스터디"],
      status: "체험 모집중",
      location: ["나주"],
      duration: "2시간",
      maxPeople: "20명",
      schedule: "매주 목요일 19:00",
      programType: "humanities"
    },
    {
      id: 2,
      title: "칵테일 파티 체험",
      subtitle: "전문 바텐더와 함께하는 나만의 칵테일",
      description: "전문 바텐더에게 배우는 칵테일 제조 클래스. 다양한 칵테일의 역사와 제조법을 배우고, 직접 나만의 칵테일을 만들어 보세요. 파티 분위기에서 즐기는 특별한 체험입니다.",
      originalPrice: "50,000원",
      discountPrice: "5,000원",
      discount: "90%",
      tags: ["체험", "파티", "칵테일"],
      status: "체험 모집중",
      location: ["여수", "목포", "나주"],
      duration: "2시간",
      maxPeople: "8명",
      schedule: "매주 토요일 14:00",
      programType: "cocktail"
    },
    {
      id: 3,
      title: "홈베이킹 체험 클래스",
      subtitle: "직접 만드는 디저트와 빵",
      description: "쿠키, 마들렌, 파운드케이크 등 다양한 베이킹을 체험하고 나만의 레시피를 만들어보세요. 초보자도 쉽게 따라할 수 있는 친절한 수업입니다.",
      originalPrice: "50,000원",
      discountPrice: "5,000원",
      discount: "90%",
      tags: ["베이킹", "체험", "요리"],
      status: "체험 모집중",
      location: ["목포", "나주"],
      duration: "3시간",
      maxPeople: "10명",
      schedule: "매주 토요일 10:00",
      programType: "baking"
    },
    {
      id: 4,
      title: "석고방향제 만들기",
      subtitle: "나만의 향기로운 인테리어 소품",
      description: "석고를 활용한 아름다운 방향제를 만들며 집안을 향기롭게 꾸며보세요. 다양한 몰드와 천연 에센셜 오일을 사용합니다.",
      originalPrice: "45,000원",
      discountPrice: "5,000원",
      discount: "89%",
      tags: ["공예", "체험", "인테리어"],
      status: "체험 모집중",
      location: ["여수", "화순", "나주"],
      duration: "2시간",
      maxPeople: "12명",
      schedule: "매주 수요일 19:00",
      programType: "craft"
    },
    {
      id: 5,
      title: "보드게임 체험",
      subtitle: "친구들과 함께 즐기는 보드게임",
      description: "50여종의 보드게임을 자유롭게 즐기며 청년들과 소통하는 문화 공간입니다. 게임 마스터가 친절하게 룰을 설명해드립니다.",
      originalPrice: "3,000원/시간",
      discountPrice: "2,000원/시간",
      discount: "33%",
      tags: ["게임", "소통", "문화"],
      status: "체험 모집중",
      location: ["여수", "목포", "화순", "나주"],
      duration: "자유",
      maxPeople: "30명",
      schedule: "화-일 14:00-22:00",
      programType: "boardgame"
    },
    {
      id: 6,
      title: "청년 북클럽",
      subtitle: "함께 읽고 토론하는 독서 모임",
      description: "매월 선정된 도서를 함께 읽고 생각을 나누는 지적 교류의 장입니다. 다양한 분야의 책을 통해 시야를 넓혀보세요.",
      originalPrice: "20,000원",
      discountPrice: "무료",
      discount: "100%",
      tags: ["독서", "토론", "인문학"],
      status: "체험 모집중",
      location: ["목포", "나주"],
      duration: "2시간",
      maxPeople: "15명",
      schedule: "매월 첫째 주 토요일 15:00",
      programType: "bookclub"
    },
    {
      id: 7,
      title: "스마트폰 사진 클래스",
      subtitle: "전문가처럼 사진 찍는 법",
      description: "기본 촬영 기법부터 보정까지, 일상을 예술로 담는 방법을 배워보세요. 스마트폰만 있으면 누구나 참여 가능합니다.",
      originalPrice: "50,000원",
      discountPrice: "5,000원",
      discount: "90%",
      tags: ["사진", "예술", "창작"],
      status: "체험 모집중",
      location: ["여수", "화순"],
      duration: "3시간",
      maxPeople: "10명",
      schedule: "매주 일요일 10:00",
      programType: "photo"
    },
    {
      id: 8,
      title: "한글 캘리그래피",
      subtitle: "아름다운 한글 손글씨 배우기",
      description: "전통 캘리그래피를 배우며 나만의 감성을 담은 작품을 만들어보세요. 기초부터 차근차근 배울 수 있습니다.",
      originalPrice: "40,000원",
      discountPrice: "5,000원",
      discount: "88%",
      tags: ["예술", "전통", "창작"],
      status: "체험 모집중",
      location: ["나주"],
      duration: "2시간",
      maxPeople: "8명",
      schedule: "매주 금요일 19:00",
      programType: "calligraphy"
    }
  ]

  const partnershipProgram = {
    title: "AI 인문학 부트캠프",
    subtitle: "AI가 절대 가질 수 없는, 인간만의 영역을 탐구하는 6개월",
    description: "AI가 모든 것을 대체하는 시대. 그럼에도 결코 AI가 침범할 수 없는 인간만의 고유한 영역이 있습니다. 그것이 무엇인지, 어떻게 개발해야 하는지 함께 탐구합니다.",
    originalPrice: "월 200,000원",
    discountPrice: "월 20,000원",
    duration: "6개월",
    schedule: "매일 1-2시간 (온/오프라인 병행)",
    curriculum: [
      "AI가 이해할 수 없는 인간의 감정과 공감",
      "기계가 흉내낼 수 없는 진정한 창의성",
      "알고리즘이 판단할 수 없는 윤리와 가치",
      "데이터로 설명되지 않는 인간의 직관",
      "AI가 경험할 수 없는 삶의 의미와 목적",
      "인간만이 만들 수 있는 관계와 신뢰"
    ],
    benefits: [
      "AI 시대를 선도하는 전문가들과의 만남",
      "실제 사례 중심의 토론과 실습",
      "나만의 차별화된 역량 개발 로드맵",
      "함께 성장하는 동료들과의 네트워킹"
    ],
    requirements: [
      "전라남도 4개 지역(여수, 목포, 화순, 나주) 거주자",
      "만 19세 이상",
      "6개월간 성실히 참여 가능한 분",
      "인간의 가치와 미래에 대한 깊은 관심이 있는 분"
    ]
  }

  const locations = ["all", "여수", "목포", "화순", "나주"]

  const filteredPrograms = selectedLocation === "all" 
    ? programs 
    : programs.filter(p => p.location.includes(selectedLocation))

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-12 md:py-16 lg:py-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="absolute inset-0 dreamcatcher-pattern opacity-20"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4" variant="secondary">
              EXPERIENCE PROGRAMS
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              체험 프로그램
            </h1>
            <p className="text-xl text-muted-foreground">
              전라남도 청년들을 위한 다양한 문화 체험 프로그램<br />
              지금 바로 신청하고 특별한 경험을 시작하세요
            </p>
          </div>
        </div>
      </section>

      {/* Partnership Program Section */}
      <section className="py-12 md:py-16 bg-accent/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="max-w-5xl mx-auto border-accent/20">
            <div className="bg-gradient-to-r from-accent/10 to-primary/10 p-6">
              <div>
                <Badge variant="outline" className="mb-2">협력사 프로그램</Badge>
                <h2 className="text-2xl font-bold">{partnershipProgram.title}</h2>
                <p className="text-muted-foreground mt-1">{partnershipProgram.subtitle}</p>
              </div>
            </div>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold mb-3">프로그램 소개</h3>
                  <p className="text-muted-foreground mb-6">{partnershipProgram.description}</p>
                  
                  <h3 className="font-semibold mb-3">커리큘럼</h3>
                  <ul className="space-y-2 mb-6">
                    {partnershipProgram.curriculum.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                        <span className="text-sm text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">프로그램 혜택</h3>
                  <ul className="space-y-2 mb-6">
                    {partnershipProgram.benefits.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-accent mt-0.5" />
                        <span className="text-sm text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <h3 className="font-semibold mb-3">신청 자격</h3>
                  <ul className="space-y-2 mb-6">
                    {partnershipProgram.requirements.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <span className="text-sm text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="bg-primary/5 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground line-through">정가</span>
                      <span className="text-sm text-muted-foreground line-through">{partnershipProgram.originalPrice}</span>
                    </div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-semibold">드림캐쳐 특별가</span>
                      <span className="text-2xl font-bold text-primary">{partnershipProgram.discountPrice}</span>
                    </div>
                    <div className="space-y-2 mt-3 pt-3 border-t">
                      <p className="text-xs font-medium text-accent">💡 결제 안내</p>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• 첫 주는 무료 체험 기간</li>
                        <li>• 2주차부터 참가비 납부 (월납 가능)</li>
                        <li>• 6개월 총 참가비: <span className="font-semibold text-primary">12만원</span> (정가 120만원)</li>
                        <li>• 6개월 일시납 시 <span className="font-semibold text-primary">1만원 추가 할인</span></li>
                        <li>• 참가비는 시설 관리비로 사용됩니다</li>
                        <li>• 참가비 납부 후 중도 포기 시 환불 불가</li>
                      </ul>
                    </div>
                  </div>

                  <Link href="/programs/ai-bootcamp">
                    <Button className="w-full mt-4" size="lg">
                      부트캠프 신청하기
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Regular Programs Section */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">드림캐쳐 체험 프로그램</h2>
            <p className="text-lg text-muted-foreground">
              지역별로 다양한 체험 프로그램을 만나보세요
            </p>
          </div>

          {/* Location Filter */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex flex-wrap gap-2 p-1 bg-secondary rounded-lg max-w-full">
              {locations.map((location) => (
                <Button
                  key={location}
                  variant={selectedLocation === location ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedLocation(location)}
                  className="min-w-[60px] px-3 text-sm"
                >
                  {location === "all" ? "전체" : location}
                </Button>
              ))}
            </div>
          </div>

          {/* Program Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrograms.map((program) => (
              <Card key={program.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="destructive">{program.discount} 할인</Badge>
                    <Badge variant="outline">{program.status}</Badge>
                  </div>
                  <CardTitle>{program.title}</CardTitle>
                  <CardDescription>{program.subtitle}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{program.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{program.location.join(", ")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{program.duration} | {program.schedule}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">최대 {program.maxPeople}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {program.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground line-through">정가</span>
                      <span className="text-sm text-muted-foreground line-through">{program.originalPrice}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-primary">체험가</span>
                      <span className="text-2xl font-bold text-primary">{program.discountPrice}</span>
                    </div>
                  </div>

                  <Button className="w-full mt-4" asChild>
                    <Link href={`/programs/experience/apply?type=${program.programType}`}>
                      체험 신청하기
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Notice Section */}
      <section className="py-12 md:py-16 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle>체험 프로그램 안내사항</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">신청 자격</h4>
                <p className="text-sm text-muted-foreground">
                  • 만 19세 ~ 39세 청년<br />
                  • 해당 지역 거주자 우선 (타 지역 거주자도 신청 가능)
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">체험 혜택</h4>
                <p className="text-sm text-muted-foreground">
                  • 정가 대비 최대 100% 할인된 체험 가격<br />
                  • 전문가 직접 지도 및 재료 제공<br />
                  • 수료증 발급 (일부 프로그램)
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">주의사항</h4>
                <p className="text-sm text-muted-foreground">
                  • 체험 프로그램은 사전 예약제로 운영됩니다<br />
                  • 최소 인원 미달 시 일정이 변경될 수 있습니다<br />
                  • 무단 불참 시 향후 프로그램 참여가 제한될 수 있습니다
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}