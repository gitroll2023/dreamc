import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, Home, Users, BookOpen, Phone, Image, MessageSquare, Shield, FileText } from 'lucide-react';

export default function SitemapPage() {
  const siteStructure = [
    {
      title: '메인',
      icon: <Home className="h-5 w-5" />,
      links: [
        { name: '홈', href: '/', badge: null },
      ]
    },
    {
      title: '프로그램',
      icon: <BookOpen className="h-5 w-5" />,
      links: [
        { name: '전체 프로그램', href: '/programs', badge: null },
        { name: 'AI 인문학 부트캠프', href: '/programs/ai-bootcamp', badge: '모집중' },
        { name: 'AI 부트캠프 신청', href: '/programs/ai-bootcamp/apply', badge: null },
        { name: '체험 프로그램 신청', href: '/programs/experience/apply', badge: null },
      ]
    },
    {
      title: '드림캐쳐 소개',
      icon: <Users className="h-5 w-5" />,
      links: [
        { name: '소개', href: '/about', badge: null },
        { name: '성장 스토리', href: '/history', badge: null },
      ]
    },
    {
      title: '커뮤니티',
      icon: <MessageSquare className="h-5 w-5" />,
      links: [
        { name: '공지사항', href: '/community', badge: null },
        { name: '갤러리', href: '/gallery', badge: null },
      ]
    },
    {
      title: '참여/문의',
      icon: <Phone className="h-5 w-5" />,
      links: [
        { name: '문의하기', href: '/contact', badge: null },
        { name: '설문조사', href: '/survey', badge: null },
        { name: '쿠폰 등록', href: '/coupon', badge: null },
        { name: '쿠폰 인증', href: '/coupon/verify', badge: null },
      ]
    },
    {
      title: '정책',
      icon: <Shield className="h-5 w-5" />,
      links: [
        { name: '이용약관', href: '/terms', badge: null },
        { name: '개인정보 처리방침', href: '/privacy', badge: null },
        { name: '사이트맵', href: '/sitemap', badge: '현재 페이지' },
      ]
    }
  ];

  return (
    <div className="min-h-screen py-12 md:py-20">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4" variant="outline">
            <FileText className="w-3 h-3 mr-1" />
            사이트맵
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            드림캐쳐 사이트맵
          </h1>
          <p className="text-lg text-muted-foreground">
            드림캐쳐 웹사이트의 전체 구조를 한눈에 확인하세요
          </p>
        </div>

        {/* Site Structure */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {siteStructure.map((section, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {section.icon}
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <div key={linkIndex}>
                      {link.badge === '현재 페이지' ? (
                        <div className="flex items-center justify-between p-2 bg-primary/10 rounded-md">
                          <span className="text-sm font-medium">{link.name}</span>
                          <Badge variant="default" className="text-xs">
                            {link.badge}
                          </Badge>
                        </div>
                      ) : (
                        <Link 
                          href={link.href}
                          className="flex items-center justify-between p-2 hover:bg-secondary rounded-md transition-colors group"
                        >
                          <span className="text-sm group-hover:text-primary transition-colors">
                            {link.name}
                          </span>
                          <div className="flex items-center gap-2">
                            {link.badge && (
                              <Badge variant="secondary" className="text-xs">
                                {link.badge}
                              </Badge>
                            )}
                            <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                          </div>
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer Info */}
        <Card className="mt-12 bg-secondary/30">
          <CardContent className="py-8">
            <div className="text-center space-y-4">
              <h2 className="text-xl font-semibold">페이지를 찾을 수 없나요?</h2>
              <p className="text-muted-foreground">
                찾으시는 페이지가 목록에 없다면 문의해 주세요
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a 
                  href="mailto:dream24culture@outlook.kr"
                  className="text-primary hover:underline"
                >
                  dream24culture@outlook.kr
                </a>
                <span className="hidden sm:inline text-muted-foreground">|</span>
                <Link 
                  href="/contact"
                  className="text-primary hover:underline"
                >
                  문의 페이지 바로가기
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}