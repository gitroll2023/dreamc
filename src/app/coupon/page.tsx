'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Gift, Sparkles, ArrowRight, Lock, X, Ticket } from 'lucide-react';

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
    '✨ 향수 만들기',
    '🍰 홈베이킹 클래스',
    '🎨 퍼스널컬러 진단',
    '🎲 보드게임 카페',
    '✍️ 캘리그래피',
    '📸 사진 촬영 워크샵',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* 헤더 */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full mb-4">
            <Gift className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4">드림캐쳐 체험권</h1>
          <p className="text-xl text-muted-foreground">
            지역 서포터즈를 통해 받은 쿠폰으로<br />
            드림캐쳐의 다양한 체험 프로그램을 무료로 경험해보세요
          </p>
        </div>

        {/* 메인 카드 */}
        <Card className="border-2 border-primary/20">
          <CardHeader className="text-center bg-gradient-to-r from-primary/5 to-accent/5">
            <CardTitle className="text-2xl flex items-center justify-center gap-2">
              <Sparkles className="w-6 h-6 text-primary" />
              무료 체험 프로그램
            </CardTitle>
            <CardDescription className="text-base mt-2">
              아래 프로그램 중 1개를 선택하여 무료로 체험하실 수 있습니다
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {programs.map((program, index) => (
                <div
                  key={index}
                  className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <span className="text-lg">{program}</span>
                </div>
              ))}
            </div>

            <div className="bg-accent/10 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <Ticket className="w-5 h-5 text-accent" />
                쿠폰 사용 방법
              </h3>
              <ol className="space-y-2 text-muted-foreground">
                <li>1. 지역 서포터즈로부터 받은 쿠폰 코드를 준비합니다</li>
                <li>2. 아래 &apos;쿠폰 입력하기&apos; 버튼을 클릭합니다</li>
                <li>3. 쿠폰 코드를 입력하여 유효성을 확인합니다</li>
                <li>4. 원하는 프로그램을 선택하여 예약합니다</li>
                <li>5. 예약 당일 드림캐쳐를 방문하여 체험을 즐깁니다</li>
              </ol>
            </div>

            {/* 액션 버튼들 */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/coupon/verify">
                <Button size="lg" className="w-full sm:w-auto gap-2">
                  <Ticket className="w-5 h-5" />
                  쿠폰 입력하기
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
            <p>• 쿠폰은 발급일로부터 15일간 유효합니다</p>
            <p>• 각 쿠폰은 1인 1회만 사용 가능합니다</p>
            <p>• 프로그램 예약은 최소 1일 전까지 완료해주세요</p>
            <p>• 쿠폰 사용 시 본인 확인이 필요할 수 있습니다</p>
            <p>• 타인에게 양도할 수 없습니다</p>
          </CardContent>
        </Card>

        {/* 문의 */}
        <div className="text-center text-sm text-muted-foreground">
          <p>쿠폰 관련 문의사항이 있으신가요?</p>
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