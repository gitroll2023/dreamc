'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Sparkles, Calendar, MapPin, Users, Clock, DollarSign, 
  AlertCircle, CheckCircle, Info, BookOpen, Coffee, Palette,
  Gamepad2, PenTool, Camera, Heart
} from 'lucide-react';

// 프로그램 정보
const programInfo: Record<string, any> = {
  'cocktail': {
    title: '칵테일 파티 체험',
    icon: Heart,
    price: '10,000원',
    duration: '2시간',
    location: '미정',
    locationNote: '(추후 별도 공지)',
    description: '전문 바텐더와 함께 다양한 칵테일을 만들고 파티 분위기를 즐겨보세요.',
    materials: '모든 재료 제공',
    maxParticipants: 12
  },
  'baking': {
    title: '홈베이킹 클래스',
    icon: Coffee,
    price: '10,000원',
    duration: '3시간',
    location: '미정',
    locationNote: '(추후 별도 공지)',
    description: '마들렌, 쿠키, 브라우니 등 달콤한 디저트를 직접 만들어보세요.',
    materials: '모든 재료 및 포장 박스 제공',
    maxParticipants: 10
  },
  'board-game': {
    title: '보드게임 체험',
    icon: Gamepad2,
    price: '2,000원/시간',
    duration: '3시간',
    location: '미정',
    locationNote: '(추후 별도 공지)',
    description: '다양한 보드게임을 즐기며 새로운 친구들을 만나보세요',
    materials: '간식 제공',
    maxParticipants: 20
  },
  'calligraphy': {
    title: '캘리그래피 클래스',
    icon: PenTool,
    price: '5,000원',
    duration: '2시간',
    location: '미정',
    locationNote: '(추후 별도 공지)',
    description: '붓펜으로 아름다운 한글 캘리그래피를 배워보세요',
    materials: '붓펜 및 연습지 제공',
    maxParticipants: 10
  },
  'photo': {
    title: '스마트폰 사진 클래스',
    icon: Camera,
    price: '5,000원',
    duration: '2시간',
    location: '미정',
    locationNote: '(추후 별도 공지)',
    description: '스마트폰으로 전문가처럼 사진 찍는 방법을 배워보세요',
    materials: '촬영 팁 자료 제공',
    maxParticipants: 15
  },
  'humanities': {
    title: '동네에서 인문학? (나주편)',
    icon: BookOpen,
    price: '예치금 30,000원',
    priceNote: '(수료 시 환급)',
    duration: '기수별 진행 (월 1회)',
    location: '미정',
    locationNote: '(추후 별도 공지)',
    description: '매번 다른 주제로 진행되는 깊이 있는 인문학 스터디입니다. 철학, 예술, 문학, 미술 등 다양한 주제로 함께 생각하고 토론합니다. 인문학 스터디 일정은 조율하여 진행됩니다',
    materials: '도서 및 자료 제공',
    maxParticipants: 15,
    special: '예치금 제도: 과정을 100% 참여하시면 예치금 전액 환급'
  }
};

