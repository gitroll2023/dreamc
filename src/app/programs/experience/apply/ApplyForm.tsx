'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { 
  Sparkles, Calendar, MapPin, Users, Clock, DollarSign, 
  AlertCircle, CheckCircle, Info, BookOpen, Coffee, Palette,
  Gamepad2, PenTool, Camera, Heart
} from 'lucide-react';
import Link from 'next/link';

// 프로그램 정보
const programInfo: Record<string, any> = {
  'humanities': {
    title: '동네에서 인문학?',
    icon: BookOpen,
    price: '예치금 30,000원',
    duration: '2시간',
    location: '나주',
    locationNote: '(추후 별도 공지)',
    description: '철학, 역사, 문학, 예술 등 다양한 주제로 함께 생각하고 토론합니다.',
    materials: '도서 및 자료 제공',
    maxParticipants: 20,
    isAvailable: true
  },
  'cocktail': {
    title: '칵테일 파티 체험',
    icon: Heart,
    price: '5,000원',
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
    price: '5,000원',
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
    materials: '다양한 보드게임 구비',
    maxParticipants: 20
  },
  'calligraphy': {
    title: '캘리그래피 수업',
    icon: PenTool,
    price: '5,000원',
    duration: '2시간',
    location: '미정',
    locationNote: '(추후 별도 공지)',
    description: '아름다운 손글씨의 세계로 여러분을 초대합니다',
    materials: '펜, 잉크, 연습지 제공',
    maxParticipants: 8
  },
  'photography': {
    title: '감성 사진 촬영',
    icon: Camera,
    price: '무료',
    duration: '2시간',
    location: '미정',
    locationNote: '(추후 별도 공지)',
    description: '전문가와 함께 인생사진을 남겨보세요',
    materials: '카메라 대여 가능',
    maxParticipants: 6
  },
  'book-club': {
    title: '북클럽 모임',
    icon: BookOpen,
    price: '무료',
    duration: '2시간',
    location: '미정',
    locationNote: '(추후 별도 공지)',
    description: '책과 함께하는 따뜻한 대화의 시간',
    materials: '음료 제공',
    maxParticipants: 15
  }
};

