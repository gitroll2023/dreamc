'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { 
  ClipboardList, Gift, Star, Users, Heart, 
  MessageSquare, CheckCircle2, AlertCircle, Sparkles 
} from 'lucide-react';

export default function SurveyPage() {
  const router = useRouter();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    // 기본 정보
    supporterGroup: '',
    participantName: '',
    
    // 체험 프로그램 정보
    programType: '',
    customProgramName: '',
    
    // 만족도 평가
    kindnessRating: '',
    explanationRating: '',
    satisfactionRating: '',
    recommendRating: '',
    participateAgain: '',
    
    // 다음 체험 프로그램 선택
    nextExperience: '',
    
    // 추첨 이벤트
    participateLottery: false,
    phone: '',
    
    // 피드백
    goodPoints: '',
    improvements: '',
    additionalFeedback: ''
  });

  const handleInputChange = (field: string, value: any) => {
    if (field === 'phone') {
      // Remove all non-numeric characters
      const numbersOnly = value.replace(/[^0-9]/g, '');
      
      // Ensure it starts with 010
      let formatted = numbersOnly;
      if (!formatted.startsWith('010') && formatted.length > 0) {
        formatted = '010' + formatted.replace(/^0+/, '');
      }
      
      // Limit to 11 digits
      const limited = formatted.slice(0, 11);
      
      // Format with hyphens
      let finalFormatted = limited;
      if (limited.length >= 4) {
        finalFormatted = limited.slice(0, 3) + '-' + limited.slice(3);
      }
      if (limited.length >= 8) {
        finalFormatted = limited.slice(0, 3) + '-' + limited.slice(3, 7) + '-' + limited.slice(7);
      }
      
      setFormData(prev => ({ ...prev, [field]: finalFormatted }));
    } else if (field === 'participateLottery') {
      setFormData(prev => ({ 
        ...prev, 
        [field]: value,
        phone: value ? prev.phone : '' // Clear phone if unchecked
      }));
    } else if (field === 'programType') {
      setFormData(prev => ({ 
        ...prev, 
        [field]: value,
        customProgramName: value !== '기타' ? '' : prev.customProgramName // Clear custom name if not 기타
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleRadioChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Get current Korean time
    const koreanTime = new Date().toLocaleString('ko-KR', {
      timeZone: 'Asia/Seoul',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });

    const surveyData = {
      ...formData,
      submittedAt: koreanTime
    };

    try {
      const response = await fetch('/api/survey', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(surveyData),
      });

      const result = await response.json();

      if (result.success) {
        setShowSuccessModal(true);
        setTimeout(() => {
          router.push('/');
        }, 3000);
      } else {
        alert('설문 제출 중 오류가 발생했습니다. 다시 시도해주세요.');
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Error submitting survey:', error);
      alert('설문 제출 중 오류가 발생했습니다. 다시 시도해주세요.');
      setIsSubmitting(false);
    }
  };

  const isFormValid = () => {
    // Check required fields
    if (!formData.supporterGroup || !formData.participantName || !formData.programType) {
      return false;
    }
    
    // Check custom program name if 기타 is selected
    if (formData.programType === '기타' && !formData.customProgramName.trim()) {
      return false;
    }
    
    // Check all ratings are filled
    if (!formData.kindnessRating || !formData.explanationRating || 
        !formData.satisfactionRating || !formData.recommendRating || 
        !formData.participateAgain) {
      return false;
    }
    
    // Check next experience selection (required)
    if (!formData.nextExperience) {
      return false;
    }
    
    // Check phone number if participating in lottery
    if (formData.participateLottery) {
      const phoneDigits = formData.phone.replace(/-/g, '');
      if (phoneDigits.length !== 11 || !phoneDigits.startsWith('010')) {
        return false;
      }
    }
    
    return true;
  };

  // 나주에서 진행하는 체험 프로그램 목록
  const programs = [
    '동네북코칭 (구: 동네에서 인문학)',
    '칵테일 파티 체험',
    '홈베이킹 체험 클래스',
    '석고방향제 만들기',
    '보드게임 체험',
    '청년 북클럽',
    '한글 캘리그래피'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background">
      {/* Header */}
      <section className="py-12 border-b">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="text-center">
            <Badge className="mb-4" variant="secondary">
              <ClipboardList className="w-3 h-3 mr-1" />
              서포터즈 설문조사
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">체험 프로그램 만족도 조사</h1>
            <p className="text-lg text-muted-foreground">
              더 나은 프로그램을 위한 여러분의 소중한 의견을 들려주세요
            </p>
          </div>
        </div>
      </section>

      {/* Survey Form */}
      <section className="py-12">
        <div className="container max-w-4xl mx-auto px-4">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* 기본 정보 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  기본 정보
                </CardTitle>
                <CardDescription>
                  서포터즈 정보와 프로그램을 선택해주세요 (해당 설문은 익명입니다)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="supporterGroup">서포터즈 이름 *</Label>
                  <Input
                    id="supporterGroup"
                    placeholder="예: 홍길동"
                    value={formData.supporterGroup}
                    onChange={(e) => handleInputChange('supporterGroup', e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>참여하신 체험 프로그램 *</Label>
                  <RadioGroup value={formData.programType} onValueChange={(value) => setFormData(prev => ({ ...prev, programType: value, customProgramName: value !== '기타' ? '' : prev.customProgramName }))}>
                    <div className="grid md:grid-cols-2 gap-3">
                      {programs.map((program) => (
                        <div key={program} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50">
                          <RadioGroupItem value={program} id={program} />
                          <Label htmlFor={program} className="font-normal cursor-pointer flex-1">
                            {program}
                          </Label>
                        </div>
                      ))}
                      <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50">
                        <RadioGroupItem value="기타" id="기타" />
                        <Label htmlFor="기타" className="font-normal cursor-pointer flex-1">
                          기타
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                  
                  {formData.programType === '기타' && (
                    <div className="mt-3 ml-8">
                      <Label htmlFor="customProgramName">프로그램명을 입력해주세요 *</Label>
                      <Input
                        id="customProgramName"
                        placeholder="참여하신 프로그램명을 입력해주세요"
                        value={formData.customProgramName}
                        onChange={(e) => handleInputChange('customProgramName', e.target.value)}
                        className="mt-2"
                        required={formData.programType === '기타'}
                      />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* 만족도 평가 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-primary" />
                  만족도 평가
                </CardTitle>
                <CardDescription>
                  프로그램에 대한 만족도를 평가해주세요
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* 친절도 */}
                <div className="space-y-3">
                  <Label>1. 프로그램 진행자는 친절했나요? *</Label>
                  <RadioGroup value={formData.kindnessRating} onValueChange={(value) => setFormData(prev => ({ ...prev, kindnessRating: value }))}>
                    <div className="flex gap-2 md:gap-4">
                      {['불만족', '보통', '만족'].map((label, index) => (
                        <div key={label} className="flex-1">
                          <RadioGroupItem value={(index + 1).toString()} id={`kind-${index + 1}`} className="peer sr-only" />
                          <Label
                            htmlFor={`kind-${index + 1}`}
                            className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-3 md:p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                          >
                            <span className="text-2xl md:text-3xl mb-1">{index === 0 ? '😞' : index === 1 ? '😐' : '😊'}</span>
                            <span className="text-sm md:text-base text-center">{label}</span>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                {/* 설명 이해도 */}
                <div className="space-y-3">
                  <Label>2. 프로그램 설명이 이해하기 쉬웠나요? *</Label>
                  <RadioGroup value={formData.explanationRating} onValueChange={(value) => setFormData(prev => ({ ...prev, explanationRating: value }))}>
                    <div className="flex gap-2 md:gap-4">
                      {['어려움', '보통', '쉬움'].map((label, index) => (
                        <div key={label} className="flex-1">
                          <RadioGroupItem value={(index + 1).toString()} id={`explain-${index + 1}`} className="peer sr-only" />
                          <Label
                            htmlFor={`explain-${index + 1}`}
                            className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-3 md:p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                          >
                            <span className="text-2xl md:text-3xl mb-1">{index === 0 ? '🤔' : index === 1 ? '😐' : '💡'}</span>
                            <span className="text-sm md:text-base text-center">{label}</span>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                {/* 전반적 만족도 */}
                <div className="space-y-3">
                  <Label>3. 프로그램에 전반적으로 만족하셨나요? *</Label>
                  <RadioGroup value={formData.satisfactionRating} onValueChange={(value) => setFormData(prev => ({ ...prev, satisfactionRating: value }))}>
                    <div className="flex gap-2 md:gap-4">
                      {['불만족', '보통', '만족'].map((label, index) => (
                        <div key={label} className="flex-1">
                          <RadioGroupItem value={(index + 1).toString()} id={`satisfy-${index + 1}`} className="peer sr-only" />
                          <Label
                            htmlFor={`satisfy-${index + 1}`}
                            className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-3 md:p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                          >
                            <span className="text-2xl md:text-3xl mb-1">{'⭐'.repeat(index + 1)}</span>
                            <span className="text-sm md:text-base text-center">{label}</span>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                {/* 추천 의향 */}
                <div className="space-y-3">
                  <Label>4. 지인이나 친구/연인에게 추천하고 싶으신가요? *</Label>
                  <RadioGroup value={formData.recommendRating} onValueChange={(value) => setFormData(prev => ({ ...prev, recommendRating: value }))}>
                    <div className="flex gap-2 md:gap-4">
                      {['추천 안함', '보통', '추천함'].map((label, index) => (
                        <div key={label} className="flex-1">
                          <RadioGroupItem value={(index + 1).toString()} id={`recommend-${index + 1}`} className="peer sr-only" />
                          <Label
                            htmlFor={`recommend-${index + 1}`}
                            className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-3 md:p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                          >
                            <span className="text-2xl md:text-3xl mb-1">{index === 0 ? '👎' : index === 1 ? '🤷' : '👍'}</span>
                            <span className="text-sm md:text-base text-center">{label}</span>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                {/* 재참여 의향 */}
                <div className="space-y-3">
                  <Label>5. 다음에도 참여하고 싶으신가요? *</Label>
                  <RadioGroup value={formData.participateAgain} onValueChange={(value) => setFormData(prev => ({ ...prev, participateAgain: value }))}>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-muted/50">
                        <RadioGroupItem value="yes" id="again-yes" />
                        <Label htmlFor="again-yes" className="font-normal cursor-pointer">
                          네, 꼭 참여하고 싶어요!
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-muted/50">
                        <RadioGroupItem value="no" id="again-no" />
                        <Label htmlFor="again-no" className="font-normal cursor-pointer">
                          아니요, 한 번으로 충분해요
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>

            {/* 다음 체험 프로그램 선택 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-primary" />
                  다음에 또 신청해볼만한 체험 프로그램
                </CardTitle>
                <CardDescription>
                  다음에 참여해보고 싶은 프로그램을 선택해주세요 (필수 선택)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup value={formData.nextExperience} onValueChange={(value) => setFormData(prev => ({ ...prev, nextExperience: value }))}>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-muted/50">
                      <RadioGroupItem value="ai-bootcamp" id="ai-bootcamp" />
                      <Label htmlFor="ai-bootcamp" className="font-normal cursor-pointer flex-1">
                        <div>
                          <span className="font-semibold">AI 인문학 부트캠프</span>
                          <p className="text-sm text-muted-foreground mt-1">
                            AI가 절대 가질 수 없는 인간만의 영역을 탐구하는 6개월 과정
                          </p>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-muted/50">
                      <RadioGroupItem value="book-coaching" id="book-coaching" />
                      <Label htmlFor="book-coaching" className="font-normal cursor-pointer flex-1">
                        <div>
                          <span className="font-semibold">동네북코칭</span>
                          <p className="text-sm text-muted-foreground mt-1">
                            청년 인문학 스터디 - 철학, 역사, 문학, 예술 등 다양한 주제로 함께 생각하고 토론
                          </p>
                        </div>
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* 피드백 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  자유로운 피드백
                </CardTitle>
                <CardDescription>
                  프로그램에 대한 자유로운 의견을 남겨주세요 (선택사항이지만 작성해주시면 큰 도움이 됩니다)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="goodPoints">잘한 점이 있다면 알려주세요</Label>
                  <Textarea
                    id="goodPoints"
                    placeholder="프로그램에서 좋았던 점, 인상 깊었던 부분 등을 자유롭게 작성해주세요"
                    rows={3}
                    value={formData.goodPoints}
                    onChange={(e) => handleInputChange('goodPoints', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="improvements">개선이 필요한 점이 있다면 알려주세요</Label>
                  <Textarea
                    id="improvements"
                    placeholder="부족했던 점, 개선이 필요한 부분 등을 자유롭게 작성해주세요"
                    rows={3}
                    value={formData.improvements}
                    onChange={(e) => handleInputChange('improvements', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additionalFeedback">기타 하고 싶은 말씀</Label>
                  <Textarea
                    id="additionalFeedback"
                    placeholder="서포터즈나 프로그램에 대한 기타 의견을 자유롭게 남겨주세요"
                    rows={3}
                    value={formData.additionalFeedback}
                    onChange={(e) => handleInputChange('additionalFeedback', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* 추첨 이벤트 */}
            <Card className="border-accent/30 bg-gradient-to-br from-accent/5 to-background">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="w-5 h-5 text-accent" />
                  추첨 이벤트
                </CardTitle>
                <CardDescription>
                  설문에 참여해주신 분들 중 추첨을 통해 소정의 기프티콘을 드립니다! (설문과 별개로 응모됩니다)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <Sparkles className="h-4 w-4" />
                  <AlertDescription>
                    <strong>🎁 추첨 상품</strong><br />
                    • 스타벅스 아메리카노 기프티콘 (10명)<br />
                    • 베스킨라빈스 싱글레귤러 기프티콘 (5명)<br />
                    • 당첨자는 개별 연락드립니다
                  </AlertDescription>
                </Alert>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="participantName">참가자 이름 *</Label>
                    <Input
                      id="participantName"
                      placeholder="홍길동"
                      value={formData.participantName}
                      onChange={(e) => handleInputChange('participantName', e.target.value)}
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      설문 응답자의 이름을 입력해주세요
                    </p>
                  </div>

                  <Separator />

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="participateLottery"
                      checked={formData.participateLottery}
                      onCheckedChange={(checked) => setFormData(prev => ({ 
                        ...prev, 
                        participateLottery: checked === true,
                        phone: checked ? prev.phone : ''
                      }))}
                    />
                    <div className="flex-1">
                      <Label htmlFor="participateLottery" className="text-base font-semibold cursor-pointer">
                        추첨 이벤트에 참여하시겠습니까?
                      </Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        참여하시면 연락처를 입력해주셔야 합니다
                      </p>
                    </div>
                  </div>

                  {formData.participateLottery && (
                    <div className="space-y-2 ml-6">
                      <Label htmlFor="phone">연락처 *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="010-1234-5678"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        maxLength={13}
                        required={formData.participateLottery}
                      />
                      <p className="text-xs text-muted-foreground">
                        당첨 시 연락드릴 휴대폰 번호를 입력해주세요
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-center">
              <Button
                type="submit"
                size="lg"
                disabled={!isFormValid() || isSubmitting}
                className="inline-flex items-center px-8"
              >
                {isSubmitting ? '제출 중...' : '설문 제출하기'}
                {!isSubmitting && <CheckCircle2 className="w-4 h-4 ml-2" />}
              </Button>
            </div>
          </form>
        </div>
      </section>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            </div>
            <DialogTitle className="text-center text-xl">설문조사가 완료되었습니다!</DialogTitle>
            <DialogDescription className="text-center pt-2">
              <p className="mb-2">
                <strong>{formData.participantName}</strong>님, 설문조사에 응해주셔서 감사합니다.
              </p>
              <p className="text-sm text-muted-foreground">
                소중한 의견을 바탕으로 더 나은 프로그램을 만들어가겠습니다.
              </p>
              {formData.participateLottery && (
                <p className="text-sm text-primary mt-3">
                  🎁 추첨 이벤트에 자동으로 응모되었습니다!
                </p>
              )}
              <p className="text-xs text-muted-foreground mt-4">
                잠시 후 메인 페이지로 이동합니다...
              </p>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}