'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Download, Sparkles, Gift, Star, Ticket, Calendar, Hash, Trash2, X, AlertTriangle } from 'lucide-react';
import html2canvas from 'html2canvas';

export default function CouponPage() {
  const [recipientName, setRecipientName] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [downloading, setDownloading] = useState(false);
  const [isIssued, setIsIssued] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [generating, setGenerating] = useState(false);
  const couponRef = useRef<HTMLDivElement>(null);

  const generateCoupon = async () => {
    if (!recipientName.trim()) {
      alert('받는 분의 이름을 입력해주세요.');
      return;
    }

    setGenerating(true);
    
    try {
      const response = await fetch('/api/coupons/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ recipientName: recipientName.trim() }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setCouponCode(data.coupon.code);
        setIssueDate(data.coupon.issueDate);
        setExpiryDate(data.coupon.expiryDate);
        setIsIssued(true);
      } else {
        alert(data.error || '체험권 발급 중 오류가 발생했습니다.');
      }
    } catch (error) {
      alert('체험권 발급 중 오류가 발생했습니다. 네트워크 연결을 확인해주세요.');
    } finally {
      setGenerating(false);
    }
  };

  const resetCoupon = () => {
    setRecipientName('');
    setCouponCode('');
    setIssueDate('');
    setExpiryDate('');
    setIsIssued(false);
    setShowDeleteModal(false);
  };

  const handleDelete = () => {
    resetCoupon();
  };

  const downloadCoupon = async () => {
    if (!couponRef.current) return;
    
    setDownloading(true);
    try {
      const canvas = await html2canvas(couponRef.current, {
        scale: 2,
        logging: false,
        useCORS: true
      } as any);
      
      const link = document.createElement('a');
      link.download = `dreamcatcher-coupon-${couponCode}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Download error:', error);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">드림캐쳐 할인 체험권 발급 시스템</h1>
          <p className="text-muted-foreground">서포터즈 전용 체험권 발급 페이지</p>
        </div>

        {!isIssued ? (
          /* 발급 전 화면 */
          <Card className="max-w-md mx-auto p-6">
            <div className="space-y-4">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-3">
                  <Ticket className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-xl font-semibold">새 할인 체험권 발급</h2>
              </div>

              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  받는 분 이름 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="예: 홍길동"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  autoFocus
                  disabled={generating}
                />
                <p className="text-xs text-muted-foreground">
                  체험권에 표시될 이름을 입력해주세요
                </p>
              </div>

              <Button 
                onClick={generateCoupon}
                className="w-full"
                size="lg"
                disabled={!recipientName.trim() || generating}
              >
                {generating ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    체험권 생성 중...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    체험권 발행하기
                  </>
                )}
              </Button>

              {generating && (
                <p className="text-sm text-center text-muted-foreground">
                  체험권을 생성하고 있습니다. 잠시만 기다려주세요...
                </p>
              )}
            </div>
          </Card>
        ) : (
          /* 발급 후 화면 */
          <div className="space-y-6">
            {/* 쿠폰 카드 */}
            <div className="flex justify-center">
              <div 
                ref={couponRef}
                className="relative overflow-hidden"
                style={{ 
                  width: '600px',
                  height: '500px',
                  maxWidth: '100%',
                  backgroundColor: '#FFFFFF',  // 명시적으로 흰색 배경 설정
                  border: '2px solid #e5e7eb',
                  borderRadius: '24px'
                }}
              >
                {/* 배경 패턴 - 다운로드 시 제거됨 */}

                {/* 좌측 장식 */}
                <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-primary via-accent to-primary"></div>
                
                {/* 우측 찢어지는 효과 */}
                <div className="absolute right-0 top-0 bottom-0 w-8">
                  <svg className="h-full w-full" viewBox="0 0 32 100" preserveAspectRatio="none">
                    <path 
                      d="M 0 0 L 16 5 L 0 10 L 16 15 L 0 20 L 16 25 L 0 30 L 16 35 L 0 40 L 16 45 L 0 50 L 16 55 L 0 60 L 16 65 L 0 70 L 16 75 L 0 80 L 16 85 L 0 90 L 16 95 L 0 100 L 32 100 L 32 0 Z" 
                      fill="white"
                      stroke="rgba(37, 99, 235, 0.2)"
                      strokeWidth="0.5"
                      strokeDasharray="2 2"
                    />
                  </svg>
                </div>

                <div className="relative p-8 flex flex-col justify-between h-full">
                  {/* 상단 영역 */}
                  <div className="space-y-3">
                    {/* 로고와 타이틀 */}
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                            <Sparkles className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <span className="text-2xl font-bold text-primary">드림캐쳐</span>
                            <p className="text-xs text-gray-800">청년 문화 커뮤니티</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* 수령인 이름 */}
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-800">{recipientName}님</p>
                        <p className="text-sm text-gray-900">초대합니다</p>
                      </div>
                    </div>

                    {/* 메인 텍스트 */}
                    <div className="text-center py-2">
                      <h1 className="text-3xl font-bold text-gray-800">
                        할인 체험권
                      </h1>
                      <p className="text-sm text-gray-900 mt-1">
                        드림캐쳐의 모든 체험 프로그램을 특별 할인가로 체험하실 수 있습니다
                      </p>
                    </div>

                    {/* 프로그램 목록 */}
                    <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg p-3">
                      <p className="text-xs font-semibold text-gray-700 mb-1">이용 가능 프로그램 (첫 체험 할인율)</p>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-0.5 text-xs text-gray-900" style={{ fontSize: '11px' }}>
                        <span>🍹 칵테일 파티 (88% 할인)</span>
                        <span>🍰 홈베이킹 (83% 할인)</span>
                        <span>🎨 석고방향제 (89% 할인)</span>
                        <span>🎲 보드게임 (33% 할인)</span>
                        <span>✍️ 캘리그래피 (88% 할인)</span>
                        <span>📸 사진 클래스 (90% 할인)</span>
                      </div>
                    </div>
                  </div>

                  {/* 하단 영역 */}
                  <div className="space-y-3">
                    {/* 쿠폰 코드 */}
                    <div className="rounded-lg px-4 py-3 border-2 border-dashed border-gray-400" style={{ backgroundColor: '#f9fafb' }}>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-gray-800 mb-1">체험권 코드</p>
                          <span className="text-xl font-bold tracking-wider text-primary">
                            {couponCode}
                          </span>
                        </div>
                        <Hash className="w-8 h-8 text-gray-300" />
                      </div>
                    </div>

                    {/* 날짜 정보 */}
                    <div className="flex justify-between items-center pt-2 border-t">
                      <div className="text-xs text-gray-800 space-y-0.5">
                        <p>• 첫 체험시 할인 적용</p>
                        <p>• 재체험은 정가</p>
                      </div>
                      <div className="text-right">
                        <div className="flex gap-4">
                          <div>
                            <p className="text-xs text-gray-700">발급일</p>
                            <p className="text-sm font-semibold text-gray-700">
                              {issueDate}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-700">만료일</p>
                            <p className="text-sm font-semibold text-red-600">
                              {expiryDate}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 하단 안내 */}
                    <div className="text-center border-t pt-2">
                      <p className="text-xs text-gray-600">사용 문의: 드림캐쳐 나주점</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 액션 버튼들 */}
            <div className="flex gap-4 justify-center">
              <Button
                onClick={downloadCoupon}
                className="gap-2"
                disabled={downloading}
              >
                {downloading ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    다운로드 중...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    이미지로 저장
                  </>
                )}
              </Button>
              
              <Button
                onClick={resetCoupon}
                variant="outline"
                className="gap-2"
              >
                <Sparkles className="w-4 h-4" />
                새 체험권 발급
              </Button>

              <Button
                onClick={() => setShowDeleteModal(true)}
                variant="destructive"
                className="gap-2"
              >
                <Trash2 className="w-4 h-4" />
                삭제
              </Button>
            </div>

            {/* 안내사항 */}
            <Card className="p-4 bg-yellow-50 border-yellow-200">
              <div className="flex gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-semibold text-sm">체험권 발급 안내</p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• 발급된 체험권은 이미지로 저장하여 카카오톡 등으로 전달해주세요</li>
                    <li>• 각 프로그램별 첫 체험시에만 할인이 적용됩니다</li>
                    <li>• 재체험시에는 정가로 이용 가능합니다</li>
                    <li>• 체험권은 발급일로부터 15일간 유효합니다</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* 삭제 확인 모달 */}
        {showDeleteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <Card className="max-w-md w-full p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">체험권 삭제</h3>
                    <p className="text-sm text-muted-foreground">
                      현재 체험권을 삭제하고 새로 시작하시겠습니까?
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowDeleteModal(false)}
                    className="flex-1"
                  >
                    취소
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={handleDelete}
                    className="flex-1"
                  >
                    삭제
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}