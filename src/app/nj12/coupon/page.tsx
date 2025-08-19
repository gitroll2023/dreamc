'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Download, Sparkles, Gift, Star, RefreshCw, Ticket, Calendar, Hash, Trash2, X, AlertTriangle } from 'lucide-react';
import html2canvas from 'html2canvas';

export default function CouponPage() {
  const [recipientName, setRecipientName] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [downloading, setDownloading] = useState(false);
  const [isIssued, setIsIssued] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const couponRef = useRef<HTMLDivElement>(null);

  const generateCoupon = async () => {
    if (!recipientName.trim()) {
      alert('받는 분의 이름을 입력해주세요.');
      return;
    }

    try {
      // DB에 쿠폰 저장
      const response = await fetch('/api/coupons/issue', {
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
        alert(data.error || '쿠폰 발급 중 오류가 발생했습니다.');
      }
    } catch (error) {
      alert('쿠폰 발급 중 오류가 발생했습니다.');
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
      // 모바일에서도 PC와 동일한 크기로 캡처하기 위해 설정
      const canvas = await html2canvas(couponRef.current, {
        logging: false,
        useCORS: true,
        width: 600,
        height: 500,
        backgroundColor: '#ffffff',  // 흰색 배경 명시
        scale: 2  // 고해상도를 위해 2배 스케일
      });
      
      const link = document.createElement('a');
      link.download = `dreamcatcher-coupon-${couponCode}.png`;
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">드림캐쳐 체험권 발급 시스템</h1>
          <p className="text-muted-foreground">서포터즈 전용 쿠폰 발급 페이지</p>
        </div>

        {!isIssued ? (
          /* 발급 전 화면 */
          <Card className="max-w-md mx-auto p-6">
            <div className="space-y-4">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-3">
                  <Ticket className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-xl font-semibold">새 체험권 발급</h2>
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
                />
                <p className="text-xs text-muted-foreground">
                  쿠폰에 표시될 이름을 입력해주세요
                </p>
              </div>

              <Button 
                onClick={generateCoupon}
                className="w-full"
                size="lg"
                disabled={!recipientName.trim()}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                쿠폰 발행하기
              </Button>
            </div>
          </Card>
        ) : (
          /* 발급 후 화면 */
          <div className="space-y-6">
            {/* 쿠폰 카드 */}
            <div className="flex justify-center">
              <div 
                ref={couponRef}
                className="relative rounded-3xl shadow-2xl overflow-hidden"
                style={{ 
                  width: '600px',
                  height: '500px',
                  maxWidth: '100%',
                  backgroundColor: '#ffffff'  // 명시적으로 흰색 배경 설정
                }}
              >
                {/* 배경 패턴 */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(37, 99, 235, 0.1) 35px, rgba(37, 99, 235, 0.1) 70px)`,
                  }}></div>
                </div>

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
                            <p className="text-xs text-gray-500">청년 문화 커뮤니티</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* 수령인 이름 */}
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-800">{recipientName}님</p>
                        <p className="text-sm text-gray-600">초대합니다</p>
                      </div>
                    </div>

                    {/* 메인 텍스트 */}
                    <div className="text-center py-2">
                      <h1 className="text-3xl font-bold text-gray-800">
                        오프라인 1회 체험권
                      </h1>
                      <p className="text-sm text-gray-600 mt-1">
                        드림캐쳐의 모든 체험 프로그램을 1회 무료로 참여하실 수 있습니다
                      </p>
                    </div>

                    {/* 프로그램 목록 */}
                    <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg p-3">
                      <p className="text-xs font-semibold text-gray-700 mb-1">이용 가능 프로그램</p>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-0.5 text-xs text-gray-600" style={{ fontSize: '11px' }}>
                        <span>✨ 향수 만들기</span>
                        <span>🍰 홈베이킹 클래스</span>
                        <span>🎨 퍼스널컬러 진단</span>
                        <span>🎲 보드게임 카페</span>
                        <span>✍️ 캘리그래피</span>
                        <span>📸 사진 촬영 워크샵</span>
                      </div>
                    </div>
                  </div>

                  {/* 하단 영역 */}
                  <div className="space-y-3">
                    {/* 쿠폰 코드 */}
                    <div className="bg-gray-50 rounded-lg px-4 py-3 border-2 border-dashed border-gray-300">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">쿠폰 코드</p>
                          <span className="text-xl font-bold tracking-wider text-primary">
                            {couponCode}
                          </span>
                        </div>
                        <Hash className="w-8 h-8 text-gray-300" />
                      </div>
                    </div>

                    {/* 날짜 정보 */}
                    <div className="flex justify-between items-center pt-2 border-t">
                      <div className="text-xs text-gray-500 space-y-0.5">
                        <p>• 1인 1회 사용 가능</p>
                        <p>• 타인 양도 금지</p>
                      </div>
                      <div className="text-right">
                        <div className="flex gap-4">
                          <div>
                            <p className="text-xs text-gray-400">발급일</p>
                            <p className="text-sm font-semibold text-gray-700">
                              {issueDate}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-400">만료일</p>
                            <p className="text-sm font-semibold text-red-600">
                              {expiryDate}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 액션 버튼들 */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={downloadCoupon}
                size="lg"
                className="gap-2"
                disabled={downloading}
              >
                {downloading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    다운로드 중...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    이미지 다운로드
                  </>
                )}
              </Button>
              
              <Button 
                onClick={resetCoupon}
                variant="outline"
                size="lg"
                className="gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                새로 발급하기
              </Button>
              
              <Button 
                onClick={() => setShowDeleteModal(true)}
                variant="destructive"
                size="lg"
                className="gap-2"
              >
                <Trash2 className="w-4 h-4" />
                삭제하기
              </Button>
            </div>

            {/* 안내 메시지 */}
            <div className="bg-white/80 backdrop-blur rounded-lg p-4 text-center max-w-2xl mx-auto">
              <p className="text-sm text-gray-600">
                쿠폰을 이미지로 저장하여 카카오톡이나 문자로 전달하세요.<br />
                받으신 분은 드림캐쳐의 모든 체험 프로그램을 1회 무료로 참여하실 수 있습니다.
              </p>
            </div>
          </div>
        )}

        {/* 삭제 확인 모달 */}
        {showDeleteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-red-100 rounded-full">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">쿠폰을 삭제하시겠습니까?</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      잘못 만드신 쿠폰을 삭제하고 처음부터 다시 시작합니다.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-3 mb-4">
                <p className="text-sm text-gray-600">
                  <strong>수령인:</strong> {recipientName}님<br />
                  <strong>쿠폰 코드:</strong> {couponCode}
                </p>
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
                  삭제하기
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}