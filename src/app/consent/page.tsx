'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { 
  Camera, Shield, Users, MessageSquare, 
  CheckCircle, AlertCircle, PenTool, RefreshCw,
  FileText
} from 'lucide-react';

export default function ConsentPage() {
  const [formData, setFormData] = useState({
    photoConsent: '',
    howDidYouKnow: '',
    feedbackConsent: false,
    name: ''
  });
  const [signature, setSignature] = useState('');
  const [isDrawing, setIsDrawing] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 캔버스 초기화
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
  }, []);

  const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if ('touches' in e) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY
      };
    } else {
      return {
        x: (e.nativeEvent.clientX - rect.left) * scaleX,
        y: (e.nativeEvent.clientY - rect.top) * scaleY
      };
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      // 서명 데이터 저장
      const canvas = canvasRef.current;
      if (canvas) {
        setSignature(canvas.toDataURL());
      }
    }
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setSignature('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 여기서는 실제로 데이터를 저장하지 않고 제출 완료 화면만 보여줍니다
    console.log('동의서 제출:', {
      ...formData,
      signature: signature ? 'signed' : 'not signed',
      submittedAt: new Date().toISOString()
    });
    
    setSubmitted(true);
  };

  const isFormValid = formData.photoConsent && formData.howDidYouKnow && 
                     formData.feedbackConsent && formData.name && signature;

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary/5 to-white p-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2">동의서 작성 완료!</h2>
            <p className="text-muted-foreground mb-4">
              소중한 동의 감사드립니다.<br />
              즐거운 체험 되세요!
            </p>
            <Button 
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  photoConsent: '',
                  howDidYouKnow: '',
                  feedbackConsent: false,
                  name: ''
                });
                clearSignature();
              }}
              className="mt-4"
            >
              새로운 동의서 작성
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-white py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full mb-4">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2">체험 프로그램 참여 동의서</h1>
          <p className="text-lg text-muted-foreground">
            드림캐쳐 프로그램 참여를 위한 동의서입니다
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <Card className="border-2 border-primary/20">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5">
              <CardTitle>참여자 정보 및 동의 사항</CardTitle>
              <CardDescription>
                아래 내용을 확인하시고 동의해주세요
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              
              {/* 초상권 동의 */}
              <div>
                <Label className="text-base font-semibold mb-3 flex items-center gap-2">
                  <Camera className="w-5 h-5 text-primary" />
                  사진 촬영 및 초상권 사용 동의
                </Label>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-3">
                  <p className="text-sm text-amber-800">
                    ⚠️ <strong>필수 안내:</strong>
                  </p>
                  <p className="text-sm text-amber-800 mt-1">
                    할인 혜택을 받으시는 체험 프로그램이므로,<br />
                    회사 보고용 자료 제출을 위해 <strong>최소한 뒷모습 촬영은 필수</strong>입니다.
                  </p>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  2026년 3월 정식 서비스 론칭 시 홍보 자료로 사용될 수 있습니다.
                </p>
                <RadioGroup 
                  value={formData.photoConsent}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, photoConsent: value }))}
                >
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-gray-50">
                      <RadioGroupItem value="yes" id="photo-yes" />
                      <label htmlFor="photo-yes" className="flex-1 cursor-pointer">
                        <span className="font-medium">정면 촬영 동의</span>
                        <p className="text-xs text-muted-foreground">얼굴 포함 사진 촬영 및 홍보 자료 사용에 동의</p>
                      </label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-gray-50">
                      <RadioGroupItem value="mosaic" id="photo-mosaic" />
                      <label htmlFor="photo-mosaic" className="flex-1 cursor-pointer">
                        <span className="font-medium">정면 촬영 (모자이크 처리)</span>
                        <p className="text-xs text-muted-foreground">얼굴을 모자이크 처리 후 사용</p>
                      </label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-gray-50">
                      <RadioGroupItem value="back" id="photo-back" />
                      <label htmlFor="photo-back" className="flex-1 cursor-pointer">
                        <span className="font-medium">뒷모습만 촬영 동의 (최소 필수)</span>
                        <p className="text-xs text-muted-foreground">얼굴이 나오지 않는 뒷모습만 촬영</p>
                      </label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              {/* 방문 경로 */}
              <div>
                <Label className="text-base font-semibold mb-3 flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  어떻게 알고 방문하셨나요?
                </Label>
                <RadioGroup 
                  value={formData.howDidYouKnow}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, howDidYouKnow: value }))}
                >
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-gray-50">
                      <RadioGroupItem value="street" id="know-street" />
                      <label htmlFor="know-street" className="cursor-pointer text-sm">
                        길거리 홍보
                      </label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-gray-50">
                      <RadioGroupItem value="sns" id="know-sns" />
                      <label htmlFor="know-sns" className="cursor-pointer text-sm">
                        SNS/인터넷
                      </label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-gray-50">
                      <RadioGroupItem value="friend" id="know-friend" />
                      <label htmlFor="know-friend" className="cursor-pointer text-sm">
                        지인 추천
                      </label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-gray-50">
                      <RadioGroupItem value="etc" id="know-etc" />
                      <label htmlFor="know-etc" className="cursor-pointer text-sm">
                        기타
                      </label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              {/* 피드백 동의 */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <Label className="text-base font-semibold mb-3 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  프로그램 피드백 제공 동의
                </Label>
                <p className="text-sm text-muted-foreground mb-3">
                  체험 후 프로그램 개선을 위한 솔직한 피드백을 제공해주시겠습니까?
                </p>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="feedback"
                    checked={formData.feedbackConsent}
                    onChange={(e) => setFormData(prev => ({ ...prev, feedbackConsent: e.target.checked }))}
                    className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <label htmlFor="feedback" className="text-sm font-medium cursor-pointer">
                    네, 체험 후 솔직한 피드백을 제공하겠습니다
                  </label>
                </div>
              </div>

              {/* 이름 입력 */}
              <div>
                <Label htmlFor="name" className="text-base font-semibold mb-2">
                  참여자 성함
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="홍길동"
                  className="mt-1"
                  required
                />
              </div>

              {/* 서명 */}
              <div>
                <Label className="text-base font-semibold mb-3 flex items-center gap-2">
                  <PenTool className="w-5 h-5 text-primary" />
                  서명
                </Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-2 bg-white">
                  <canvas
                    ref={canvasRef}
                    width={600}
                    height={200}
                    className="w-full max-w-full border border-gray-200 rounded cursor-crosshair touch-none"
                    style={{ touchAction: 'none' }}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={clearSignature}
                    className="mt-2"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    서명 다시하기
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  위 공간에 손가락이나 마우스로 서명해주세요
                </p>
              </div>

              {/* 안내 메시지 */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex gap-2">
                  <AlertCircle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-yellow-900">개인정보 보호 안내</p>
                    <p className="text-xs text-yellow-700">
                      작성하신 동의서는 프로그램 운영 목적으로만 사용되며,
                      관련 법령에 따라 안전하게 관리됩니다.
                    </p>
                  </div>
                </div>
              </div>

              {/* 제출 버튼 */}
              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={!isFormValid}
              >
                동의서 제출하기
              </Button>
            </CardContent>
          </Card>
        </form>

        {/* 하단 안내 */}
        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>문의: 드림캐쳐 나주 서포터즈</p>
        </div>
      </div>
    </div>
  );
}