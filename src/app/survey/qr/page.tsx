'use client';

import { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Smartphone, QrCode, ExternalLink, Download, 
  ClipboardList, ArrowRight, Share2, Printer 
} from 'lucide-react';
import Link from 'next/link';

export default function SurveyQRPage() {
  const [surveyUrl, setSurveyUrl] = useState('');

  useEffect(() => {
    // 현재 도메인 기반으로 URL 생성
    const baseUrl = window.location.origin;
    setSurveyUrl(`${baseUrl}/survey`);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const svg = document.getElementById('survey-qr-code');
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        // QR 코드에 여백 추가
        const padding = 40;
        canvas.width = img.width + padding * 2;
        canvas.height = img.height + padding * 2;
        
        // 흰색 배경
        if (ctx) {
          ctx.fillStyle = 'white';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, padding, padding);
        }
        
        const pngFile = canvas.toDataURL('image/png');
        
        const downloadLink = document.createElement('a');
        downloadLink.download = 'dreamcatcher-survey-qr.png';
        downloadLink.href = pngFile;
        downloadLink.click();
      };
      
      img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background">
      {/* Simple Navigation */}
      <div className="absolute top-4 left-4 print:hidden">
        <Link href="/">
          <Button variant="ghost" size="sm" className="inline-flex items-center">
            <ArrowLeft className="w-4 h-4 mr-2" />
            홈으로
          </Button>
        </Link>
      </div>

      {/* Header */}
      <section className="py-8 md:py-12 border-b">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="text-center">
            <Badge className="mb-4" variant="secondary">
              <QrCode className="w-3 h-3 mr-1" />
              QR 코드
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              체험 프로그램 만족도 조사
            </h1>
            <p className="text-lg text-muted-foreground">
              QR 코드를 스캔하여 설문조사에 참여해주세요
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {/* QR Code Card */}
            <Card className="print:border-2 print:border-black">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">설문조사 QR 코드</CardTitle>
                <CardDescription>
                  스마트폰 카메라로 스캔하세요
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center space-y-6">
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  {surveyUrl && (
                    <QRCodeSVG
                      id="survey-qr-code"
                      value={surveyUrl}
                      size={256}
                      level="M"
                      includeMargin={false}
                      imageSettings={{
                        src: "",
                        x: undefined,
                        y: undefined,
                        height: 0,
                        width: 0,
                        excavate: false,
                      }}
                    />
                  )}
                </div>
                
                <div className="text-center space-y-2">
                  <p className="text-sm text-muted-foreground">
                    또는 아래 링크로 직접 접속
                  </p>
                  <div className="flex items-center gap-2 justify-center">
                    <code className="px-3 py-1 bg-secondary rounded text-sm">
                      {surveyUrl || 'Loading...'}
                    </code>
                  </div>
                </div>

                {/* Action Buttons - Hidden in print */}
                <div className="flex gap-2 print:hidden">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDownload}
                    className="inline-flex items-center"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    다운로드
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePrint}
                    className="inline-flex items-center"
                  >
                    <Printer className="w-4 h-4 mr-2" />
                    인쇄
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Information Card */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ClipboardList className="w-5 h-5 text-primary" />
                    설문조사 안내
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-sm font-semibold text-primary">1</span>
                      </div>
                      <div>
                        <p className="font-medium">QR 코드 스캔</p>
                        <p className="text-sm text-muted-foreground">
                          스마트폰 카메라로 QR 코드를 스캔하세요
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-sm font-semibold text-primary">2</span>
                      </div>
                      <div>
                        <p className="font-medium">설문 작성</p>
                        <p className="text-sm text-muted-foreground">
                          프로그램 만족도와 피드백을 작성해주세요
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-sm font-semibold text-primary">3</span>
                      </div>
                      <div>
                        <p className="font-medium">추첨 이벤트</p>
                        <p className="text-sm text-muted-foreground">
                          참여자 중 추첨을 통해 기프티콘을 드립니다
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-accent/30 bg-gradient-to-br from-accent/5 to-background">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Smartphone className="w-5 h-5 text-accent" />
                    모바일 최적화
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    설문조사 페이지는 모바일 환경에 최적화되어 있어 
                    스마트폰에서 편리하게 작성하실 수 있습니다.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      익명으로 진행됩니다
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      소요시간: 약 3-5분
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      피드백은 선택사항입니다
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <div className="flex gap-3 print:hidden">
                <Link href="/survey" className="flex-1">
                  <Button className="w-full inline-flex items-center justify-center">
                    직접 설문 참여
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="inline-flex items-center"
                  onClick={() => {
                    navigator.share?.({
                      title: '드림캐쳐 설문조사',
                      text: '체험 프로그램 만족도 조사에 참여해주세요',
                      url: surveyUrl
                    });
                  }}
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Print Styles - QR 코드만 인쇄 */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #survey-qr-code, #survey-qr-code * {
            visibility: visible;
          }
          #survey-qr-code {
            position: fixed;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
          }
          @page {
            size: A4;
            margin: 0;
          }
          body {
            background: white !important;
          }
        }
      `}</style>
    </div>
  );
}

// Add missing imports
import { CheckCircle2, ArrowLeft } from 'lucide-react';