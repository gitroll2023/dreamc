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
      title: "함께하는 성장",
      description: "청년들과 함께 고민하고, 함께 성장하는 지속가능한 커뮤니티"
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
              지역 청년의 꿈을 잡아주는 <span className="text-primary">드림캐쳐</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              드림캐쳐는 인구감소로 어려움을 겪는 지역에서 청년들이 즐길 수 있는<br />
              문화를 만들어가는 청년문화단체입니다.
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
                드림캐쳐는 이러한 현실 속에서 &apos;지역 청년들도 즐길 수 있는 문화가 있어야 한다&apos;는 
                신념으로 시작되었습니다. 서울이 아니어도, 대도시가 아니어도 청년들이 
                자신의 꿈을 키우고 문화를 즐길 수 있는 환경을 만들고자 합니다.
              </p>
              <p className="mb-6">
                현재 전라남도의 여수, 목포, 화순, 나주를 중심으로 다양한 체험 프로그램을 운영하며 
                청년들의 목소리를 듣고 있습니다. 이러한 데이터와 경험을 바탕으로 
                2026년 3월, 더 체계적이고 지속가능한 청년 문화 프로그램을 선보일 예정입니다.
              </p>
              <p>
                청년 여러분의 많은 관심과 참여를 부탁드립니다.<br />
                함께 만들어가는 지역 청년 문화, 드림캐쳐가 시작합니다.
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
                드림캐쳐가 꿈꾸는 미래
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
                    인구감소 지역 청년들에게 문화적 경험과 성장의 기회를 제공하여,
                    지역에서도 꿈을 실현할 수 있는 환경을 조성합니다.
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
                        <Badge variant="default">2026.03</Badge>
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
              <h2 className="text-3xl font-bold mb-4">함께하는 사람들</h2>
              <p className="text-lg text-muted-foreground">
                드림캐쳐와 함께 청년 문화를 만들어가는 사람들
              </p>
            </div>

            <Card className="p-8">
              <div className="text-center space-y-6">
                <div className="w-32 h-32 bg-primary/10 rounded-full mx-auto flex items-center justify-center">
                  <Users className="h-16 w-16 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4">드림캐쳐 팀</h3>
                  <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                    드림캐쳐는 지역 청년 문화 혁신을 위해 모인 다양한 분야의 전문가들과 
                    청년 활동가들로 구성되어 있습니다.
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
                      <h4 className="font-semibold">협력 네트워크</h4>
                      <p className="text-sm text-muted-foreground">
                        장학회 및 지역 기관과의 협력을 통해 프로그램을 지원합니다.
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
            <h2 className="text-3xl font-bold mb-6">후원 안내</h2>
            <p className="text-lg text-muted-foreground mb-8">
              드림캐쳐는 여러 장학회와 후원자님들의 지원으로 운영되고 있습니다.<br />
              덕분에 체험 기간 동안 청년들에게 부담 없는 가격으로 프로그램을 제공할 수 있습니다.
            </p>
            <Card className="p-8 bg-primary/5 border-primary/20">
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  현재 체험 프로그램 운영을 위해 여러 장학회에서 후원해 주고 계십니다.
                  정식 서비스 출범 시 후원 기관을 공식적으로 소개할 예정입니다.
                </p>
                <p className="font-medium">
                  청년 문화 혁신에 동참하고 싶으신 분들의 많은 관심 부탁드립니다.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}