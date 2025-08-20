'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Calendar, Mail, Phone, Lock, Database, Users, AlertCircle } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-12 md:py-20">
      <div className="container max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4" variant="outline">
            <Shield className="w-3 h-3 mr-1" />
            개인정보 처리방침
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            개인정보 처리방침
          </h1>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>시행일: 2024년 12월 1일</span>
          </div>
        </div>

        {/* Important Notice */}
        <Card className="mb-8 border-primary/30 bg-primary/5">
          <CardContent className="py-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-semibold mb-2">중요 안내</p>
                <p className="text-sm text-muted-foreground">
                  드림캐쳐는 이용자의 개인정보를 중요시하며, 「개인정보 보호법」을 준수하고 있습니다.
                  본 처리방침은 2024년 12월 1일부터 시행됩니다.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Privacy Content */}
        <Card>
          <CardContent className="py-8 prose prose-gray max-w-none">
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Database className="h-5 w-5 text-primary" />
                제1조 (개인정보의 수집 항목 및 방법)
              </h2>
              
              <h3 className="text-lg font-semibold mb-3">1. 수집하는 개인정보 항목</h3>
              <div className="pl-6 mb-4">
                <p className="font-semibold mb-2">가. 필수 항목</p>
                <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                  <li>성명, 생년월일, 성별</li>
                  <li>이메일 주소, 휴대전화번호</li>
                  <li>주소(프로그램 참여 시)</li>
                  <li>서비스 이용기록, 접속 로그, 쿠키, 접속 IP 정보</li>
                </ul>
                
                <p className="font-semibold mb-2 mt-4">나. 선택 항목</p>
                <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                  <li>직업, 관심분야</li>
                  <li>프로그램 참여 동기</li>
                  <li>SNS 계정 정보</li>
                </ul>
              </div>

              <h3 className="text-lg font-semibold mb-3">2. 개인정보 수집 방법</h3>
              <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                <li>홈페이지를 통한 회원가입 및 프로그램 신청</li>
                <li>서면 양식</li>
                <li>이메일, 전화를 통한 수집</li>
                <li>생성정보 수집 도구를 통한 수집</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                제2조 (개인정보의 수집 및 이용목적)
              </h2>
              <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
                <li>서비스 제공에 관한 계약 이행 및 서비스 제공</li>
                <li>회원 관리
                  <ul className="list-disc pl-6 mt-2">
                    <li>회원제 서비스 이용에 따른 본인확인</li>
                    <li>개인 식별</li>
                    <li>불량회원의 부정 이용 방지</li>
                    <li>가입 의사 확인</li>
                    <li>연령확인</li>
                    <li>불만처리 등 민원처리</li>
                    <li>고지사항 전달</li>
                  </ul>
                </li>
                <li>마케팅 및 광고에 활용
                  <ul className="list-disc pl-6 mt-2">
                    <li>신규 서비스 개발 및 맞춤 서비스 제공</li>
                    <li>이벤트 등 광고성 정보 전달</li>
                    <li>인구통계학적 특성에 따른 서비스 제공</li>
                    <li>접속 빈도 파악</li>
                    <li>회원의 서비스 이용에 대한 통계</li>
                  </ul>
                </li>
                <li>베타 테스트 데이터 수집 및 서비스 개선</li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Lock className="h-5 w-5 text-primary" />
                제3조 (개인정보의 보유 및 이용기간)
              </h2>
              <p className="text-muted-foreground mb-4">
                회사는 개인정보 수집 및 이용목적이 달성된 후에는 예외 없이 해당 정보를 지체 없이 파기합니다.
                단, 다음의 정보에 대해서는 아래의 이유로 명시한 기간 동안 보존합니다.
              </p>
              
              <h3 className="text-lg font-semibold mb-3">1. 회사 내부 방침에 의한 정보 보유</h3>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>부정이용기록
                  <ul className="list-disc pl-6 mt-1">
                    <li>보존 이유: 부정 이용 방지</li>
                    <li>보존 기간: 1년</li>
                  </ul>
                </li>
              </ul>

              <h3 className="text-lg font-semibold mb-3 mt-4">2. 관련 법령에 의한 정보 보유</h3>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>계약 또는 청약철회 등에 관한 기록
                  <ul className="list-disc pl-6 mt-1">
                    <li>보존 이유: 전자상거래 등에서의 소비자보호에 관한 법률</li>
                    <li>보존 기간: 5년</li>
                  </ul>
                </li>
                <li>대금결제 및 재화 등의 공급에 관한 기록
                  <ul className="list-disc pl-6 mt-1">
                    <li>보존 이유: 전자상거래 등에서의 소비자보호에 관한 법률</li>
                    <li>보존 기간: 5년</li>
                  </ul>
                </li>
                <li>소비자의 불만 또는 분쟁처리에 관한 기록
                  <ul className="list-disc pl-6 mt-1">
                    <li>보존 이유: 전자상거래 등에서의 소비자보호에 관한 법률</li>
                    <li>보존 기간: 3년</li>
                  </ul>
                </li>
                <li>접속에 관한 기록
                  <ul className="list-disc pl-6 mt-1">
                    <li>보존 이유: 통신비밀보호법</li>
                    <li>보존 기간: 3개월</li>
                  </ul>
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">제4조 (개인정보의 파기절차 및 방법)</h2>
              <h3 className="text-lg font-semibold mb-3">1. 파기절차</h3>
              <p className="text-muted-foreground mb-4">
                이용자가 입력한 정보는 목적 달성 후 별도의 DB에 옮겨져 내부 방침 및 기타 관련 법령에 따라 
                일정기간 저장된 후 혹은 즉시 파기됩니다.
              </p>

              <h3 className="text-lg font-semibold mb-3">2. 파기방법</h3>
              <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                <li>전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용합니다.</li>
                <li>종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여 파기합니다.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">제5조 (개인정보의 제3자 제공)</h2>
              <p className="text-muted-foreground mb-4">
                회사는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다. 다만, 아래의 경우에는 예외로 합니다.
              </p>
              <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                <li>이용자들이 사전에 동의한 경우</li>
                <li>법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">제6조 (개인정보의 위탁)</h2>
              <p className="text-muted-foreground">
                회사는 현재 개인정보 처리를 위탁하고 있지 않습니다. 
                향후 위탁 계약 체결 시 개인정보 보호법에 따라 위탁계약 시 개인정보가 안전하게 관리될 수 있도록 
                필요한 사항을 규정하고, 이를 공지사항을 통해 고지하겠습니다.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">제7조 (이용자 및 법정대리인의 권리와 행사방법)</h2>
              <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
                <li>이용자는 언제든지 등록되어 있는 자신의 개인정보를 조회하거나 수정할 수 있으며, 가입해지를 요청할 수 있습니다.</li>
                <li>이용자의 개인정보 조회, 수정을 위해서는 &apos;개인정보변경&apos;을, 가입해지(동의철회)를 위해서는 &quot;회원탈퇴&quot;를 클릭하여 
                본인 확인 절차를 거치신 후 직접 열람, 정정 또는 탈퇴가 가능합니다.</li>
                <li>혹은 개인정보보호책임자에게 서면, 전화 또는 이메일로 연락하시면 지체없이 조치하겠습니다.</li>
                <li>이용자가 개인정보의 오류에 대한 정정을 요청하신 경우에는 정정을 완료하기 전까지 당해 개인정보를 이용 또는 제공하지 않습니다.</li>
                <li>만 14세 미만 아동의 경우 법정대리인이 아동의 개인정보를 조회하거나 수정, 동의철회를 할 수 있습니다.</li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">제8조 (개인정보의 안전성 확보 조치)</h2>
              <p className="text-muted-foreground mb-4">
                회사는 개인정보보호법 제29조에 따라 다음과 같이 안전성 확보에 필요한 기술적, 관리적, 물리적 조치를 하고 있습니다.
              </p>
              <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
                <li><strong>개인정보 취급 직원의 최소화 및 교육</strong><br />
                개인정보를 취급하는 직원을 지정하고 담당자에 한정시켜 최소화하여 개인정보를 관리하는 대책을 시행하고 있습니다.</li>
                
                <li><strong>내부관리계획의 수립 및 시행</strong><br />
                개인정보의 안전한 처리를 위하여 내부관리계획을 수립하고 시행하고 있습니다.</li>
                
                <li><strong>개인정보의 암호화</strong><br />
                이용자의 비밀번호는 암호화되어 저장 및 관리되고 있으며, 중요한 데이터는 파일 및 전송 데이터를 암호화하는 등의 별도 보안기능을 사용하고 있습니다.</li>
                
                <li><strong>해킹 등에 대비한 기술적 대책</strong><br />
                해킹이나 컴퓨터 바이러스 등에 의한 개인정보 유출 및 훼손을 막기 위하여 보안프로그램을 설치하고 주기적인 갱신·점검을 하고 있습니다.</li>
                
                <li><strong>개인정보에 대한 접근 제한</strong><br />
                개인정보를 처리하는 데이터베이스시스템에 대한 접근권한의 부여, 변경, 말소를 통하여 개인정보에 대한 접근통제를 위하여 필요한 조치를 하고 있습니다.</li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">제9조 (개인정보 자동 수집 장치의 설치·운영 및 거부에 관한 사항)</h2>
              <p className="text-muted-foreground mb-4">
                회사는 이용자에게 개별적인 맞춤서비스를 제공하기 위해 이용정보를 저장하고 수시로 불러오는 &apos;쿠키(cookie)&apos;를 사용합니다.
              </p>
              
              <h3 className="text-lg font-semibold mb-3">1. 쿠키의 사용 목적</h3>
              <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                <li>이용자가 방문한 각 서비스와 웹 사이트들에 대한 방문 및 이용형태, 인기 검색어, 보안접속 여부 등을 파악하여 
                이용자에게 최적화된 정보 제공을 위해 사용됩니다.</li>
              </ul>

              <h3 className="text-lg font-semibold mb-3 mt-4">2. 쿠키의 설치·운영 및 거부</h3>
              <p className="text-muted-foreground">
                웹브라우저 상단의 도구 &gt; 인터넷 옵션 &gt; 개인정보 메뉴의 옵션 설정을 통해 쿠키 저장을 거부할 수 있습니다.
                단, 쿠키 저장을 거부할 경우 맞춤형 서비스 이용에 어려움이 발생할 수 있습니다.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">제10조 (개인정보보호책임자)</h2>
              <p className="text-muted-foreground mb-4">
                회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 이용자의 불만처리 및 피해구제 등을 위하여 
                아래와 같이 개인정보보호책임자를 지정하고 있습니다.
              </p>
              
              <Card className="bg-secondary/30">
                <CardContent className="py-6">
                  <h3 className="font-semibold mb-4">개인정보보호책임자</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">성명:</span>
                      <span className="text-muted-foreground">드림캐쳐 개인정보보호팀</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-primary" />
                      <a href="mailto:dream24culture@outlook.kr" className="text-primary hover:underline">
                        dream24culture@outlook.kr
                      </a>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-4">
                    * 정식 서비스 출시 시 구체적인 담당자 정보를 공개할 예정입니다.
                  </p>
                </CardContent>
              </Card>

              <p className="text-muted-foreground mt-4">
                이용자는 회사의 서비스를 이용하시면서 발생한 모든 개인정보보호 관련 문의, 불만처리, 피해구제 등에 관한 사항을 
                개인정보보호책임자에게 문의하실 수 있습니다. 회사는 이용자의 문의에 대해 지체 없이 답변 및 처리해드릴 것입니다.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">제11조 (개인정보 열람청구)</h2>
              <p className="text-muted-foreground mb-4">
                이용자는 개인정보 보호법 제35조에 따른 개인정보의 열람 청구를 아래의 부서에 할 수 있습니다.
              </p>
              <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                <li>개인정보 열람청구 접수·처리 부서: 드림캐쳐 개인정보보호팀</li>
                <li>이메일: dream24culture@outlook.kr</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">제12조 (권익침해 구제방법)</h2>
              <p className="text-muted-foreground mb-4">
                이용자는 아래의 기관에 대해 개인정보 침해에 대한 피해구제, 상담 등을 문의하실 수 있습니다.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>개인정보침해신고센터 (한국인터넷진흥원 운영)
                  <ul className="list-disc pl-6 mt-1">
                    <li>소관업무: 개인정보 침해사실 신고, 상담 신청</li>
                    <li>홈페이지: privacy.kisa.or.kr</li>
                    <li>전화: (국번없이) 118</li>
                  </ul>
                </li>
                <li>개인정보분쟁조정위원회
                  <ul className="list-disc pl-6 mt-1">
                    <li>소관업무: 개인정보 분쟁조정신청, 집단분쟁조정</li>
                    <li>홈페이지: www.kopico.go.kr</li>
                    <li>전화: (국번없이) 1833-6972</li>
                  </ul>
                </li>
                <li>대검찰청 사이버범죄수사단: 02-3480-3573 (www.spo.go.kr)</li>
                <li>경찰청 사이버안전국: (국번없이) 182 (cyberbureau.police.go.kr)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">제13조 (개인정보 처리방침 변경)</h2>
              <p className="text-muted-foreground">
                이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 
                변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.
              </p>
            </section>

            <section className="mb-8 border-t pt-8">
              <h2 className="text-xl font-bold mb-4">부칙</h2>
              <p className="text-muted-foreground">
                이 개인정보 처리방침은 2024년 12월 1일부터 시행됩니다.
              </p>
            </section>

            <Card className="mt-8 bg-secondary/30">
              <CardContent className="py-6">
                <div className="text-center space-y-2">
                  <p className="font-semibold">개인정보 관련 문의사항</p>
                  <a 
                    href="mailto:dream24culture@outlook.kr"
                    className="flex items-center justify-center gap-2 text-primary hover:underline"
                  >
                    <Mail className="h-4 w-4" />
                    dream24culture@outlook.kr
                  </a>
                  <p className="text-xs text-muted-foreground mt-2">
                    개인정보 처리에 관한 문의사항은 위 이메일로 연락 주시기 바랍니다.
                  </p>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}