'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
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
  User, Mail, Phone, Calendar, MapPin, Users, 
  FileText, CheckCircle2, ArrowRight, ArrowLeft,
  AlertCircle, Sparkles, Shield, Clock
} from 'lucide-react';

export default function ApplyPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    // 기본 정보
    name: '',
    birthYear: '',
    gender: '',
    phone: '',
    email: '',
    
    // 지원 및 선정
    location: '',
    startMonth: '',
    attendanceType: '', // online or offline
    
    // 추가 정보
    occupation: '',
    motivation: '',
    expectations: '',
    
    // 동의사항
    termsAgree: false,
    privacyAgree: false,
    marketingAgree: false,
  });

  const totalSteps = 4;

  const handleInputChange = (field: string, value: any) => {
    if (field === 'phone') {
      // Remove all non-numeric characters
      const numbersOnly = value.replace(/[^0-9]/g, '');
      
      // Limit to 11 digits
      const limited = numbersOnly.slice(0, 11);
      
      // Format with hyphens
      let formatted = limited;
      if (limited.length >= 4) {
        formatted = limited.slice(0, 3) + '-' + limited.slice(3);
      }
      if (limited.length >= 8) {
        formatted = limited.slice(0, 3) + '-' + limited.slice(3, 7) + '-' + limited.slice(7);
      }
      
      setFormData(prev => ({ ...prev, [field]: formatted }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setShowSuccessModal(true);
        setTimeout(() => {
          router.push('/programs/ai-bootcamp');
        }, 3000);
      } else {
        alert('신청 처리 중 오류가 발생했습니다. 다시 시도해주세요.');
        setIsSubmitting(false);
      }
    } catch (error) {
      
      alert('신청 처리 중 오류가 발생했습니다. 다시 시도해주세요.');
      setIsSubmitting(false);
    }
  };

  const isStepValid = () => {
    switch(step) {
      case 1:
        // Check if phone has exactly 11 digits and starts with 010
        const phoneDigits = formData.phone.replace(/-/g, '');
        const isPhoneValid = phoneDigits.length === 11 && phoneDigits.startsWith('010');
        return formData.name && formData.birthYear && formData.gender && isPhoneValid;
      case 2:
        return formData.location && formData.startMonth && formData.attendanceType;
      case 3:
        return formData.occupation && formData.motivation && formData.expectations;
      case 4:
        return formData.termsAgree && formData.privacyAgree;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background">
      {/* Header */}
      <section className="py-8 md:py-12 border-b">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="text-center">
            <Badge className="mb-4" variant="secondary">
              <Sparkles className="w-3 h-3 mr-1" />
              협력 프로그램
            </Badge>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">인문학 부트캠프 신청</h1>
            <p className="text-sm text-muted-foreground mb-2">Application Form</p>
            <p className="text-xs text-muted-foreground mb-4 italic">
              ※ "AI 시대에서 살아남기 인문학 부트캠프"는 가칭입니다
            </p>
            <p className="text-lg text-muted-foreground">
              2기 신청서 작성 (2025년 9월 나주 시작)
            </p>
          </div>
        </div>
      </section>

      {/* Progress Bar */}
      <section className="py-6 md:py-8">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex-1 flex items-center">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center font-bold
                  ${step >= s ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}
                  transition-all duration-300
                `}>
                  {step > s ? <CheckCircle2 className="w-6 h-6" /> : s}
                </div>
                {s < 4 && (
                  <div className={`
                    flex-1 h-1 mx-2
                    ${step > s ? 'bg-primary' : 'bg-muted'}
                    transition-all duration-300
                  `} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center mb-4">
            <p className="text-sm text-muted-foreground">
              {step === 1 && '기본 정보'}
              {step === 2 && '수강 정보'}
              {step === 3 && '추가 정보'}
              {step === 4 && '약관 동의'}
            </p>
          </div>
        </div>
      </section>

      {/* Form Content */}
      <section className="pb-12 md:pb-20">
        <div className="container max-w-4xl mx-auto px-4">
          <Card className="shadow-xl">
            <CardContent className="p-8">
              {/* Step 1: 기본 정보 */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <User className="w-8 h-8 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold mb-1">기본 정보를 입력해주세요</h2>
                    <p className="text-xs text-muted-foreground mb-2">Please Enter Your Basic Information</p>
                    <p className="text-muted-foreground">정확한 정보를 입력해주세요</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">이름 *</Label>
                      <Input
                        id="name"
                        placeholder="홍길동"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="birthYear">출생년도 *</Label>
                      <Select value={formData.birthYear} onValueChange={(value) => handleInputChange('birthYear', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="출생년도 선택" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 80 }, (_, i) => 2005 - i).map(year => (
                            <SelectItem key={year} value={year.toString()}>{year}년</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>성별 *</Label>
                      <RadioGroup value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                        <div className="flex space-x-4">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="male" id="male" />
                            <Label htmlFor="male" className="font-normal">남성</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="female" id="female" />
                            <Label htmlFor="female" className="font-normal">여성</Label>
                          </div>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">연락처 *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="010-1234-5678"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        maxLength={13}
                      />
                      <p className="text-xs text-muted-foreground">010으로 시작하는 11자리 휴대폰 번호를 입력해주세요</p>
                    </div>

                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="email">이메일 (선택)</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="example@email.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: 수강 정보 */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Calendar className="w-8 h-8 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold mb-1">수강 정보를 선택해주세요</h2>
                    <p className="text-xs text-muted-foreground mb-2">Please Select Your Course Information</p>
                    <p className="text-muted-foreground">희망하는 수강 방식을 선택해주세요</p>
                  </div>

                  <div className="space-y-6">
                    <Alert className="mb-4 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 flex-shrink-0" />
                      <AlertDescription className="flex-1">
                        <strong>2025년 9월 나주에서 2기가 시작됩니다</strong><br/>
                        1기의 성공적인 수료 이후, 2026년 3월 정식 런칭 전 마지막 시범 운영입니다
                      </AlertDescription>
                    </Alert>
                    
                    <div className="space-y-2">
                      <Label>시작 월 *</Label>
                      <RadioGroup value={formData.startMonth} onValueChange={(value) => handleInputChange('startMonth', value)}>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-muted/50">
                            <RadioGroupItem value="9" id="month9" />
                            <Label htmlFor="month9" className="font-normal cursor-pointer">
                              2025년 9월 (2기)
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2 p-4 border rounded-lg opacity-50">
                            <RadioGroupItem value="10" id="month10" disabled />
                            <Label htmlFor="month10" className="font-normal">
                              2025년 10월 (예정)
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2 p-4 border rounded-lg opacity-50">
                            <RadioGroupItem value="11" id="month11" disabled />
                            <Label htmlFor="month11" className="font-normal">
                              2025년 11월 (예정)
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2 p-4 border rounded-lg opacity-50">
                            <RadioGroupItem value="12" id="month12" disabled />
                            <Label htmlFor="month12" className="font-normal">
                              2025년 12월 (예정)
                            </Label>
                          </div>
                        </div>
                      </RadioGroup>
                      {formData.startMonth === '9' && (
                        <Alert className="mt-2 flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 flex-shrink-0" />
                          <AlertDescription className="flex-1">
                            2기는 나주시에서만 진행됩니다. 10월부터 다른 지역에도 순차적으로 오픈 예정입니다
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>수강 지역 *</Label>
                      <RadioGroup value={formData.location} onValueChange={(value) => handleInputChange('location', value)}>
                        <div className="grid grid-cols-2 gap-4">
                          <div className={`flex items-center space-x-2 p-4 border rounded-lg ${formData.startMonth === '9' ? 'hover:bg-muted/50' : 'opacity-50'}`}>
                            <RadioGroupItem value="naju" id="naju" disabled={formData.startMonth !== '9'} />
                            <Label htmlFor="naju" className={`font-normal ${formData.startMonth === '9' ? 'cursor-pointer' : ''}`}>
                              나주시{formData.startMonth === '9' && '(가능)'}
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2 p-4 border rounded-lg opacity-50">
                            <RadioGroupItem value="yeosu" id="yeosu" disabled />
                            <Label htmlFor="yeosu" className="font-normal">여수시</Label>
                          </div>
                          <div className="flex items-center space-x-2 p-4 border rounded-lg opacity-50">
                            <RadioGroupItem value="mokpo" id="mokpo" disabled />
                            <Label htmlFor="mokpo" className="font-normal">목포시</Label>
                          </div>
                          <div className="flex items-center space-x-2 p-4 border rounded-lg opacity-50">
                            <RadioGroupItem value="hwasun" id="hwasun" disabled />
                            <Label htmlFor="hwasun" className="font-normal">화순군</Label>
                          </div>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <Label>수강 방식 *</Label>
                      <RadioGroup value={formData.attendanceType} onValueChange={(value) => handleInputChange('attendanceType', value)}>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div 
                            className={`p-6 border-2 rounded-lg hover:border-primary cursor-pointer transition-all ${
                              formData.attendanceType === 'offline' ? 'border-primary bg-primary/5' : ''
                            }`}
                            onClick={() => handleInputChange('attendanceType', 'offline')}
                          >
                            <div className="flex items-start space-x-2">
                              <RadioGroupItem value="offline" id="offline" />
                              <div className="flex-1">
                                <Label htmlFor="offline" className="text-lg font-semibold cursor-pointer">오프라인 수강</Label>
                                <p className="text-sm text-muted-foreground mt-2">
                                  현지 교육장에서 직접 참여<br/>
                                  정규적 모임 참여 가능
                                </p>
                              </div>
                            </div>
                          </div>
                          <div 
                            className={`p-6 border-2 rounded-lg hover:border-primary cursor-pointer transition-all ${
                              formData.attendanceType === 'online' ? 'border-primary bg-primary/5' : ''
                            }`}
                            onClick={() => handleInputChange('attendanceType', 'online')}
                          >
                            <div className="flex items-start space-x-2">
                              <RadioGroupItem value="online" id="online" />
                              <div className="flex-1">
                                <Label htmlFor="online" className="text-lg font-semibold cursor-pointer">온라인 수강</Label>
                                <p className="text-sm text-muted-foreground mt-2">
                                  전 지역에서 원격 참여<br/>
                                  실시간 스트리밍 제공
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: 추가 정보 */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FileText className="w-8 h-8 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold mb-1">추가 정보를 입력해주세요</h2>
                    <p className="text-xs text-muted-foreground mb-2">Please Enter Additional Information</p>
                    <p className="text-muted-foreground">더 나은 프로그램 제공을 위한 정보입니다</p>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="occupation">현재 직업/신분 *</Label>
                      <Input
                        id="occupation"
                        placeholder="예: 대학생, 직장인, 프리랜서, 자영업자"
                        value={formData.occupation}
                        onChange={(e) => handleInputChange('occupation', e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="motivation">지원동기 *</Label>
                      <Textarea
                        id="motivation"
                        placeholder="AI 인문학 부트캠프에 참여하고자 하는 이유를 자유롭게 작성해주세요"
                        rows={4}
                        value={formData.motivation}
                        onChange={(e) => handleInputChange('motivation', e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">최소 50자 이상 작성해주세요</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="expectations">프로그램을 통해 기대하는 점 *</Label>
                      <Textarea
                        id="expectations"
                        placeholder="프로그램을 통해 얻고자 하는 것, 배우고 싶은 것들을 작성해주세요"
                        rows={4}
                        value={formData.expectations}
                        onChange={(e) => handleInputChange('expectations', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: 약관 동의 */}
              {step === 4 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="w-8 h-8 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold mb-1">약관에 동의해주세요</h2>
                    <p className="text-xs text-muted-foreground mb-2">Please Agree to the Terms</p>
                    <p className="text-muted-foreground">아래 약관을 확인하고 동의해주세요</p>
                  </div>

                  <div className="space-y-4">
                    <Card className="p-6">
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="termsAgree"
                          checked={formData.termsAgree}
                          onCheckedChange={(checked) => handleInputChange('termsAgree', checked)}
                          className="mt-0.5"
                        />
                        <div className="flex-1">
                          <Label htmlFor="termsAgree" className="text-base font-semibold cursor-pointer">
                            이용약관 동의 (필수)
                          </Label>
                          <div className="mt-2 p-4 bg-muted rounded-lg max-h-32 overflow-y-auto text-sm text-muted-foreground">
                            <p>제1조(목적)</p>
                            <p>본 약관은 드림캐쳐 AI 인문학 부트캠프 서비스 이용에 관한 조건 및 절차를 규정함을 목적으로 합니다.</p>
                            <p className="mt-2">제2조(프로그램 운용)</p>
                            <p>1. 프로그램은 6개월 과정으로 진행됩니다.</p>
                            <p>2. 주 2~3회 수업이 진행됩니다.</p>
                            <p>3. 오프라인과 온라인 수업이 병행됩니다.</p>
                          </div>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-6">
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="privacyAgree"
                          checked={formData.privacyAgree}
                          onCheckedChange={(checked) => handleInputChange('privacyAgree', checked)}
                          className="mt-0.5"
                        />
                        <div className="flex-1">
                          <Label htmlFor="privacyAgree" className="text-base font-semibold cursor-pointer">
                            개인정보 수집 및 이용 동의 (필수)
                          </Label>
                          <div className="mt-2 p-4 bg-muted rounded-lg max-h-32 overflow-y-auto text-sm text-muted-foreground">
                            <p>1. 수집항목: 이름, 연락처, 이메일, 생년월일, 성별</p>
                            <p>2. 수집목적: 프로그램 운영 및 안내</p>
                            <p>3. 보유기간: 프로그램 종료 후 1년</p>
                            <p>4. 동의를 거부할 권리가 있으며, 거부 시 프로그램 참여가 제한될 수 있습니다.</p>
                          </div>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-6">
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="marketingAgree"
                          checked={formData.marketingAgree}
                          onCheckedChange={(checked) => handleInputChange('marketingAgree', checked)}
                          className="mt-0.5"
                        />
                        <div className="flex-1">
                          <Label htmlFor="marketingAgree" className="text-base font-semibold cursor-pointer">
                            마케팅 정보 수신 동의 (선택)
                          </Label>
                          <p className="text-sm text-muted-foreground mt-2">
                            프로그램 관련 유용한 정보와 이벤트 소식을 받아보실 수 있습니다.
                          </p>
                        </div>
                      </div>
                    </Card>
                  </div>

                  <Alert className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    <AlertDescription className="flex-1">
                      필수 항목에 동의하지 않으시면 신청이 불가능합니다.
                    </AlertDescription>
                  </Alert>
                </div>
              )}

              {/* Navigation Buttons */}
              <Separator className="my-8" />
              
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={handlePrev}
                  disabled={step === 1}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  이전
                </Button>

                {step < totalSteps ? (
                  <Button
                    onClick={handleNext}
                    disabled={!isStepValid()}
                    className="flex items-center gap-2"
                  >
                    다음
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={!isStepValid() || isSubmitting}
                    className="flex items-center gap-2"
                    size="lg"
                  >
                    {isSubmitting ? '처리중...' : '신청 완료'}
                    {!isSubmitting && <CheckCircle2 className="w-4 h-4" />}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Info Box */}
          <Alert className="mt-8 flex items-center gap-2">
            <Clock className="h-4 w-4 flex-shrink-0" />
            <AlertDescription className="flex-1">
              신청서 작성은 약 5-10분 정도 소요됩니다. 
              작성 중 페이지를 벗어나면 입력한 정보가 저장되지 않으니 주의해주세요.
            </AlertDescription>
          </Alert>
        </div>
      </section>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            </div>
            <DialogTitle className="text-center text-xl">신청이 완료되었습니다!</DialogTitle>
            <DialogDescription className="text-center pt-2">
              <p className="mb-2">
                <strong>{formData.name}</strong>님의 인문학 부트캠프 신청이
                성공적으로 접수되었습니다.
              </p>
              <p className="text-sm text-muted-foreground">
                입력하신 연락처로 안내 메시지를 발송해드리겠습니다.
              </p>
              <p className="text-xs text-muted-foreground mt-4">
                잠시 후 부트캠프 페이지로 이동합니다...
              </p>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}