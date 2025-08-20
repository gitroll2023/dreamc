'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle, CheckCircle, Gift, Sparkles, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function ApplyDiscountPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    phone1: '010',
    phone2: '',
    phone3: '',
    ageGroup: '',
    interestedPrograms: [] as string[],
    preferredDay: '',
    preferredTimes: [] as string[],
    specificTime: '',
    supporterName: '',
    privacyAgreed: false,
    marketingAgreed: false,
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  // 나주에서만 진행하는 프로그램들
  const programs = [
    { id: 'cocktail', name: '🍹 칵테일 체험', price: '5,000원 (정가 50,000원)', available: true },
    { id: 'humanities', name: '📚 인문학 체험', price: '예치금 30,000원', available: true },
    { id: 'boardgame', name: '🎲 보드게임 체험', price: '2,000원/시간', available: true },
    { id: 'baking', name: '🍰 베이킹 체험', price: '5,000원 (정가 50,000원)', available: true },
    { id: 'calligraphy', name: '✍️ 캘리그래피 체험', price: '준비중', available: false },
    { id: 'other', name: '🎨 기타 체험', price: '서포터즈 기획', available: true, description: '나주 서포터즈 특별 기획 프로그램' },
  ];

  // 체험 가능한 시간대 옵션 - 주말 오후 3시 이후
  const timeSlots = [
    { id: 'saturday_afternoon', label: '토요일 오후 (15:00-18:00)' },
    { id: 'saturday_evening', label: '토요일 저녁 (18:00-21:00)' },
    { id: 'sunday_afternoon', label: '일요일 오후 (15:00-18:00)' },
    { id: 'sunday_evening', label: '일요일 저녁 (18:00-21:00)' },
  ];

  // 연령대 선택 옵션
  const ageGroups = [
    { id: '10s', label: '10대', emoji: '🎒' },
    { id: '20s', label: '20대', emoji: '🎓' },
    { id: '30s', label: '30대', emoji: '💼' },
    { id: '40s', label: '40대', emoji: '👔' },
    { id: '50s', label: '50대', emoji: '🌟' },
    { id: '60plus', label: '60대 이상', emoji: '👑' },
  ];

  // 서포터즈 목록 - 재미있는 표현으로
  const supporters = [
    { id: 'sunshine', name: '☀️ 햇살 서포터즈', emoji: '☀️' },
    { id: 'star', name: '⭐ 별빛 서포터즈', emoji: '⭐' },
    { id: 'rainbow', name: '🌈 무지개 서포터즈', emoji: '🌈' },
    { id: 'flower', name: '🌸 꽃길 서포터즈', emoji: '🌸' },
    { id: 'smile', name: '😊 미소 서포터즈', emoji: '😊' },
    { id: 'heart', name: '💝 하트 서포터즈', emoji: '💝' },
    { id: 'dream', name: '🌙 드림 서포터즈', emoji: '🌙' },
    { id: 'lucky', name: '🍀 행운 서포터즈', emoji: '🍀' },
    { id: 'unknown', name: '❓ 잘 모름 (QR로 접속)', emoji: '❓' },
  ];

  const handleProgramToggle = (programId: string) => {
    setFormData(prev => ({
      ...prev,
      interestedPrograms: prev.interestedPrograms.includes(programId)
        ? []  // 선택 해제
        : [programId]  // 새로운 프로그램 선택 (기존 선택 제거)
    }));
  };

  const handleTimeToggle = (timeId: string) => {
    setFormData(prev => ({
      ...prev,
      preferredTimes: prev.preferredTimes.includes(timeId)
        ? prev.preferredTimes.filter(id => id !== timeId)
        : [...prev.preferredTimes, timeId]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // 전화번호 조합
    if (!formData.phone2 || !formData.phone3) {
      setError('연락처를 모두 입력해주세요.');
      return;
    }

    if (formData.phone2.length !== 4 || formData.phone3.length !== 4) {
      setError('연락처를 정확히 입력해주세요.');
      return;
    }

    const fullPhone = `${formData.phone1}${formData.phone2}${formData.phone3}`;
    
    if (!formData.name) {
      setError('이름을 입력해주세요.');
      return;
    }

    if (!formData.ageGroup) {
      setError('연령대를 선택해주세요.');
      return;
    }

    if (formData.interestedPrograms.length === 0) {
      setError('체험 프로그램을 선택해주세요.');
      return;
    }

    if (!formData.privacyAgreed) {
      setError('개인정보 수집 및 이용에 동의해주세요.');
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch('/api/outreach', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          phone: fullPhone,
          ageGroup: formData.ageGroup,
          location: '나주',
          supporterGroup: '나주',
        }),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        throw new Error('신청 처리 중 오류가 발생했습니다.');
      }
    } catch (error) {
      setError('신청 처리 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary/5 to-white p-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2">신청 완료!</h2>
            <p className="text-muted-foreground mb-4">
              체험 할인권이 곧 전달될 예정입니다.<br />
              카카오톡 또는 문자로 안내드리겠습니다.
            </p>
            <p className="text-sm text-primary font-medium">
              드림캐쳐와 함께 특별한 경험을 만들어보세요!
            </p>
            <Button 
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  name: '',
                  phone: '',
                  phone1: '010',
                  phone2: '',
                  phone3: '',
                  ageGroup: '',
                  interestedPrograms: [],
                  preferredDay: '',
                  preferredTimes: [],
                  specificTime: '',
                  supporterName: '',
                  privacyAgreed: false,
                  marketingAgreed: false,
                });
              }}
              className="mt-6"
            >
              새로운 신청하기
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-white py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full mb-4">
            <Gift className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2">체험 할인권 신청</h1>
          <p className="text-lg text-muted-foreground">
            나주 청년들을 위한 특별 체험 프로그램
          </p>
          <Badge className="mt-2" variant="secondary">
            <Users className="w-3 h-3 mr-1" />
            드림캐쳐 나주 서포터즈
          </Badge>
        </div>

        <form onSubmit={handleSubmit}>
          <Card className="border-2 border-primary/20">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5">
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                할인 체험 프로그램 신청
              </CardTitle>
              <CardDescription>
                커피값으로 즐기는 다양한 문화 체험! 정가 대비 최대 90% 할인
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              {/* 이름 입력 */}
              <div>
                <Label htmlFor="name">이름 *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="홍길동"
                  className="mt-1"
                  required
                />
              </div>

              {/* 연락처 입력 */}
              <div>
                <Label>연락처 *</Label>
                <div className="flex items-center gap-2 mt-1">
                  <Input
                    value="010"
                    disabled
                    className="w-20 text-center bg-gray-100"
                  />
                  <span className="text-gray-500">-</span>
                  <Input
                    type="tel"
                    maxLength={4}
                    value={formData.phone2}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, '');
                      if (value.length <= 4) {
                        setFormData(prev => ({ ...prev, phone2: value }));
                        if (value.length === 4) {
                          document.getElementById('phone3')?.focus();
                        }
                      }
                    }}
                    placeholder="0000"
                    className="w-24 text-center"
                    id="phone2"
                  />
                  <span className="text-gray-500">-</span>
                  <Input
                    type="tel"
                    maxLength={4}
                    value={formData.phone3}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, '');
                      if (value.length <= 4) {
                        setFormData(prev => ({ ...prev, phone3: value }));
                      }
                    }}
                    placeholder="0000"
                    className="w-24 text-center"
                    id="phone3"
                  />
                </div>
              </div>

              {/* 연령대 선택 */}
              <div>
                <Label>연령대 *</Label>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {ageGroups.map(age => (
                    <button
                      key={age.id}
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({ 
                          ...prev, 
                          ageGroup: age.id,
                          // 10대가 선택되고 칵테일이 선택되어 있으면 선택 해제
                          interestedPrograms: age.id === '10s' && prev.interestedPrograms.includes('cocktail') 
                            ? [] 
                            : prev.interestedPrograms
                        }));
                      }}
                      className={`p-3 rounded-lg border transition-all ${
                        formData.ageGroup === age.id
                          ? 'border-primary bg-primary/5 ring-2 ring-primary'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-2xl mb-1">{age.emoji}</div>
                        <div className="text-sm font-medium">{age.label}</div>
                      </div>
                    </button>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  * 연령대를 선택해주세요
                </p>
              </div>

              {/* 지역 선택 (나주 고정) */}
              <div>
                <Label>활동 지역</Label>
                <div className="mt-2 flex gap-3">
                  <div className="flex items-center space-x-2 opacity-50">
                    <input type="checkbox" disabled className="w-4 h-4 rounded border-gray-300" />
                    <label className="text-sm">여수</label>
                  </div>
                  <div className="flex items-center space-x-2 opacity-50">
                    <input type="checkbox" disabled className="w-4 h-4 rounded border-gray-300" />
                    <label className="text-sm">목포</label>
                  </div>
                  <div className="flex items-center space-x-2 opacity-50">
                    <input type="checkbox" disabled className="w-4 h-4 rounded border-gray-300" />
                    <label className="text-sm">화순</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" checked disabled className="w-4 h-4 rounded border-gray-300 text-primary" />
                    <label className="text-sm font-medium text-primary">나주</label>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  * 나주 지역 신청서 이므로, 나주만 선택가능!
                </p>
              </div>

              {/* 체험 프로그램 선택 */}
              <div>
                <Label>체험 프로그램 선택 (1개만 선택) *</Label>
                <div className="mt-3 space-y-3">
                  {programs.map(program => (
                    <div
                      key={program.id}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        !program.available || (program.id === 'cocktail' && formData.ageGroup === '10s')
                          ? 'opacity-50 cursor-not-allowed border-gray-200 bg-gray-50'
                          : formData.interestedPrograms.includes(program.id)
                          ? 'border-primary bg-primary/5 cursor-pointer'
                          : 'border-gray-200 hover:border-gray-300 cursor-pointer'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        const isDisabled = !program.available || (program.id === 'cocktail' && formData.ageGroup === '10s');
                        if (!isDisabled && !e.defaultPrevented) {
                          handleProgramToggle(program.id);
                        }
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <input
                            type="radio"
                            name="program"
                            checked={formData.interestedPrograms.includes(program.id)}
                            disabled={!program.available || (program.id === 'cocktail' && formData.ageGroup === '10s')}
                            onChange={() => {}}
                            onClick={(e) => e.stopPropagation()}
                            className="w-4 h-4 border-gray-300 text-primary focus:ring-primary disabled:opacity-50"
                          />
                          <div>
                            <span className="font-medium">{program.name}</span>
                            {program.id === 'cocktail' && formData.ageGroup === '10s' && (
                              <p className="text-xs text-red-500 mt-0.5">미성년자는 선택할 수 없습니다</p>
                            )}
                            {program.description && !(program.id === 'cocktail' && formData.ageGroup === '10s') && (
                              <p className="text-xs text-muted-foreground mt-0.5">{program.description}</p>
                            )}
                          </div>
                        </div>
                        <Badge variant={program.available ? "secondary" : "outline"}>
                          {program.price}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  * 첫 체험은 할인가, 재체험은 정가로 이용 가능합니다
                </p>
              </div>

              {/* 체험 가능 시간대 */}
              <div>
                <Label>체험 가능한 시간대 (중복 선택 가능)</Label>
                <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
                  {timeSlots.map(slot => (
                    <div
                      key={slot.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        formData.preferredTimes.includes(slot.id)
                          ? 'border-primary bg-primary/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!e.defaultPrevented) {
                          handleTimeToggle(slot.id);
                        }
                      }}
                    >
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={formData.preferredTimes.includes(slot.id)}
                          onChange={() => {}}
                          onClick={(e) => e.stopPropagation()}
                          className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <span className={`text-sm ${
                          slot.id.includes('saturday') ? 'text-blue-400' : 
                          slot.id.includes('sunday') ? 'text-red-400' : ''
                        }`}>{slot.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  * 체험 가능한 시간대를 모두 선택해주세요
                </p>
              </div>

              {/* 담당 서포터즈 선택 */}
              <div>
                <Label>담당 서포터즈</Label>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {supporters.map(supporter => (
                    <button
                      key={supporter.id}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, supporterName: supporter.name }))}
                      className={`p-3 rounded-lg border transition-all ${
                        formData.supporterName === supporter.name
                          ? 'border-primary bg-primary/5 ring-2 ring-primary'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-2xl mb-1">{supporter.emoji}</div>
                        <div className="text-xs font-medium">
                          {supporter.name.replace(supporter.emoji + ' ', '')}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  * 안내해준 서포터즈를 선택해주세요
                </p>
              </div>

              {/* 개인정보 동의 */}
              <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                <div className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    id="privacy"
                    checked={formData.privacyAgreed}
                    onChange={(e) => 
                      setFormData(prev => ({ ...prev, privacyAgreed: e.target.checked }))
                    }
                    className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary mt-0.5"
                  />
                  <div className="space-y-1">
                    <label htmlFor="privacy" className="text-sm font-medium cursor-pointer">
                      개인정보 수집 및 이용 동의 (필수)
                    </label>
                    <p className="text-xs text-muted-foreground">
                      체험 할인권 발송 및 프로그램 안내를 위해 이름, 연락처를 수집합니다.
                      수집된 정보는 서비스 제공 목적으로만 사용되며, 관련 법령에 따라 안전하게 보호됩니다.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    id="marketing"
                    checked={formData.marketingAgreed}
                    onChange={(e) => 
                      setFormData(prev => ({ ...prev, marketingAgreed: e.target.checked }))
                    }
                    className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary mt-0.5"
                  />
                  <div className="space-y-1">
                    <label htmlFor="marketing" className="text-sm font-medium cursor-pointer">
                      마케팅 정보 수신 동의 (선택)
                    </label>
                    <p className="text-xs text-muted-foreground">
                      드림캐쳐의 새로운 프로그램 및 이벤트 정보를 받아보실 수 있습니다.
                    </p>
                  </div>
                </div>
              </div>

              {/* 안내 메시지 */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex gap-2">
                  <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-blue-900">프로그램 개선을 위한 안내</p>
                    <p className="text-xs text-blue-700">
                      드림캐쳐는 2026년 3월 정식 서비스 론칭을 준비하고 있습니다.
                      여러분의 소중한 의견을 바탕으로 더 나은 청년 문화 프로그램을 만들어가겠습니다.
                    </p>
                  </div>
                </div>
              </div>

              {/* 에러 메시지 */}
              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* 제출 버튼 */}
              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={submitting}
              >
                {submitting ? '신청 중...' : '체험 할인권 신청하기'}
              </Button>
            </CardContent>
          </Card>
        </form>

        {/* 하단 안내 */}
        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>신청 후 1-2일 내에 카카오톡 또는 문자로 체험 할인권을 보내드립니다.</p>
          <p className="mt-1">문의: 드림캐쳐 나주 서포터즈</p>
        </div>
      </div>
    </div>
  );
}