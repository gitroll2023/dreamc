import Link from 'next/link';
import { Home, ArrowLeft, Search, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-secondary/20">
      <div className="container max-w-2xl mx-auto px-4 py-8">
        <Card className="border-0 shadow-lg">
          <CardContent className="py-16 text-center">
            <div className="mb-8">
              <h1 className="text-8xl font-bold text-primary mb-2">404</h1>
              <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                페이지를 찾을 수 없습니다
              </h2>
              <p className="text-lg text-muted-foreground max-w-md mx-auto mb-8">
                요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
                아래 버튼을 통해 원하시는 페이지로 이동해 주세요.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 max-w-md mx-auto mb-12">
              <Button asChild size="lg" className="w-full">
                <Link href="/">
                  <Home className="mr-2 h-4 w-4" />
                  홈으로 가기
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full">
                <Link href="/programs">
                  <Search className="mr-2 h-4 w-4" />
                  프로그램 둘러보기
                </Link>
              </Button>
            </div>

            <div className="border-t pt-8">
              <h3 className="text-lg font-semibold mb-4">자주 찾는 페이지</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                <Link 
                  href="/programs" 
                  className="text-primary hover:underline transition-all"
                >
                  체험 프로그램
                </Link>
                <Link 
                  href="/programs/ai-bootcamp" 
                  className="text-primary hover:underline transition-all"
                >
                  AI 부트캠프
                </Link>
                <Link 
                  href="/about" 
                  className="text-primary hover:underline transition-all"
                >
                  드림캐쳐 소개
                </Link>
                <Link 
                  href="/contact" 
                  className="text-primary hover:underline transition-all"
                >
                  문의하기
                </Link>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t">
              <p className="text-sm text-muted-foreground mb-4">
                계속해서 문제가 발생한다면 연락 주세요
              </p>
              <div className="flex items-center justify-center gap-6 text-sm">
                <a 
                  href="mailto:dream24culture@outlook.kr" 
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  dream24culture@outlook.kr
                </a>
                <Link 
                  href="/contact" 
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  문의 페이지
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <p className="text-xs text-muted-foreground">
            드림캐쳐 - 문화 체험 플랫폼
          </p>
        </div>
      </div>
    </div>
  );
}