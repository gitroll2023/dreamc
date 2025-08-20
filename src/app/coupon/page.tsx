'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Gift, Sparkles, ArrowRight, Lock, X, Ticket, AlertCircle } from 'lucide-react';

export default function CouponPage() {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [checkingPassword, setCheckingPassword] = useState(false);
  const router = useRouter();

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setCheckingPassword(true);

    try {
      const response = await fetch('/api/coupon-access', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // 접근 권한 확인됨 - nj12/coupon 페이지로 이동
        setShowPasswordModal(false);
        router.push('/nj12/coupon');
      } else {
        setPasswordError('비밀번호가 올바르지 않습니다.');
      }
    } catch (error) {
      setPasswordError('오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setCheckingPassword(false);
    }
  };

  const programs = [
    { name: '🍹 칵테일 파티 체험', discount: '90%', price: '5,000원' },
    { name: '🍰 홈베이킹 클래스', discount: '90%', price: '5,000원' },
    { name: '🎨 석고방향제 만들기', discount: '89%', price: '5,000원' },
    { name: '🎲 보드게임 체험', discount: '33%', price: '2,000원/시간' },
    { name: '✍️ 한글 캘리그래피', discount: '88%', price: '5,000원' },
    { name: '📸 스마트폰 사진 클래스', discount: '90%', price: '5,000원' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* 헤더 */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full mb-4">
            <Gift className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4">드림캐쳐 할인 체험권</h1>
          <p className="text-xl text-muted-foreground">
            지역 서포터즈를 통해 받은 체험권으로<br />
            드림캐쳐의 다양한 프로그램을 특별 할인가로 경험해보세요
          </p>
        </div>

        {/* 메인 카드 */}
        <Card className="border-2 border-primary/20">
          <CardHeader className="text-center bg-gradient-to-r from-primary/5 to-accent/5">
            <CardTitle className="text-2xl flex items-center justify-center gap-2">
              <Sparkles className="w-6 h-6 text-primary" />
              할인 체험 프로그램
            </CardTitle>
            <CardDescription className="text-base mt-2">
              프로그램별 첫 체험은 특별 할인가, 재체험은 정가로 이용 가능합니다
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {programs.map((program, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <span className="text-lg font-medium">{program.name}</span>
                    <span className="text-sm font-bold text-primary bg-primary/10 px-2 py-1 rounded">
                      {program.discount} 할인
                    </span>
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    첫 체험가: <span className="font-semibold text-primary">{program.price}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-accent/10 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <Ticket className="w-5 h-5 text-accent" />
                할인 체험권 사용 방법
              </h3>
              <ol className="space-y-2 text-muted-foreground">
                <li>1. 지역 서포터즈로부터 받은 체험권 코드를 준비합니다</li>
                <li>2. 아래 &apos;체험권 입력하기&apos; 버튼을 클릭합니다</li>
                <li>3. 체험권 코드와 개인정보를 입력합니다</li>
                <li>4. 원하는 프로그램을 선택하여 예약합니다</li>
                <li>5. 예약 당일 할인된 금액으로 체험을 즐깁니다</li>
              </ol>
            </div>

            {/* 액션 버튼들 */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/coupon/verify">
                <Button size="lg" className="w-full sm:w-auto gap-2">
                  <Ticket className="w-5 h-5" />
                  체험권 입력하기
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              
              <Button
                variant="outline"
                size="lg"
                onClick={() => setShowPasswordModal(true)}
                className="w-full sm:w-auto gap-2"
              >
                <Lock className="w-5 h-5" />
                서포터즈
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 안내 사항 */}
        <Card className="bg-gray-50">
          <CardHeader>
            <CardTitle className="text-base">유의사항</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>• 체험권은 발급일로부터 15일간 유효합니다</p>
            <p>• 각 프로그램별 첫 체험시에만 할인이 적용됩니다</p>
            <p>• 재체험시에는 정가로 이용하실 수 있습니다</p>
            <p>• 프로그램 예약은 최소 1일 전까지 완료해주세요</p>
            <p>• 체험권 사용 시 본인 확인이 필요합니다</p>
            <p>• 타인에게 양도할 수 없습니다</p>
          </CardContent>
        </Card>

        {/* 데이터 수집 안내 */}
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-blue-600" />
              프로그램 개선을 위한 안내
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>드림캐쳐는 더 나은 청년 프로그램 제공을 위해 다음 정보를 수집합니다:</p>
            <ul className="ml-4 space-y-1">
              <li>• 체험 프로그램 선호도 및 만족도</li>
              <li>• 연령대, 지역 등 기본 통계 정보</li>
              <li>• 프로그램 참여 패턴 및 피드백</li>
            </ul>
            <p className="pt-2">수집된 정보는 프로그램 개선과 맞춤형 서비스 제공에만 활용되며,<br />
            개인정보는 관련 법령에 따라 안전하게 보호됩니다.</p>
          </CardContent>
        </Card>

        {/* 문의 */}
        <div className="text-center text-sm text-muted-foreground">
          <p>체험권 관련 문의사항이 있으신가요?</p>
          <Link href="/contact" className="text-primary hover:underline">
            문의하기 →
          </Link>
        </div>
      </div>

      {/* 비밀번호 모달 */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">서포터즈 인증</h3>
              <button
                onClick={() => {
                  setShowPasswordModal(false);
                  setPassword('');
                  setPasswordError('');
                }}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="supporter-password" className="text-sm font-medium">
                  서포터즈 비밀번호
                </label>
                <input
                  type="password"
                  id="supporter-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowPasswordModal(false);
                    setPassword('');
                    setPasswordError('');
                  }}
                  className="flex-1"
                >
                  취소
                </Button>
                <Button 
                  type="submit" 
                  className="flex-1"
                  disabled={checkingPassword || !password}
                >
                  {checkingPassword ? '확인 중...' : '확인'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}