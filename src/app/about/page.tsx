import Link from "next/link"
import { Target, Eye, Users, Award, Calendar, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  // Timeline data moved to /history page for better user experience

  const values = [
    {
      icon: Target,
      title: "지역 청년 중심",
      description: "인구감소 지역 청년들의 실질적인 니즈를 반영한 프로그램 개발"
    },
    {
      icon: Users,
      title: "데이터 기반 운영",
      description: "참여자 데이터를 수집하고 분석하여 맞춤형 서비스 개발"
    },
    {
      icon: Award,
      title: "전문성과 혁신",
      description: "전문가와 함께하는 고품질 프로그램으로 새로운 문화 창출"
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section id="greeting" className="relative py-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="absolute inset-0 dreamcatcher-pattern opacity-20"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4" variant="secondary">
              ABOUT DREAMCATCHER
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              지역 청년을 위한 문화 플랫폼 <span className="text-primary">드림캐쳐</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              드림캐쳐는 인구감소 지역의 청년들을 위한<br />
              문화 체험 프로그램을 제공하는 플랫폼입니다.
            </p>
          </div>
        </div>
      </section>

      {/* Greeting Section */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">인사말</h2>
            <div className="prose prose-lg text-muted-foreground">
              <p className="mb-6">
                안녕하세요, 드림캐쳐입니다.
              </p>
              <p className="mb-6">
                대한민국의 많은 지역이 인구감소로 인한 지역소멸 위기에 직면해 있습니다. 
                특히 청년들이 떠나간 지역은 활력을 잃고, 문화적 인프라마저 사라지고 있습니다.
              </p>
              <p className="mb-6">
                드림캐쳐는 이러한 현실 속에서 지역 청년들을 위한 
                문화 서비스의 필요성을 인식하고 시작되었습니다. 데이터 기반으로 
                지역별 맞춤형 문화 프로그램을 개발하고 제공합니다.
              </p>
              <p className="mb-6">
                현재 전라남도의 여수, 목포, 화순, 나주를 중심으로 다양한 체험 프로그램을 운영하며 
                청년들의 목소리를 듣고 있습니다. 이러한 데이터와 경험을 바탕으로 
                2026년 여름, 더 체계적이고 지속가능한 청년 문화 프로그램을 선보일 예정입니다.
              </p>
              <p>
                베타 테스트에 참여해 주시는 분들의 피드백을 바탕으로<br />
                더 나은 서비스를 개발하겠습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section id="mission" className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">미션과 비전</h2>
              <p className="text-lg text-muted-foreground">
                드림캐쳐의 사업 목표
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="border-primary/20">
                <CardHeader>
                  <Eye className="h-12 w-12 text-primary mb-4" />
                  <CardTitle className="text-2xl">Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    인구감소 지역 청년들에게 문화 체험 프로그램을 제공하고,
                    수집된 데이터를 바탕으로 지속가능한 비즈니스 모델을 구축합니다.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-accent/20">
                <CardHeader>
                  <Target className="h-12 w-12 text-accent mb-4" />
                  <CardTitle className="text-2xl">Our Vision</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    전국의 모든 지역 청년들이 자신의 지역에서 
                    풍부한 문화를 즐기고 성장할 수 있는 대한민국을 만듭니다.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {values.map((value, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <value.icon className="h-10 w-10 text-primary mx-auto mb-4" />
                    <CardTitle className="text-lg">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section id="history" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">우리의 여정</h2>
              <p className="text-lg text-muted-foreground mb-8">
                여수에서 시작하여 전라남도 전체로 확장하는 드림캐쳐의 이야기
              </p>
            </div>

            <Card className="border-primary/20 hover:shadow-lg transition-shadow">
              <CardContent className="py-12">
                <div className="text-center space-y-6">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <Calendar className="w-10 h-10 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold mb-3">드림캐쳐 스토리</h3>
                    <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                      2024년 12월 여수에서 시작하여 현재 4개 시군에서 활발히 활동 중이며,<br />
                      2027년 전라남도 22개 시군 전체 확장을 목표로 하고 있습니다.
                    </p>
                  </div>
                  
                  {/* Key Milestones */}
                  <div className="grid md:grid-cols-4 gap-4 mb-8">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-1">4개</div>
                      <p className="text-sm text-muted-foreground">현재 운영 도시</p>
                      <p className="text-xs text-muted-foreground mt-1">여수·목포·화순·나주</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-1">58+</div>
                      <p className="text-sm text-muted-foreground">참여 청년</p>
                      <p className="text-xs text-muted-foreground mt-1">1기 수료생</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-1">96%</div>
                      <p className="text-sm text-muted-foreground">만족도</p>
                      <p className="text-xs text-muted-foreground mt-1">프로그램 참여자</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-accent mb-1">2027</div>
                      <p className="text-sm text-muted-foreground">목표 연도</p>
                      <p className="text-xs text-muted-foreground mt-1">전남 22개 시군</p>
                    </div>
                  </div>

                  {/* Timeline Preview */}
                  <div className="bg-secondary/50 rounded-lg p-6 text-left max-w-2xl mx-auto">
                    <h4 className="font-semibold mb-4 text-center">주요 연혁</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline">2024.12</Badge>
                        <span className="text-sm">여수시에서 드림캐쳐 시작</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="outline">2025.06</Badge>
                        <span className="text-sm">1기 수료식 (58명 수료)</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="outline">2025.08</Badge>
                        <span className="text-sm">나주시 2기 시작</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="default">2026 여름</Badge>
                        <span className="text-sm font-medium">정식 서비스 론칭 (예정)</span>
                      </div>
                    </div>
                  </div>

                  <Link href="/history">
                    <Button size="lg" className="inline-flex items-center" variant="default">
                      자세한 스토리 보기
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <p className="text-sm text-muted-foreground">
                    성장 과정, 운영 방식, 미래 비전을 확인하세요
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">운영팀</h2>
              <p className="text-lg text-muted-foreground">
                드림캐쳐 서비스를 운영하는 전문가 그룹
              </p>
            </div>

            <Card className="p-8">
              <div className="text-center space-y-6">
                <div className="w-32 h-32 bg-primary/10 rounded-full mx-auto flex items-center justify-center">
                  <Users className="h-16 w-16 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4">운영 조직</h3>
                  <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                    드림캐쳐는 문화 서비스 전문가들과 
                    데이터 분석팀으로 구성되어 있습니다.
                  </p>
                  <div className="grid md:grid-cols-3 gap-6 text-left">
                    <div className="space-y-2">
                      <h4 className="font-semibold">기획 운영팀</h4>
                      <p className="text-sm text-muted-foreground">
                        프로그램 기획 및 운영, 지역 청년들과의 소통을 담당합니다.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold">전문 강사진</h4>
                      <p className="text-sm text-muted-foreground">
                        각 분야 전문가들이 고품질 프로그램을 제공합니다.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold">파트너 네트워크</h4>
                      <p className="text-sm text-muted-foreground">
                        협력 기관과의 파트너십을 통해 프로그램을 운영합니다.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="pt-6 border-t">
                  <p className="text-sm text-muted-foreground">
                    * 정식 서비스 출범 후 구체적인 조직 구성을 공개할 예정입니다
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">파트너십 안내</h2>
            <p className="text-lg text-muted-foreground mb-8">
              드림캐쳐는 여러 기관과의 파트너십을 통해 운영되고 있습니다.<br />
              베타 테스트 기간 동안 체험가로 프로그램을 제공하고 있습니다.
            </p>
            <Card className="p-8 bg-primary/5 border-primary/20">
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  현재 베타 테스트를 위해 여러 기관과 협력하고 있습니다.
                  정식 서비스 출범 시 파트너 기관을 공식적으로 소개할 예정입니다.
                </p>
                <p className="font-medium">
                  비즈니스 파트너십에 관심 있으신 기관의 문의를 환영합니다.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}