export default function ExperienceApplyPage() {
  const searchParams = useSearchParams();
  const programType = searchParams.get('type') || 'cocktail';
  const program = programInfo[programType] || programInfo['cocktail'];
  const Icon = program.icon;

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    age: '',
    location: '',
    preferredDate: '',
    preferredTime: '',
    message: '',
    agreement: false,
    depositAgreement: false // 인문학 프로그램용
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, ''); // Remove non-digits
    
    // Ensure it starts with 010
    if (value.length > 0 && !value.startsWith('010')) {
      return;
    }
    
    // Limit to 11 digits
    if (value.length > 11) {
      return;
    }
    
    // Format with hyphens
    let formatted = value;
    if (value.length > 3 && value.length <= 7) {
      formatted = `${value.slice(0, 3)}-${value.slice(3)}`;
    } else if (value.length > 7) {
      formatted = `${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(7)}`;
    }
    
    setFormData(prev => ({ ...prev, phone: formatted }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (programType === 'humanities' && !formData.depositAgreement) {
      alert('예치금 정책에 동의해주세요.');
      return;
    }
    
    // Validate required fields
    if (!formData.name || !formData.phone || !formData.age || !formData.location || 
        !formData.preferredDate || !formData.preferredTime || !formData.agreement) {
      alert('필수 항목을 모두 입력해주세요.');
      return;
    }
    
    try {
      const response = await fetch('/api/experience-applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          programType,
          programTitle: program.title,
          ...formData
        }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        alert('신청이 완료되었습니다. 확인 후 연락드리겠습니다.');
        // Reset form
        setFormData({
          name: '',
          phone: '',
          age: '',
          location: '',
          preferredDate: '',
          preferredTime: '',
          message: '',
          agreement: false,
          depositAgreement: false
        });
      } else {
        alert('신청 처리 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      
      alert('신청 처리 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-12 md:py-16 lg:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-background"></div>
        <div className="container relative z-10 max-w-4xl mx-auto px-4">
          <div className="text-center">
            <Badge className="mb-4 px-4 py-1" variant="secondary">
              <Sparkles className="w-3 h-3 mr-1" />
              Experience Program
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              체험 프로그램 신청
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              드림캐쳐와 함께 특별한 경험을 만들어보세요
            </p>
          </div>
        </div>
      </section>

      {/* Program Info */}
      <section className="py-8 -mt-8">
        <div className="container max-w-4xl mx-auto px-4">
          <Card className="border-2 border-primary/20">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">{program.title}</CardTitle>
                    <CardDescription className="mt-1">{program.description}</CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">참가비</p>
                    <p className="font-semibold">{program.price}</p>
                    {program.priceNote && (
                      <p className="text-xs text-muted-foreground">{program.priceNote}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">소요시간</p>
                    <p className="font-semibold">{program.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">장소</p>
                    <p className="font-semibold">{program.location}</p>
                    {program.locationNote && (
                      <p className="text-xs text-muted-foreground">{program.locationNote}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">정원</p>
                    <p className="font-semibold">최대 {program.maxParticipants}명</p>
                  </div>
                </div>
              </div>

              {program.special && (
                <Alert className="mb-6">
                  <Info className="h-4 w-4" />
                  <AlertDescription className="font-semibold">
                    {program.special}
                  </AlertDescription>
                </Alert>
              )}

              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>포함사항:</strong> {program.materials}
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-12 md:py-16">
        <div className="container max-w-4xl mx-auto px-4">
          <Card>
            <CardHeader>
              <CardTitle>참가 신청서</CardTitle>
              <CardDescription>
                아래 정보를 입력해주시면 확인 후 연락드리겠습니다.
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
                    <Label htmlFor="phone">연락처 *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="010-0000-0000"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      maxLength={13}
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="age">연령대 *</Label>
                    <select
                      id="age"
                      className="w-full px-3 py-2 border rounded-md"
                      value={formData.age}
                      onChange={(e) => handleInputChange('age', e.target.value)}
                      required
                    >
                      <option value="">선택해주세요</option>
                      <option value="20s">20대</option>
                      <option value="30s">30대</option>
                      <option value="40s">40대</option>
                      <option value="50s">50대 이상</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">거주 지역 *</Label>
                    <select
                      id="location"
                      className="w-full px-3 py-2 border rounded-md"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      required
                    >
                      <option value="">선택해주세요</option>
                      <option value="yeosu">여수</option>
                      <option value="mokpo">목포</option>
                      <option value="hwasun">화순</option>
                      <option value="naju">나주</option>
                      <option value="other">기타</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="preferredDate">희망 날짜 *</Label>
                    <Input
                      id="preferredDate"
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>희망 시간대 *</Label>
                    <RadioGroup
                      value={formData.preferredTime}
                      onValueChange={(value) => handleInputChange('preferredTime', value)}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="morning" id="morning" />
                        <Label htmlFor="morning">오전 (10:00-12:00)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="afternoon" id="afternoon" />
                        <Label htmlFor="afternoon">오후 (14:00-17:00)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="evening" id="evening" />
                        <Label htmlFor="evening">저녁 (18:00-20:00)</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">추가 메시지</Label>
                  <Textarea
                    id="message"
                    rows={4}
                    placeholder="알레르기, 특이사항 등을 알려주세요"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                  />
                </div>

                {programType === 'humanities' && (
                  <Alert className="bg-primary/5">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>예치금 안내</strong><br/>
                      • 예치금 30,000원은 프로그램 시작 전 입금해주셔야 합니다<br/>
                      • 전체 과정을 100% 출석하시면 전액 환급됩니다<br/>
                      • 중도 포기 시 예치금은 환급되지 않습니다.<br/>
                      • 인문학 스터디 일정은 조율하여 1:1 또는 소그룹으로 진행됩니다<br/>
                      • 예치금은 더 나은 학습 환경과 참여자들의 책임감 있는 참여를 위한 제도입니다
                    </AlertDescription>
                  </Alert>
                )}

                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <input
                      type="checkbox"
                      id="agreement"
                      className="mt-1"
                      checked={formData.agreement}
                      onChange={(e) => handleInputChange('agreement', e.target.checked)}
                      required
                    />
                    <Label htmlFor="agreement" className="text-sm">
                      개인정보 수집 및 이용에 동의합니다 *
                    </Label>
                  </div>

                  {programType === 'humanities' && (
                    <div className="flex items-start space-x-2">
                      <input
                        type="checkbox"
                        id="depositAgreement"
                        className="mt-1"
                        checked={formData.depositAgreement}
                        onChange={(e) => handleInputChange('depositAgreement', e.target.checked)}
                        required
                      />
                      <Label htmlFor="depositAgreement" className="text-sm">
                        예치금 정책을 이해하고 동의합니다 *
                      </Label>
                    </div>
                  )}
                </div>

                <Button type="submit" size="lg" className="w-full">
                  신청하기
                </Button>
              </form>
            </CardContent>
          </Card>

          <Alert className="mt-6">
            <Info className="h-4 w-4" />
            <AlertDescription>
              • 문의사항은 dream24culture@outlook.kr로 연락주세요
            </AlertDescription>
          </Alert>
        </div>
      </section>
    </div>
  );
}
