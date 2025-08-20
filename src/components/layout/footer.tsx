import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-secondary border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Organization Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">D</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg text-primary leading-5">드림캐쳐</span>
                <span className="text-xs text-muted-foreground">체험프로그램</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              인구감소 지역의 청년 문화를 혁신하며,<br />
              지속가능한 지역 발전을 추구합니다.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">빠른 링크</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  드림캐쳐 소개
                </Link>
              </li>
              <li>
                <Link href="/programs" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  주요 사업
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  소식 및 활동
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  문의하기
                </Link>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">체험 프로그램</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/programs#ai" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  AI시대 살아남기
                </Link>
              </li>
              <li>
                <Link href="/programs#cocktail" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  칵테일 클래스
                </Link>
              </li>
              <li>
                <Link href="/programs#board-game" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  보드게임 체험
                </Link>
              </li>
              <li>
                <Link href="/programs#humanities" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  인문학 프로그램
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">연락처</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">
                  전남 여수시 여서1로 73
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <a href="mailto:dream24culture@outlook.kr" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  dream24culture@outlook.kr
                </a>
              </li>
            </ul>
            <div className="mt-4 pt-4 border-t">
              <h4 className="text-sm font-medium mb-2">활동 지역</h4>
              <p className="text-xs text-muted-foreground">
                여수시 · 목포시 · 화순군 · 나주시
              </p>
            </div>
            <div className="mt-4 p-3 bg-primary/5 rounded-lg">
              <p className="text-xs text-muted-foreground">
                현재 체험 프로그램 운영 중<br />
                2026년 3월 정식 서비스 예정
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              © 2024 드림캐쳐. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                개인정보처리방침
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                이용약관
              </Link>
              <Link href="/sitemap" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                사이트맵
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}