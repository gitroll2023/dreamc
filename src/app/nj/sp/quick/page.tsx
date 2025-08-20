'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, QrCode, Phone, Gift, CreditCard, MessageSquare, 
  ClipboardCheck, FileText, Home, MapPin, Briefcase
} from 'lucide-react';
import Link from 'next/link';

export default function QuickLinksPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background p-4">
      <div className="max-w-4xl mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-2">서포터즈 빠른 링크</h1>
          <p className="text-muted-foreground text-sm">상황별 페이지 바로가기</p>
        </div>

        {/* 상황별 카드 그룹 */}
        <div className="space-y-6">
          {/* 체험단 모집 */}
          <Card className="border-primary/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">1</span>
                체험단 모집
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <Link href="/apply-discount" target="_blank">
                  <Button className="w-full h-24 flex flex-col gap-2 relative" size="lg" variant="secondary">
                    <span className="absolute top-2 left-2 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold">1</span>
                    <Users className="w-6 h-6" />
                    <span className="text-sm">신청서 작성</span>
                  </Button>
                </Link>
                <Link href="/apply-discount/qr" target="_blank">
                  <Button className="w-full h-24 flex flex-col gap-2 relative" size="lg" variant="outline">
                    <span className="absolute top-2 left-2 w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold">2</span>
                    <QrCode className="w-6 h-6" />
                    <span className="text-sm">QR 코드</span>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* 운영 관리 */}
          <Card className="border-primary/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">2</span>
                운영 관리
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <Link href="/nj/sp/dashboard" target="_blank">
                  <Button className="w-full h-24 flex flex-col gap-2 relative" size="lg" variant="secondary">
                    <span className="absolute top-2 left-2 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold">3</span>
                    <Phone className="w-6 h-6" />
                    <span className="text-sm">신청자 관리</span>
                  </Button>
                </Link>
                <Link href="/coupon" target="_blank">
                  <Button className="w-full h-24 flex flex-col gap-2 relative" size="lg" variant="outline">
                    <span className="absolute top-2 left-2 w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold">4</span>
                    <Gift className="w-6 h-6" />
                    <span className="text-sm">쿠폰 발급</span>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* 프로그램 운영 */}
          <Card className="border-primary/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">3</span>
                프로그램 운영
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <Link href="/consent" target="_blank">
                  <Button className="w-full h-24 flex flex-col gap-2 relative" size="lg" variant="secondary">
                    <span className="absolute top-2 left-2 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold">5</span>
                    <FileText className="w-6 h-6" />
                    <span className="text-sm">동의서</span>
                  </Button>
                </Link>
                <Link href="/coupon" target="_blank">
                  <Button className="w-full h-24 flex flex-col gap-2 relative" size="lg" variant="outline">
                    <span className="absolute top-2 left-2 w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold">6</span>
                    <CreditCard className="w-6 h-6" />
                    <span className="text-sm">쿠폰 등록</span>
                  </Button>
                </Link>
                <Link href="/survey" target="_blank">
                  <Button className="w-full h-24 flex flex-col gap-2 relative" size="lg" variant="secondary">
                    <span className="absolute top-2 left-2 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold">7</span>
                    <ClipboardCheck className="w-6 h-6" />
                    <span className="text-sm">설문조사</span>
                  </Button>
                </Link>
                <Link href="/survey/qr" target="_blank">
                  <Button className="w-full h-24 flex flex-col gap-2 relative" size="lg" variant="outline">
                    <span className="absolute top-2 left-2 w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold">8</span>
                    <MessageSquare className="w-6 h-6" />
                    <span className="text-sm">설문 QR</span>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* 기타 메뉴 */}
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 gap-3">
                <Link href="/nj/sp/guide" target="_blank">
                  <Button className="w-full" variant="secondary">
                    📖 가이드북
                  </Button>
                </Link>
                <Link href="/nj/sp" target="_blank">
                  <Button className="w-full" variant="secondary">
                    🔐 로그인
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 하단 네비게이션 */}
        <div className="mt-8 text-center">
          <Link href="/nj/sp/dashboard">
            <Button variant="ghost" size="sm">
              <Home className="w-4 h-4 mr-2" />
              대시보드로 돌아가기
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}