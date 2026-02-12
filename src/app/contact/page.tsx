'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Phone, Mail, MapPin, Clock, MessageSquare, HelpCircle, 
  Send, ChevronRight, Users, Calendar, DollarSign, Sparkles,
  AlertCircle
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('문의가 접수되었습니다. 빠른 시일 내에 답변드리겠습니다.');
  };

  // FAQ 데이터 - 프로그램 관련
  const programFAQs = [
    {
      question: '드림캐쳐는 어떤 단체인가요?',
      answer: '드림캐쳐는 전라남도 지역 청년들을 위한 문화 프로그램을 운영하는 청년 단체입니다. 여수, 목포, 화순을 중심으로 향수 만들기, 베이킹, 보드게임 등 다양한 체험 프로그램을 제공하고 있습니다.'
    },
    {
      question: '왜 프로그램이 무료 또는 할인가로 제공되나요?',
      answer: '현재는 2026년 여름 정식 런칭 전 체험 기간입니다. 여러 장학회의 후원으로 운영되고 있어 재료비 및 최소 운영비만 받고 있습니다. 여러분의 피드백을 통해 더 나은 프로그램을 만들어가고 있습니다.'
    },
    {
      question: '어떤 프로그램들이 있나요?',
      answer: '향수 만들기, 홈베이킹, 퍼스널컬러 진단, 보드게임, 캘리그래피, 사진 촬영, 석고방향제 만들기 등 다양한 문화 체험 프로그램이 있습니다. 모든 프로그램은 전문가와 함께 진행됩니다.'
    },
    {
      question: '프로그램은 어디서 진행되나요?',
      answer: '드림캐쳐는 각 지역에 고정된 본부 사무실을 두지 않고, 후원사의 지원을 통해 공유오피스를 대여하거나 건물주와의 협의를 통해 목적에 맞는 공간을 활용합니다. 현재 여수, 목포, 화순, 나주에서 프로그램을 진행하고 있으며, 정확한 장소는 신청자에게 별도로 전달됩니다. 온라인 회의를 통해 기획하고 각 지역에서 시범 운영 중입니다.'
    },
    {
      question: '누구나 참여할 수 있나요?',
      answer: '네, 전라남도에 거주하거나 활동하는 청년이라면 누구나 참여 가능합니다. 대부분의 프로그램은 20-30대를 대상으로 하지만, 프로그램에 따라 전 연령 참여도 가능합니다.'
    }
  ];

  // FAQ 데이터 - 신청 및 비용
  const applicationFAQs = [
    {
      question: '프로그램 신청은 어떻게 하나요?',
      answer: '홈페이지의 "프로그램" 페이지에서 원하시는 프로그램을 선택하여 신청하실 수 있습니다. 각 프로그램마다 신청 방법이 조금씩 다를 수 있으니 상세 페이지를 확인해주세요.'
    },
    {
      question: '참가비는 얼마인가요?',
      answer: '체험 기간 동안 대부분의 프로그램은 5,000원~10,000원의 재료비만 받고 있습니다. 보드게임, 북클럽 등 일부 프로그램은 무료입니다. 정가 대비 80~100% 할인된 가격입니다.'
    },
    {
      question: '모집 정원은 몇 명인가요?',
      answer: '프로그램마다 다르지만 보통 8~15명 정도의 소규모로 운영됩니다. 보드게임이나 네트워킹 행사는 20명 이상 참여 가능합니다.'
    },
    {
      question: '취소는 어떻게 하나요?',
      answer: '프로그램 시작 24시간 전까지 취소 가능하며, 전액 환불됩니다. 당일 취소는 재료 준비 관계로 환불이 어려울 수 있습니다.'
    },
    {
      question: '단체 신청도 가능한가요?',
      answer: '네, 가능합니다. 5명 이상 단체 신청 시 별도 문의를 통해 일정 조율이 가능합니다. 문의하기 페이지나 이메일(dream24culture@outlook.kr)로 연락주세요.'
    }
  ];

  // FAQ 데이터 - 운영 관련
  const operationFAQs = [
    {
      question: '프로그램은 언제 진행되나요?',
      answer: '프로그램마다 다르지만 주로 주말(토요일) 오후나 평일 저녁에 진행됩니다. 직장인과 학생들이 참여하기 편한 시간대로 운영하고 있습니다.'
    },
    {
      question: '준비물이 필요한가요?',
      answer: '대부분의 재료와 도구는 저희가 준비합니다. 편한 복장으로 오시면 되고, 베이킹 수업의 경우 앞치마를 준비해주시면 좋습니다.'
    },
    {
      question: '주차는 가능한가요?',
      answer: '프로그램 진행 장소마다 주차 가능 여부가 다릅니다. 신청 확정 시 장소와 함께 주차 정보를 안내드립니다. 다만 공간이 한정적이므로 대중교통 이용을 권장합니다.'
    },
    {
      question: '프로그램 후기는 어디서 볼 수 있나요?',
      answer: '활동 갤러리 페이지에서 실제 프로그램 진행 사진과 참여자들의 작품을 보실 수 있습니다. 또한 커뮤니티 페이지에서 참가자 후기를 확인하실 수 있습니다.'
    },
    {
      question: '정식 서비스는 언제 시작되나요?',
      answer: '2026년 여름 정식 론칭 예정입니다. 테스터 기간을 확장하여 운영 중이며, 여러분의 피드백을 반영하여 더 나은 서비스를 준비하고 있습니다.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-12 md:py-16 lg:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-background"></div>
        <div className="container relative z-10 max-w-6xl mx-auto px-4">
          <div className="text-center">
            <Badge className="mb-4 px-4 py-1" variant="secondary">
              <Sparkles className="w-3 h-3 mr-1" />
              Contact
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              문의하기
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              드림캐쳐와 함께하고 싶은 모든 분들의 문의를 환영합니다
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-8 md:py-12 -mt-8">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-1">이메일</h3>
                <p className="text-sm text-muted-foreground">dream24culture@outlook.kr</p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-1">위치</h3>
                <p className="text-sm text-muted-foreground">여수, 목포, 화순</p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-1">운영시간</h3>
                <p className="text-sm text-muted-foreground">평일 09:00-18:00</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container max-w-6xl mx-auto px-4">
          <Tabs defaultValue="faq" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="faq">자주 묻는 질문</TabsTrigger>
              <TabsTrigger value="inquiry">문의하기</TabsTrigger>
            </TabsList>

            {/* FAQ Tab */}
            <TabsContent value="faq" className="space-y-8">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold mb-4 flex items-center">
                    <Users className="w-6 h-6 mr-2 text-primary" />
                    드림캐쳐 소개
                  </h2>
                  <Accordion type="single" collapsible className="space-y-2">
                    {programFAQs.map((faq, index) => (
                      <AccordionItem key={index} value={`program-${index}`} className="border rounded-lg px-4">
                        <AccordionTrigger className="hover:no-underline">
                          <span className="text-left">{faq.question}</span>
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>

                <div>
                  <h2 className="text-xl md:text-2xl font-bold mb-4 flex items-center">
                    <DollarSign className="w-6 h-6 mr-2 text-primary" />
                    신청 및 비용
                  </h2>
                  <Accordion type="single" collapsible className="space-y-2">
                    {applicationFAQs.map((faq, index) => (
                      <AccordionItem key={index} value={`application-${index}`} className="border rounded-lg px-4">
                        <AccordionTrigger className="hover:no-underline">
                          <span className="text-left">{faq.question}</span>
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>

                <div>
                  <h2 className="text-xl md:text-2xl font-bold mb-4 flex items-center">
                    <Calendar className="w-6 h-6 mr-2 text-primary" />
                    운영 관련
                  </h2>
                  <Accordion type="single" collapsible className="space-y-2">
                    {operationFAQs.map((faq, index) => (
                      <AccordionItem key={index} value={`operation-${index}`} className="border rounded-lg px-4">
                        <AccordionTrigger className="hover:no-underline">
                          <span className="text-left">{faq.question}</span>
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </div>

              <Alert className="mt-8">
                <HelpCircle className="h-4 w-4" />
                <AlertDescription>
                  원하시는 답변을 찾지 못하셨나요? 문의하기 탭에서 직접 문의해주세요.
                </AlertDescription>
              </Alert>
            </TabsContent>

            {/* Inquiry Tab */}
            <TabsContent value="inquiry">
              <Card>
                <CardHeader>
                  <CardTitle>문의 남기기</CardTitle>
                  <CardDescription>
                    궁금하신 사항을 남겨주시면 빠른 시일 내에 답변드리겠습니다.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">이름 *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">이메일 *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone">연락처</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">문의 유형 *</Label>
                        <select
                          id="subject"
                          className="w-full px-3 py-2 border rounded-md"
                          value={formData.subject}
                          onChange={(e) => handleInputChange('subject', e.target.value)}
                          required
                        >
                          <option value="">선택해주세요</option>
                          <option value="program">프로그램 문의</option>
                          <option value="application">신청 문의</option>
                          <option value="partnership">협력/제휴 문의</option>
                          <option value="other">기타 문의</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">문의 내용 *</Label>
                      <Textarea
                        id="message"
                        rows={6}
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        placeholder="문의하실 내용을 자세히 작성해주세요."
                        required
                      />
                    </div>

                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        • 문의 답변은 영업일 기준 1-2일 내에 이메일로 발송됩니다.<br/>
                        • 긴급한 문의는 이메일로 보내주시면 빠르게 확인하겠습니다.
                      </AlertDescription>
                    </Alert>

                    <Button type="submit" size="lg" className="w-full">
                      문의 보내기
                      <Send className="w-4 h-4 ml-2" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}