'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, AlertCircle, Gift, Calendar, MapPin, User, Hash, Lock, Phone, Info, X } from 'lucide-react';
import Link from 'next/link';

export default function CouponVerifyPage() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [accessPassword, setAccessPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [checkingPassword, setCheckingPassword] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<'valid' | 'invalid' | 'expired' | 'used' | null>(null);
  const [couponDetails, setCouponDetails] = useState<any>(null);
  const [discountInfo, setDiscountInfo] = useState<any>(null);
  const [selectedProgram, setSelectedProgram] = useState('');
  const [customProgram, setCustomProgram] = useState('');
  const [userName, setUserName] = useState('');
  const [processingUse, setProcessingUse] = useState(false);
  const [dataAgreed, setDataAgreed] = useState(false);
  const [marketingAgreed, setMarketingAgreed] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [useResult, setUseResult] = useState<any>(null);

  // 프로그램 목록
  const programs = [
    { value: 'cocktail', label: '🍹 칵테일 파티 체험', price: 10000, discount: 88, regularPrice: 80000 },
    { value: 'baking', label: '🍰 홈베이킹 클래스', price: 10000, discount: 83, regularPrice: 60000 },
    { value: 'craft', label: '🎨 석고방향제 만들기', price: 5000, discount: 89, regularPrice: 45000 },
    { value: 'boardgame', label: '🎲 보드게임 체험', price: 2000, discount: 33, regularPrice: 3000 },
    { value: 'calligraphy', label: '✍️ 한글 캘리그래피', price: 5000, discount: 88, regularPrice: 40000 },
    { value: 'photo', label: '📸 스마트폰 사진 클래스', price: 5000, discount: 90, regularPrice: 50000 },
    { value: 'other', label: '기타 (직접 입력)', price: 10000, discount: 80, regularPrice: 50000 },
  ];

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setCheckingPassword(true);

    try {
      const response = await fetch('/api/coupon-input-access', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: accessPassword }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsAuthorized(true);
      } else {
        setPasswordError('비밀번호가 올바르지 않습니다.');
      }
    } catch (error) {
      setPasswordError('오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setCheckingPassword(false);
    }
  };

  const handleVerify = async () => {
    if (!couponCode.trim()) {
      setModalMessage('체험권 코드를 입력해주세요.');
      setShowErrorModal(true);
      return;
    }
    
    if (!userPhone.trim()) {
      setModalMessage('전화번호를 입력해주세요.');
      setShowErrorModal(true);
      return;
    }

    setVerifying(true);
    setVerificationResult(null);
    setCouponDetails(null);
    setDiscountInfo(null);
    
    try {
      const response = await fetch('/api/coupons/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          code: couponCode,
          phone: userPhone,
          programType: selectedProgram
        }),
      });

      const data = await response.json();

      if (data.success) {
        setVerificationResult('valid');
        setCouponDetails(data.coupon);
        setDiscountInfo(data.discountInfo);
      } else {
        setVerificationResult(data.status || 'invalid');
        setCouponDetails(data.coupon || null);
      }
    } catch (error) {
      setModalMessage('체험권 확인 중 오류가 발생했습니다.');
      setShowErrorModal(true);
      setVerificationResult(null);
    } finally {
      setVerifying(false);
    }
  };

  const handleUse = async () => {
    if (!selectedProgram) {
      setModalMessage('체험할 프로그램을 선택해주세요.');
      setShowErrorModal(true);
      return;
    }

    if (selectedProgram === 'other' && !customProgram.trim()) {
      setModalMessage('프로그램명을 입력해주세요.');
      setShowErrorModal(true);
      return;
    }

    if (!userName.trim()) {
      setModalMessage('사용자 이름을 입력해주세요.');
      setShowErrorModal(true);
      return;
    }
    
    if (!dataAgreed) {
      setModalMessage('데이터 수집 동의가 필요합니다.');
      setShowErrorModal(true);
      return;
    }

    if (!confirm('체험권을 사용 처리하시겠습니까?\n사용 처리된 체험권은 취소할 수 없습니다.')) {
      return;
    }

    setProcessingUse(true);

    try {
      const selectedProgramInfo = programs.find(p => p.value === selectedProgram);
      const programTitle = selectedProgram === 'other' ? customProgram : selectedProgramInfo?.label || '';
      
      const response = await fetch('/api/coupons/use', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          code: couponCode,
          usedProgram: programTitle,
          usedBy: userName,
          phone: userPhone,
          programType: selectedProgram,
          programTitle: programTitle,
          originalPrice: selectedProgramInfo?.regularPrice || 0,
          discountRate: discountInfo?.discountRate || 0,
          finalPrice: discountInfo?.finalPrice || 0,
          dataCollectionAgreed: dataAgreed,
          marketingAgreed: marketingAgreed
        }),
      });

      const data = await response.json();

      if (data.success) {
        setUseResult({
          isFirstTime: discountInfo?.isFirstTime,
          finalPrice: discountInfo?.finalPrice,
          programTitle: programTitle
        });
        setShowSuccessModal(true);
      } else {
        setModalMessage(data.error || '체험권 사용 처리에 실패했습니다.');
        setShowErrorModal(true);
      }
    } catch (error) {
      setModalMessage('체험권 사용 처리 중 오류가 발생했습니다.');
      setShowErrorModal(true);
    } finally {
      setProcessingUse(false);
    }
  };

  const formatCouponCode = (value: string) => {
    // 대문자로 변환하고 특수문자 제거 (하이픈은 유지)
    return value.toUpperCase().replace(/[^A-Z0-9-]/g, '');
  };

  const formatPhoneNumber = (value: string) => {
    // 숫자와 하이픈만 허용
    return value.replace(/[^0-9-]/g, '');
  };

  // 인증되지 않은 경우 비밀번호 입력 화면
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary/5 to-white flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl">체험권 확인 시스템</CardTitle>
            <CardDescription>
              접근 권한이 필요합니다
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="access-password" className="text-sm font-medium">
                  접근 비밀번호
                </label>
                <input
                  type="password"
                  id="access-password"
                  value={accessPassword}
                  onChange={(e) => setAccessPassword(e.target.value)}
                  placeholder="비밀번호를 입력하세요"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  required
                  autoFocus
                />
              </div>

              {passwordError && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
                  {passwordError}
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full"
                disabled={checkingPassword || !accessPassword}
              >
                {checkingPassword ? '확인 중...' : '접속하기'}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t text-center">
              <Link href="/">
                <Button variant="outline">
                  메인으로 돌아가기
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-white py-12 px-4">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* 헤더 */}
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">할인 체험권 확인</h1>
          <p className="text-muted-foreground">
            드림캐쳐 할인 체험권 코드를 입력하여 할인 혜택을 확인하세요
          </p>
        </div>

        {/* 체험권 입력 카드 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gift className="w-5 h-5" />
              체험권 정보 입력
            </CardTitle>
            <CardDescription>
              체험권 코드와 개인정보를 입력해주세요
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">체험권 코드</label>
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(formatCouponCode(e.target.value))}
                placeholder="예: DC-1234-AB5C"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-center text-lg font-mono tracking-wider"
                maxLength={12}
              />
              <p className="text-xs text-muted-foreground">
                * 하이픈(-)을 포함하여 입력해주세요
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Phone className="w-4 h-4" />
                전화번호
              </label>
              <input
                type="tel"
                value={userPhone}
                onChange={(e) => setUserPhone(formatPhoneNumber(e.target.value))}
                placeholder="예: 010-1234-5678"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                maxLength={13}
              />
              <p className="text-xs text-muted-foreground">
                * 첫 체험 할인 확인을 위해 필요합니다
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">체험 프로그램 선택 (선택사항)</label>
              <select
                value={selectedProgram}
                onChange={(e) => setSelectedProgram(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <option value="">프로그램을 선택하세요</option>
                {programs.map((program) => (
                  <option key={program.value} value={program.value}>
                    {program.label}
                  </option>
                ))}
              </select>
              <p className="text-xs text-muted-foreground">
                * 프로그램을 선택하면 할인 정보를 미리 확인할 수 있습니다
              </p>
            </div>

            <Button 
              onClick={handleVerify}
              disabled={verifying || !couponCode || !userPhone}
              className="w-full"
            >
              {verifying ? '확인 중...' : '체험권 확인'}
            </Button>
          </CardContent>
        </Card>

        {/* 검증 결과 */}
        {verificationResult && (
          <Card className={
            verificationResult === 'valid' ? 'border-green-500' :
            verificationResult === 'expired' ? 'border-yellow-500' :
            verificationResult === 'used' ? 'border-blue-500' :
            'border-red-500'
          }>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {verificationResult === 'valid' && (
                  <>
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    유효한 체험권
                  </>
                )}
                {verificationResult === 'expired' && (
                  <>
                    <AlertCircle className="w-5 h-5 text-yellow-500" />
                    만료된 체험권
                  </>
                )}
                {verificationResult === 'used' && (
                  <>
                    <AlertCircle className="w-5 h-5 text-blue-500" />
                    사용된 체험권
                  </>
                )}
                {verificationResult === 'invalid' && (
                  <>
                    <XCircle className="w-5 h-5 text-red-500" />
                    유효하지 않은 체험권
                  </>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {couponDetails ? (
                <div className="space-y-4">
                  {/* 체험권 상태 배지 */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">상태:</span>
                    {verificationResult === 'valid' && (
                      <Badge className="bg-green-500">사용 가능</Badge>
                    )}
                    {verificationResult === 'expired' && (
                      <Badge className="bg-yellow-500">기간 만료</Badge>
                    )}
                    {verificationResult === 'used' && (
                      <Badge className="bg-blue-500">사용 완료</Badge>
                    )}
                  </div>

                  {/* 할인 정보 (유효한 체험권인 경우) */}
                  {verificationResult === 'valid' && discountInfo && (
                    <div className="bg-primary/5 rounded-lg p-4 space-y-2">
                      <h4 className="font-semibold flex items-center gap-2">
                        <Info className="w-4 h-4" />
                        할인 정보
                      </h4>
                      <div className="text-sm space-y-1">
                        <p className={discountInfo.isFirstTime ? 'text-green-600 font-semibold' : 'text-orange-600'}>
                          {discountInfo.message}
                        </p>
                        {discountInfo.isFirstTime ? (
                          <>
                            <p>정가: <span className="line-through text-muted-foreground">{discountInfo.regularPrice?.toLocaleString()}원</span></p>
                            <p>할인율: <span className="font-semibold text-primary">{discountInfo.discountRate}%</span></p>
                            <p>결제 금액: <span className="font-bold text-lg text-primary">{discountInfo.finalPrice?.toLocaleString()}원</span></p>
                          </>
                        ) : (
                          <p>결제 금액: <span className="font-bold text-lg">{discountInfo.regularPrice?.toLocaleString()}원</span></p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* 체험권 상세 정보 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Hash className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">코드:</span>
                      <span className="font-mono font-semibold">{couponDetails.code}</span>
                    </div>
                    
                    {couponDetails.recipientName && (
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">수령인:</span>
                        <span className="font-semibold">{couponDetails.recipientName}</span>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">발급일:</span>
                      <span>{couponDetails.issueDate}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">만료일:</span>
                      <span className={verificationResult === 'expired' ? 'text-red-500 font-semibold' : ''}>
                        {couponDetails.expiryDate}
                      </span>
                    </div>
                    
                    {couponDetails.usedAt && (
                      <>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span className="text-muted-foreground">사용일:</span>
                          <span className="font-semibold">{couponDetails.usedAt}</span>
                        </div>
                        
                        {couponDetails.usedProgram && (
                          <div className="flex items-center gap-2">
                            <Gift className="w-4 h-4 text-muted-foreground" />
                            <span className="text-muted-foreground">사용 프로그램:</span>
                            <span className="font-semibold">{couponDetails.usedProgram}</span>
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {/* 액션 버튼 */}
                  {verificationResult === 'valid' && (
                    <div className="pt-4 border-t space-y-4">
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium">사용자 이름</label>
                          <input
                            type="text"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            placeholder="사용자 이름을 입력하세요"
                            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                          />
                        </div>

                        {!selectedProgram && (
                          <div>
                            <label className="text-sm font-medium">체험 프로그램 선택</label>
                            <select
                              value={selectedProgram}
                              onChange={(e) => setSelectedProgram(e.target.value)}
                              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                            >
                              <option value="">프로그램을 선택하세요</option>
                              {programs.map((program) => (
                                <option key={program.value} value={program.value}>
                                  {program.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        )}

                        {selectedProgram === 'other' && (
                          <div>
                            <label className="text-sm font-medium">프로그램명 입력</label>
                            <input
                              type="text"
                              value={customProgram}
                              onChange={(e) => setCustomProgram(e.target.value)}
                              placeholder="프로그램명을 입력하세요"
                              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                            />
                          </div>
                        )}

                        {/* 데이터 수집 동의 */}
                        <div className="bg-blue-50 rounded-lg p-4 space-y-3">
                          <h4 className="font-semibold text-sm flex items-center gap-2">
                            <Info className="w-4 h-4 text-blue-600" />
                            프로그램 개선을 위한 안내
                          </h4>
                          <div className="space-y-2">
                            <label className="flex items-start gap-2">
                              <input
                                type="checkbox"
                                checked={dataAgreed}
                                onChange={(e) => setDataAgreed(e.target.checked)}
                                className="mt-1"
                              />
                              <span className="text-sm text-muted-foreground">
                                프로그램 개선을 위한 데이터 수집에 동의합니다. (필수)
                                <br />
                                <span className="text-xs">
                                  • 체험 프로그램 선호도 및 만족도
                                  <br />
                                  • 연령대, 지역 등 기본 통계 정보
                                  <br />
                                  • 수집된 정보는 프로그램 개선에만 활용됩니다
                                </span>
                              </span>
                            </label>
                            <label className="flex items-start gap-2">
                              <input
                                type="checkbox"
                                checked={marketingAgreed}
                                onChange={(e) => setMarketingAgreed(e.target.checked)}
                                className="mt-1"
                              />
                              <span className="text-sm text-muted-foreground">
                                마케팅 정보 수신에 동의합니다. (선택)
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>

                      <Button
                        onClick={handleUse}
                        disabled={processingUse || !selectedProgram || !userName || !dataAgreed}
                        className="w-full"
                      >
                        {processingUse ? '처리 중...' : '체험권 사용하기'}
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-4">
                  체험권 정보를 불러올 수 없습니다.
                </p>
              )}
            </CardContent>
          </Card>
        )}

        {/* 뒤로가기 버튼 */}
        <div className="text-center">
          <Link href="/coupon">
            <Button variant="outline">
              체험권 페이지로 돌아가기
            </Button>
          </Link>
        </div>
      </div>

      {/* 성공 모달 */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <Card className="max-w-md w-full">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <CardTitle>체험권 사용 완료</CardTitle>
                    <CardDescription>체험권이 성공적으로 처리되었습니다</CardDescription>
                  </div>
                </div>
                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {useResult && (
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <Gift className="w-5 h-5 text-primary" />
                    <span className="font-semibold">{useResult.programTitle}</span>
                  </div>
                  
                  {useResult.isFirstTime ? (
                    <div className="space-y-2">
                      <p className="text-green-600 font-semibold">
                        🎉 첫 체험 할인이 적용되었습니다!
                      </p>
                      <div className="text-sm space-y-1">
                        <p>결제 금액: <span className="text-xl font-bold text-primary">{useResult.finalPrice?.toLocaleString()}원</span></p>
                        <p className="text-xs text-muted-foreground">
                          * 현장에서 위 금액으로 결제해주세요
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-orange-600 font-semibold">
                        재체험은 정가로 이용 가능합니다
                      </p>
                      <div className="text-sm">
                        <p>결제 금액: <span className="text-xl font-bold">{useResult.finalPrice?.toLocaleString()}원</span></p>
                        <p className="text-xs text-muted-foreground">
                          * 현장에서 위 금액으로 결제해주세요
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              <div className="flex gap-2">
                <Button
                  onClick={() => {
                    setShowSuccessModal(false);
                    // 상태 초기화
                    setCouponCode('');
                    setUserPhone('');
                    setVerificationResult(null);
                    setCouponDetails(null);
                    setDiscountInfo(null);
                    setSelectedProgram('');
                    setCustomProgram('');
                    setUserName('');
                    setDataAgreed(false);
                    setMarketingAgreed(false);
                    setUseResult(null);
                  }}
                  className="flex-1"
                >
                  확인
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* 에러 모달 */}
      {showErrorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <Card className="max-w-md w-full">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <CardTitle>알림</CardTitle>
                  </div>
                </div>
                <button
                  onClick={() => setShowErrorModal(false)}
                  className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{modalMessage}</p>
              <Button
                onClick={() => setShowErrorModal(false)}
                className="w-full"
              >
                확인
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}