export default function ApplyForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const programType = searchParams.get('type') || 'baking';
  const program = programInfo[programType] || programInfo['baking'];
  const ProgramIcon = program.icon;
  const [showNoShowModal, setShowNoShowModal] = useState(false);

  // humanities가 아닌 프로그램은 모달 표시
  useEffect(() => {
    if (programType !== 'humanities') {
      setShowNoShowModal(true);
    }
  }, [programType]);

  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    phone: '',
    email: '',
    location: '',
    gender: '',
    experience: '',
    expectation: '',
    referralSource: '',
    otherPrograms: '',
    privacyConsent: false,
    marketingConsent: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name) newErrors.name = '이름을 입력해주세요';
    if (!formData.birthDate) newErrors.birthDate = '생년월일을 입력해주세요';
    if (!formData.phone) newErrors.phone = '연락처를 입력해주세요';
    if (!formData.email) newErrors.email = '이메일을 입력해주세요';
    if (!formData.location) newErrors.location = '거주지역을 입력해주세요';
    if (!formData.gender) newErrors.gender = '성별을 선택해주세요';
    if (!formData.privacyConsent) newErrors.privacyConsent = '개인정보 수집 및 이용에 동의해주세요';

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = '올바른 이메일 형식을 입력해주세요';
    }

    // Phone validation
    const phoneRegex = /^[0-9]{10,11}$/;
    if (formData.phone && !phoneRegex.test(formData.phone.replace(/-/g, ''))) {
      newErrors.phone = '올바른 연락처를 입력해주세요';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/experience-applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          programType: programType,
          programTitle: program.title,
          status: 'pending'
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitSuccess(true);
        // Reset form
        setFormData({
          name: '',
          birthDate: '',
          phone: '',
          email: '',
          location: '',
          gender: '',
          experience: '',
          expectation: '',
          referralSource: '',
          otherPrograms: '',
          privacyConsent: false,
          marketingConsent: false
        });
      } else {
        alert('신청 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('신청 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen py-12">
        <div className="container max-w-2xl mx-auto px-4">
          <Card className="border-green-200 bg-green-50">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <CheckCircle className="w-16 h-16 text-green-600 mx-auto" />
                <h2 className="text-2xl font-bold text-green-800">신청이 완료되었습니다!</h2>
                <p className="text-gray-600">
                  {program.title} 프로그램 신청이 성공적으로 접수되었습니다.
                </p>
                <p className="text-sm text-gray-500">
                  신청 내용 확인 후 개별 연락드리겠습니다.
                </p>
                <Button
                  onClick={() => window.location.href = '/programs'}
                  className="mt-4"
                >
                  다른 프로그램 보기
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-12 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-background"></div>
        <div className="container relative z-10 max-w-4xl mx-auto px-4">
          <div className="text-center">
            <Badge className="mb-4" variant="secondary">
              <Sparkles className="w-3 h-3 mr-1" />
              체험 프로그램 신청
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              {program.title}
            </h1>
            <p className="text-lg text-muted-foreground">
              {program.description}
            </p>
          </div>
        </div>
      </section>

      {/* Program Info */}
      <section className="py-8">
        <div className="container max-w-4xl mx-auto px-4">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ProgramIcon className="w-5 h-5 text-primary" />
                프로그램 정보
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                    <DollarSign className="w-4 h-4" />
                    참가비
                  </div>
                  <p className="font-semibold">{program.price}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                    <Clock className="w-4 h-4" />
                    소요시간
                  </div>
                  <p className="font-semibold">{program.duration}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                    <MapPin className="w-4 h-4" />
                    장소
                  </div>
                  <p className="font-semibold">
                    {program.location}
                    {program.locationNote && (
                      <span className="text-xs text-muted-foreground block">{program.locationNote}</span>
                    )}
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                    <Users className="w-4 h-4" />
                    정원
                  </div>
                  <p className="font-semibold">{program.maxParticipants}명</p>
                </div>
              </div>
              {program.materials && (
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    <Info className="w-4 h-4 inline mr-1" />
                    {program.materials}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Application Form */}
          <Card>
            <CardHeader>
              <CardTitle>신청서 작성</CardTitle>
              <CardDescription>
                아래 정보를 입력해주세요. * 표시는 필수 입력 항목입니다.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">기본 정보</h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">이름 *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className={errors.name ? 'border-red-500' : ''}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="birthDate">생년월일 *</Label>
                      <Input
                        id="birthDate"
                        type="date"
                        value={formData.birthDate}
                        onChange={(e) => handleInputChange('birthDate', e.target.value)}
                        className={errors.birthDate ? 'border-red-500' : ''}
                      />
                      {errors.birthDate && (
                        <p className="text-red-500 text-sm mt-1">{errors.birthDate}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">연락처 *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="010-0000-0000"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className={errors.phone ? 'border-red-500' : ''}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="email">이메일 *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="example@email.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={errors.email ? 'border-red-500' : ''}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="location">거주지역 *</Label>
                      <Input
                        id="location"
                        placeholder="예: 여수시"
                        value={formData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        className={errors.location ? 'border-red-500' : ''}
                      />
                      {errors.location && (
                        <p className="text-red-500 text-sm mt-1">{errors.location}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label>성별 *</Label>
                      <RadioGroup
                        value={formData.gender}
                        onValueChange={(value) => handleInputChange('gender', value)}
                      >
                        <div className="flex space-x-4 mt-2">
                          <div className="flex items-center">
                            <RadioGroupItem value="male" id="male" />
                            <Label htmlFor="male" className="ml-2">남성</Label>
                          </div>
                          <div className="flex items-center">
                            <RadioGroupItem value="female" id="female" />
                            <Label htmlFor="female" className="ml-2">여성</Label>
                          </div>
                          <div className="flex items-center">
                            <RadioGroupItem value="other" id="other" />
                            <Label htmlFor="other" className="ml-2">기타</Label>
                          </div>
                        </div>
                      </RadioGroup>
                      {errors.gender && (
                        <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">추가 정보</h3>
                  
                  <div>
                    <Label htmlFor="experience">관련 경험이 있으신가요?</Label>
                    <Textarea
                      id="experience"
                      rows={3}
                      placeholder="프로그램과 관련된 경험이 있다면 자유롭게 작성해주세요"
                      value={formData.experience}
                      onChange={(e) => handleInputChange('experience', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="expectation">프로그램에 기대하는 점</Label>
                    <Textarea
                      id="expectation"
                      rows={3}
                      placeholder="이 프로그램을 통해 얻고 싶은 것이 있다면 알려주세요"
                      value={formData.expectation}
                      onChange={(e) => handleInputChange('expectation', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="referralSource">어떻게 알게 되셨나요?</Label>
                    <Input
                      id="referralSource"
                      placeholder="예: 인스타그램, 지인 추천 등"
                      value={formData.referralSource}
                      onChange={(e) => handleInputChange('referralSource', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="otherPrograms">참여하고 싶은 다른 프로그램이 있나요?</Label>
                    <Input
                      id="otherPrograms"
                      placeholder="관심 있는 다른 프로그램을 알려주세요"
                      value={formData.otherPrograms}
                      onChange={(e) => handleInputChange('otherPrograms', e.target.value)}
                    />
                  </div>
                </div>

                {/* Terms and Consent */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">약관 동의</h3>
                  
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      <div className="space-y-3">
                        <div>
                          <strong>개인정보 수집 및 이용 안내</strong>
                          <ul className="mt-2 text-sm space-y-1">
                            <li>• 수집 항목: 이름, 생년월일, 연락처, 이메일, 거주지역, 성별</li>
                            <li>• 수집 목적: 프로그램 신청 접수 및 안내</li>
                            <li>• 보유 기간: 프로그램 종료 후 1년</li>
                          </ul>
                        </div>
                      </div>
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="privacyConsent"
                        checked={formData.privacyConsent}
                        onChange={(e) => handleInputChange('privacyConsent', e.target.checked)}
                        className="rounded"
                      />
                      <Label htmlFor="privacyConsent" className="text-sm">
                        개인정보 수집 및 이용에 동의합니다 (필수)
                      </Label>
                    </div>
                    {errors.privacyConsent && (
                      <p className="text-red-500 text-sm">{errors.privacyConsent}</p>
                    )}

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="marketingConsent"
                        checked={formData.marketingConsent}
                        onChange={(e) => handleInputChange('marketingConsent', e.target.checked)}
                        className="rounded"
                      />
                      <Label htmlFor="marketingConsent" className="text-sm">
                        프로그램 및 이벤트 정보 수신에 동의합니다 (선택)
                      </Label>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? '신청 중...' : '신청하기'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Notice */}
          <Alert className="mt-8">
            <Info className="h-4 w-4" />
            <AlertDescription>
              <ul className="space-y-1 text-sm">
                <li>• 신청 접수 후 개별 연락을 통해 참가 확정 여부를 안내드립니다.</li>
                <li>• 프로그램 시작 24시간 전까지 취소 가능하며, 전액 환불됩니다.</li>
                <li>• 최소 인원 미달 시 프로그램이 취소될 수 있습니다.</li>
                <li>• 문의사항은 dream24culture@outlook.kr로 연락주세요.</li>
              </ul>
            </AlertDescription>
          </Alert>
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
            <Button 
              variant="outline" 
              onClick={() => {
                setShowNoShowModal(false);
                router.back();
              }}
            >
              이전으로
            </Button>
            <Button asChild>
              <Link href="/contact">문의하기</Link>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}