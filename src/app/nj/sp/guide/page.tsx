'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, MapPin, Phone, Gift, CreditCard, MessageSquare, 
  ArrowRight, Lock, QrCode, Calendar, ClipboardCheck,
  Home, AlertTriangle, FileText
} from 'lucide-react';
import Link from 'next/link';

export default function SupportersGuidePage() {
  const [passwords, setPasswords] = useState({
    supportersPassword: '로딩중...',
    couponAccessPassword: '로딩중...'
  });

  useEffect(() => {
    fetch('/api/guide-config')
      .then(res => res.json())
      .then(data => {
        setPasswords({
          supportersPassword: data.supportersPassword,
          couponAccessPassword: data.couponAccessPassword
        });
      })
      .catch(err => {
        console.error('Failed to load config:', err);
        setPasswords({
          supportersPassword: '비밀번호 로드 실패',
          couponAccessPassword: '비밀번호 로드 실패'
        });
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background">
      {/* 헤더 */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">서포터즈 활동 가이드북</h1>
              <p className="text-muted-foreground mt-1">드림캐쳐 나주 서포터즈 필수 매뉴얼</p>
            </div>
            <Link href="/nj/sp/dashboard">
              <Button variant="outline">
                <Home className="w-4 h-4 mr-2" />
                대시보드로
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* 경고 사항 */}
        <Card className="mb-6 border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-800">
              <AlertTriangle className="w-5 h-5" />
              중요 공지사항
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-yellow-700">
            <p>• 비밀번호는 절대 외부에 공개하지 마세요</p>
            <p>• QR코드 스캔 시 기본 카메라 앱을 사용하세요</p>
            <p>• 모든 활동은 나주 지역에서만 진행됩니다</p>
            <p>• 10대는 칵테일 프로그램 신청 불가</p>
          </CardContent>
        </Card>

        {/* 상황별 가이드 */}
        <div className="space-y-8">
          {/* 길거리 활동 */}
          <div>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              길거리 활동 (현장 모집)
            </h2>
            
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Badge>1</Badge>
                    체험단 모집 - 태블릿 활용
                  </CardTitle>
                  <CardDescription>
                    관심 있는 분들을 직접 태블릿으로 신청 유도
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <Link href="/apply-discount" target="_blank">
                      <Button className="w-full">
                        <Users className="w-4 h-4 mr-2" />
                        체험단 신청 페이지 열기
                      </Button>
                    </Link>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p>✅ 태블릿으로 직접 입력 도와드리기</p>
                    <p>✅ 연령대 확인 (10대는 칵테일 불가)</p>
                    <p>✅ 담당 서포터즈 이름 선택</p>
                    <p>✅ 개인정보 동의 받기</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Badge>2</Badge>
                    바쁜 분들을 위한 QR 신청
                  </CardTitle>
                  <CardDescription>
                    시간이 없는 분들은 QR로 나중에 신청하도록 안내
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <Link href="/apply-discount/qr" target="_blank">
                      <Button className="w-full" variant="outline">
                        <QrCode className="w-4 h-4 mr-2" />
                        QR 신청 페이지 열기
                      </Button>
                    </Link>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p>📱 태블릿에 QR 코드 띄우기</p>
                    <p>📸 기본 카메라 앱으로 스캔 안내</p>
                    
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* 사무 작업 */}
          <div>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Phone className="w-5 h-5 text-primary" />
              사무 작업 (집에서)
            </h2>
            
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Badge>3</Badge>
                    신청자 연락처 확인
                  </CardTitle>
                  <CardDescription>
                    수집한 연락처 확인 및 관리
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <Link href="/nj/sp" target="_blank">
                      <Button className="w-full">
                        <Phone className="w-4 h-4 mr-2" />
                        서포터즈 대시보드 열기
                      </Button>
                    </Link>
                  </div>
                  <div className="bg-red-50 p-3 rounded-lg">
                    <p className="text-sm text-red-700">
                      <Lock className="w-4 h-4 inline mr-1" />
                      비밀번호: <span className="font-mono bg-red-100 px-2 py-0.5 rounded">{passwords.supportersPassword}</span>
                    </p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p>• 신청자 목록 확인</p>
                    <p>• 연락처 복사 기능</p>
                    <p>• 날짜별, 서포터즈별 필터링</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Badge>4</Badge>
                    체험 할인쿠폰 발급
                  </CardTitle>
                  <CardDescription>
                    신청자에게 쿠폰 이미지 전송
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <Link href="/coupon" target="_blank">
                      <Button className="w-full">
                        <Gift className="w-4 h-4 mr-2" />
                        쿠폰 발급 페이지 열기
                      </Button>
                    </Link>
                  </div>
                  <div className="bg-red-50 p-3 rounded-lg">
                    <p className="text-sm text-red-700">
                      <Lock className="w-4 h-4 inline mr-1" />
                      서포터즈 비밀번호: <span className="font-mono bg-red-100 px-2 py-0.5 rounded">{passwords.supportersPassword}</span>
                    </p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p>1️⃣ 비밀번호 입력</p>
                    <p>2️⃣ 신청자 이름 입력</p>
                    <p>3️⃣ 쿠폰 이미지 생성</p>
                    <p>4️⃣ 이미지 저장 → 카톡 전송</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* 행사장 활동 */}
          <div>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-primary" />
              행사장 활동 (프로그램 진행)
            </h2>
            
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Badge>5</Badge>
                    참여 동의서 받기
                  </CardTitle>
                  <CardDescription>
                    체험 시작 전 초상권 및 피드백 동의
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <Link href="/consent" target="_blank">
                      <Button className="w-full" variant="outline">
                        <FileText className="w-4 h-4 mr-2" />
                        동의서 작성 페이지 열기
                      </Button>
                    </Link>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p>📸 초상권 사용 동의 확인</p>
                    <p>📝 방문 경로 확인</p>
                    <p>💬 피드백 제공 동의</p>
                    <p>✍️ 전자 서명 받기</p>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-3">
                    <p className="text-xs text-blue-700">
                      💡 <strong>권장사항:</strong> 서명 입력을 위해 태블릿 PC 또는 
                      펜(S펜, 애플펜슬 등)이 있는 휴대폰/태블릿 사용을 권장합니다.
                    </p>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mt-2">
                    <p className="text-xs text-gray-600">
                      ℹ️ <strong>참고:</strong> 이 동의서는 형식적으로 받는 것으로, 
                      실제 DB에 저장되지 않습니다. 참여자 안심을 위한 절차입니다.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Badge>6</Badge>
                    쿠폰 사용 및 결제
                  </CardTitle>
                  <CardDescription>
                    체험자가 가져온 쿠폰으로 결제 처리
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <Link href="/coupon" target="_blank">
                      <Button className="w-full">
                        <CreditCard className="w-4 h-4 mr-2" />
                        쿠폰 등록 페이지 열기
                      </Button>
                    </Link>
                    <p className="text-xs text-gray-600 mt-2 text-center">페이지에서 '쿠폰 등록하기' 버튼 클릭</p>
                  </div>
                  <div className="bg-red-50 p-3 rounded-lg">
                    <p className="text-sm text-red-700">
                      <Lock className="w-4 h-4 inline mr-1" />
                      쿠폰 등록 비밀번호: <span className="font-mono bg-red-100 px-2 py-0.5 rounded">{passwords.couponAccessPassword}</span>
                    </p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p>1️⃣ 쿠폰 코드 입력</p>
                    <p>2️⃣ 연락처 확인</p>
                    <p>3️⃣ 체험 프로그램 선택</p>
                    <p>4️⃣ 현금/카드 결제 받기</p>
                    <p>5️⃣ 사용 완료 처리</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Badge>7</Badge>
                    피드백 수집
                  </CardTitle>
                  <CardDescription>
                    프로그램 개선을 위한 의견 수집
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="bg-blue-50 p-4 rounded-lg space-y-2">
                    <Link href="/survey" target="_blank">
                      <Button className="w-full" variant="outline">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        설문조사 페이지 열기
                      </Button>
                    </Link>
                    <Link href="/survey/qr" target="_blank">
                      <Button className="w-full" variant="outline">
                        <QrCode className="w-4 h-4 mr-2" />
                        설문조사 QR 페이지 열기
                      </Button>
                    </Link>
                  </div>
                  <div className="bg-yellow-50 p-3 rounded-lg">
                    <p className="text-sm text-yellow-700">
                      <MessageSquare className="w-4 h-4 inline mr-1" />
                      피드백 목적: 유료 서비스 전환 가능성 평가
                    </p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p>• 만족도 조사</p>
                    <p>• 개선사항 수집</p>
                    <p>• 추가 프로그램 수요 파악</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* 빠른 링크 */}
        <Card className="mt-8 border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
          <CardHeader>
            <CardTitle>빠른 링크 모음</CardTitle>
            <CardDescription>자주 사용하는 페이지 바로가기</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Link href="/apply-discount">
                <Button variant="outline" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  체험단 신청 (태블릿)
                </Button>
              </Link>
              <Link href="/apply-discount/qr">
                <Button variant="outline" className="w-full justify-start">
                  <QrCode className="w-4 h-4 mr-2" />
                  QR 신청 페이지
                </Button>
              </Link>
              <Link href="/nj/sp">
                <Button variant="outline" className="w-full justify-start">
                  <Phone className="w-4 h-4 mr-2" />
                  서포터즈 대시보드
                </Button>
              </Link>
              <Link href="/coupon">
                <Button variant="outline" className="w-full justify-start">
                  <Gift className="w-4 h-4 mr-2" />
                  쿠폰 발급/등록
                </Button>
              </Link>
              <Link href="/survey">
                <Button variant="outline" className="w-full justify-start">
                  <ClipboardCheck className="w-4 h-4 mr-2" />
                  피드백 설문조사
                </Button>
              </Link>
              <Link href="/survey/qr">
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  설문조사 QR
                </Button>
              </Link>
              <Link href="/consent">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  참여 동의서
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* 추가 안내 */}
        <Card className="mt-6 bg-gradient-to-r from-accent/5 to-background">
          <CardHeader>
            <CardTitle className="text-lg">💡 추가 활동 제안</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-2">
            <p>• 행사장에 AI 인문학 프로그램 홍보물 배치</p>
            <p>• 체험 후 만족도가 높은 참가자에게 다른 프로그램도 안내</p>
            <p>• SNS 인증샷 이벤트 진행으로 자연스러운 홍보 유도</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}