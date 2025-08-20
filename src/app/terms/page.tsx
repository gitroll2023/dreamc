'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollText, Calendar, Mail } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen py-12 md:py-20">
      <div className="container max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4" variant="outline">
            <ScrollText className="w-3 h-3 mr-1" />
            이용약관
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            드림캐쳐 서비스 이용약관
          </h1>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>시행일: 2024년 12월 1일</span>
          </div>
        </div>

        {/* Terms Content */}
        <Card>
          <CardContent className="py-8 prose prose-gray max-w-none">
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">제1조 (목적)</h2>
              <p className="text-muted-foreground leading-relaxed">
                이 약관은 드림캐쳐(이하 &quot;회사&quot;)가 제공하는 문화 체험 플랫폼 서비스(이하 &quot;서비스&quot;)의 이용과 관련하여 
                회사와 이용자 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">제2조 (정의)</h2>
              <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
                <li>&quot;서비스&quot;란 회사가 제공하는 모든 문화 체험 프로그램 및 관련 서비스를 의미합니다.</li>
                <li>"이용자"란 이 약관에 따라 서비스를 이용하는 회원 및 비회원을 말합니다.</li>
                <li>"회원"이란 회사와 서비스 이용계약을 체결하고 회원 ID를 부여받은 자를 말합니다.</li>
                <li>"프로그램"이란 회사가 제공하는 각종 문화 체험 프로그램을 의미합니다.</li>
                <li>"베타 테스트"란 정식 서비스 출시 전 시범 운영 기간을 의미합니다.</li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">제3조 (약관의 효력 및 변경)</h2>
              <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
                <li>이 약관은 서비스 화면에 게시하거나 기타의 방법으로 이용자에게 공지함으로써 효력이 발생합니다.</li>
                <li>회사는 필요한 경우 관련 법령을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.</li>
                <li>약관이 개정되는 경우, 회사는 개정 내용과 적용일자를 명시하여 현행 약관과 함께 서비스 초기 화면에 적용일자 7일 전부터 공지합니다.</li>
                <li>이용자가 개정약관의 적용일 이후에도 서비스를 계속 이용하는 경우 개정약관에 동의한 것으로 간주합니다.</li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">제4조 (서비스의 제공)</h2>
              <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
                <li>회사는 다음과 같은 서비스를 제공합니다:
                  <ul className="list-disc pl-6 mt-2">
                    <li>문화 체험 프로그램 정보 제공</li>
                    <li>프로그램 신청 및 참여</li>
                    <li>AI 인문학 부트캠프 운영</li>
                    <li>커뮤니티 서비스</li>
                    <li>기타 회사가 정하는 서비스</li>
                  </ul>
                </li>
                <li>서비스는 연중무휴, 1일 24시간 제공함을 원칙으로 합니다. 단, 기술적 사유 등으로 서비스가 일시 중단될 수 있습니다.</li>
                <li>회사는 서비스의 내용을 변경할 경우 변경 사유와 내용을 사전에 공지합니다.</li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">제5조 (회원가입)</h2>
              <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
                <li>이용자는 회사가 정한 양식에 따라 필요 정보를 기입하고 이 약관에 동의함으로써 회원가입을 신청합니다.</li>
                <li>회사는 다음 각 호에 해당하는 경우 회원가입을 승인하지 않을 수 있습니다:
                  <ul className="list-disc pl-6 mt-2">
                    <li>실명이 아니거나 타인의 정보를 도용한 경우</li>
                    <li>필수 기재사항을 누락하거나 허위로 기재한 경우</li>
                    <li>기타 회원으로 등록하는 것이 서비스 운영에 현저한 지장이 있다고 판단되는 경우</li>
                  </ul>
                </li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">제6조 (프로그램 신청 및 취소)</h2>
              <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
                <li>이용자는 회사가 제공하는 절차에 따라 프로그램을 신청할 수 있습니다.</li>
                <li>프로그램 신청 취소는 프로그램 시작 24시간 전까지 가능합니다.</li>
                <li>베타 테스트 기간 중 제공되는 체험가 프로그램의 경우, 별도의 취소 및 환불 정책이 적용될 수 있습니다.</li>
                <li>회사는 다음의 경우 프로그램 진행을 취소할 수 있습니다:
                  <ul className="list-disc pl-6 mt-2">
                    <li>최소 인원이 충족되지 않은 경우</li>
                    <li>천재지변 등 불가항력적 사유가 발생한 경우</li>
                    <li>강사의 사정으로 진행이 불가능한 경우</li>
                  </ul>
                </li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">제7조 (이용자의 의무)</h2>
              <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
                <li>이용자는 다음 행위를 하여서는 안 됩니다:
                  <ul className="list-disc pl-6 mt-2">
                    <li>신청 또는 변경 시 허위 내용의 등록</li>
                    <li>타인의 정보 도용</li>
                    <li>회사가 게시한 정보의 무단 변경</li>
                    <li>회사 및 제3자의 저작권 등 지적재산권 침해</li>
                    <li>회사 및 제3자의 명예를 손상시키거나 업무를 방해하는 행위</li>
                    <li>외설적이거나 폭력적인 내용 등 공공질서에 위반되는 정보 유포</li>
                    <li>기타 관련 법령에 위배되는 행위</li>
                  </ul>
                </li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">제8조 (개인정보보호)</h2>
              <p className="text-muted-foreground leading-relaxed">
                회사는 이용자의 개인정보 수집 시 서비스 제공에 필요한 최소한의 정보를 수집합니다. 
                개인정보의 처리 및 보호에 관한 자세한 사항은 개인정보 처리방침에 따릅니다.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">제9조 (책임제한)</h2>
              <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
                <li>회사는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우 책임이 면제됩니다.</li>
                <li>회사는 이용자의 귀책사유로 인한 서비스 이용 장애에 대하여 책임지지 않습니다.</li>
                <li>회사는 이용자가 서비스를 이용하여 기대하는 수익을 얻지 못한 것에 대하여 책임지지 않습니다.</li>
                <li>베타 테스트 기간 중 발생하는 서비스 오류나 장애에 대해서는 책임이 제한될 수 있습니다.</li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">제10조 (분쟁해결)</h2>
              <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
                <li>회사와 이용자 간에 발생한 분쟁은 상호 협의하여 해결함을 원칙으로 합니다.</li>
                <li>이용자의 불만사항 및 의견은 이메일(dream24culture@outlook.kr)을 통해 접수 및 처리됩니다.</li>
                <li>제1항의 협의가 이루어지지 않을 경우, 양 당사자는 관련 법령에 따른 절차를 통해 분쟁을 해결할 수 있습니다.</li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">제11조 (재판권 및 준거법)</h2>
              <p className="text-muted-foreground leading-relaxed">
                이 약관에 명시되지 않은 사항은 관련 법령 및 상관례에 따릅니다. 
                회사와 이용자 간에 발생한 분쟁에 관한 소송은 민사소송법에 따른 관할법원에 제기합니다.
              </p>
            </section>

            <section className="mb-8 border-t pt-8">
              <h2 className="text-xl font-bold mb-4">부칙</h2>
              <p className="text-muted-foreground">
                이 약관은 2024년 12월 1일부터 시행됩니다.
              </p>
            </section>

            <Card className="mt-8 bg-secondary/30">
              <CardContent className="py-6">
                <div className="text-center space-y-2">
                  <p className="font-semibold">문의사항이 있으신가요?</p>
                  <a 
                    href="mailto:dream24culture@outlook.kr"
                    className="flex items-center justify-center gap-2 text-primary hover:underline"
                  >
                    <Mail className="h-4 w-4" />
                    dream24culture@outlook.kr
                  </a>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}