'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, AlertCircle, Gift, Calendar, MapPin, User, Hash, Lock } from 'lucide-react';
import Link from 'next/link';

export default function CouponVerifyPage() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [accessPassword, setAccessPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [checkingPassword, setCheckingPassword] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<'valid' | 'invalid' | 'expired' | 'used' | null>(null);
  const [couponDetails, setCouponDetails] = useState<any>(null);
  const [selectedProgram, setSelectedProgram] = useState('');
  const [customProgram, setCustomProgram] = useState('');
  const [userName, setUserName] = useState('');
  const [processingUse, setProcessingUse] = useState(false);

  // 나주지역 프로그램 목록
  const najuPrograms = [
    { value: 'perfume', label: '✨ 향수 만들기' },
    { value: 'baking', label: '🍰 홈베이킹 클래스' },
    { value: 'personal-color', label: '🎨 퍼스널컬러 진단' },
    { value: 'board-game', label: '🎲 보드게임 카페' },
    { value: 'calligraphy', label: '✍️ 캘리그래피' },
    { value: 'photo', label: '📸 사진 촬영 워크샵' },
    { value: 'other', label: '기타 (직접 입력)' },
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
      alert('쿠폰 코드를 입력해주세요.');
      return;
    }

    setVerifying(true);
    setVerificationResult(null);
    setCouponDetails(null);
    
    try {
      const response = await fetch('/api/coupons/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: couponCode }),
      });

      const data = await response.json();

      if (data.success) {
        setVerificationResult('valid');
        setCouponDetails(data.coupon);
      } else {
        setVerificationResult(data.status || 'invalid');
        setCouponDetails(data.coupon || null);
      }
    } catch (error) {
      alert('쿠폰 확인 중 오류가 발생했습니다.');
      setVerificationResult(null);
    } finally {
      setVerifying(false);
    }
  };

  const handleUse = async () => {
    if (!selectedProgram) {
      alert('체험 프로그램을 선택해주세요.');
      return;
    }

    if (selectedProgram === 'other' && !customProgram.trim()) {
      alert('기타 프로그램을 입력해주세요.');
      return;
    }

    if (!userName.trim()) {
      alert('사용자 이름을 입력해주세요.');
      return;
    }

    if (confirm('이 쿠폰을 사용 처리하시겠습니까?\n사용 처리 후에는 취소할 수 없습니다.')) {
      setProcessingUse(true);
      
      const programName = selectedProgram === 'other' 
        ? customProgram 
        : najuPrograms.find(p => p.value === selectedProgram)?.label || selectedProgram;

      try {
        const response = await fetch('/api/coupons/use', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            code: couponCode,
            usedProgram: programName,
            usedBy: userName
          }),
        });

        const data = await response.json();

        if (response.ok && data.success) {
          setVerificationResult('used');
          if (couponDetails) {
            setCouponDetails({
              ...couponDetails,
              status: 'used',
              usedDate: new Date().toLocaleDateString('ko-KR'),
              usedProgram: programName,
              usedBy: userName
            });
          }
          alert('쿠폰이 사용 처리되었습니다.');
          // 초기화
          setSelectedProgram('');
          setCustomProgram('');
          setUserName('');
        } else {
          alert(data.error || '쿠폰 사용 처리에 실패했습니다.');
        }
      } catch (error) {
        alert('쿠폰 사용 처리 중 오류가 발생했습니다.');
      } finally {
        setProcessingUse(false);
      }
    }
  };

  const formatCouponCode = (value: string) => {
    // 대문자로 변환하고 특수문자 제거 (하이픈은 유지)
    return value.toUpperCase().replace(/[^A-Z0-9-]/g, '');
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
            <CardTitle className="text-2xl">쿠폰 확인 시스템</CardTitle>
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
          <h1 className="text-3xl font-bold mb-2">쿠폰 확인</h1>
          <p className="text-muted-foreground">
            드림캐쳐 체험권 쿠폰 코드를 입력하여 유효성을 확인하세요
          </p>
        </div>

        {/* 쿠폰 입력 카드 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gift className="w-5 h-5" />
              쿠폰 코드 입력
            </CardTitle>
            <CardDescription>
              쿠폰에 표시된 코드를 정확히 입력해주세요
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">쿠폰 코드</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(formatCouponCode(e.target.value))}
                  placeholder="예: DC-1234-AB5C"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-center text-lg font-mono tracking-wider"
                  maxLength={12}
                />
                <Button 
                  onClick={handleVerify}
                  disabled={verifying || !couponCode}
                  className="px-6"
                >
                  {verifying ? '확인 중...' : '확인'}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                * 하이픈(-)을 포함하여 입력해주세요
              </p>
            </div>
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
                    유효한 쿠폰
                  </>
                )}
                {verificationResult === 'expired' && (
                  <>
                    <AlertCircle className="w-5 h-5 text-yellow-500" />
                    만료된 쿠폰
                  </>
                )}
                {verificationResult === 'used' && (
                  <>
                    <AlertCircle className="w-5 h-5 text-blue-500" />
                    사용된 쿠폰
                  </>
                )}
                {verificationResult === 'invalid' && (
                  <>
                    <XCircle className="w-5 h-5 text-red-500" />
                    유효하지 않은 쿠폰
                  </>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {couponDetails ? (
                <div className="space-y-4">
                  {/* 쿠폰 상태 배지 */}
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

                  {/* 쿠폰 상세 정보 */}
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
                    
                    {couponDetails.usedDate && (
                      <>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span className="text-muted-foreground">사용일:</span>
                          <span className="font-semibold">{couponDetails.usedDate}</span>
                        </div>
                        
                        {couponDetails.usedProgram && (
                          <div className="flex items-center gap-2">
                            <Gift className="w-4 h-4 text-muted-foreground" />
                            <span className="text-muted-foreground">사용 프로그램:</span>
                            <span className="font-semibold">{couponDetails.usedProgram}</span>
                          </div>
                        )}

                        {couponDetails.usedBy && (
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-muted-foreground" />
                            <span className="text-muted-foreground">사용자:</span>
                            <span className="font-semibold">{couponDetails.usedBy}</span>
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

                        <div>
                          <label className="text-sm font-medium">체험 프로그램 선택 (나주 지역)</label>
                          <select
                            value={selectedProgram}
                            onChange={(e) => setSelectedProgram(e.target.value)}
                            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                          >
                            <option value="">프로그램을 선택하세요</option>
                            {najuPrograms.map((program) => (
                              <option key={program.value} value={program.value}>
                                {program.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        {selectedProgram === 'other' && (
                          <div>
                            <label className="text-sm font-medium">기타 프로그램 입력</label>
                            <input
                              type="text"
                              value={customProgram}
                              onChange={(e) => setCustomProgram(e.target.value)}
                              placeholder="프로그램명을 입력하세요"
                              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                            />
                          </div>
                        )}
                      </div>

                      <Button 
                        onClick={handleUse}
                        className="w-full"
                        size="lg"
                        disabled={processingUse}
                      >
                        {processingUse ? '처리 중...' : '쿠폰 사용 처리하기'}
                      </Button>
                      <p className="text-xs text-center text-muted-foreground">
                        * 사용 처리 후에는 취소할 수 없습니다
                      </p>
                    </div>
                  )}

                  {verificationResult === 'expired' && (
                    <div className="pt-4 border-t">
                      <p className="text-sm text-yellow-600">
                        이 쿠폰은 유효기간이 만료되었습니다.<br />
                        새로운 쿠폰을 발급받아 주세요.
                      </p>
                    </div>
                  )}

                  {verificationResult === 'used' && (
                    <div className="pt-4 border-t">
                      <p className="text-sm text-blue-600">
                        이 쿠폰은 이미 사용되었습니다.<br />
                        한 쿠폰은 1회만 사용 가능합니다.
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="py-4">
                  <p className="text-sm text-red-600">
                    유효하지 않은 쿠폰 코드입니다.<br />
                    코드를 다시 확인해주세요.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* 안내 사항 */}
        <Card className="bg-gray-50">
          <CardHeader>
            <CardTitle className="text-base">쿠폰 사용 안내</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>• 드림캐쳐 모든 체험 프로그램에서 사용 가능합니다</p>
            <p>• 각 쿠폰은 1인 1회만 사용할 수 있습니다</p>
            <p>• 유효기간은 발급일로부터 15일입니다</p>
            <p>• 쿠폰 사용 시 본인 확인이 필요할 수 있습니다</p>
            <p>• 타인 양도는 불가능합니다</p>
          </CardContent>
        </Card>

        {/* 뒤로가기 버튼 */}
        <div className="text-center">
          <Link href="/">
            <Button variant="outline">
              메인으로 돌아가기
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}