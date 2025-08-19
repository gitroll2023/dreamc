'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Sparkles, Calendar, MapPin, Users, Clock, DollarSign, 
  AlertCircle, CheckCircle, Info, BookOpen, Coffee, Palette,
  Gamepad2, PenTool, Camera, Heart
} from 'lucide-react';

// ?�로그램 ?�보
const programInfo: Record<string, any> = {
  'perfume': {
    title: '?�만???�수 만들�?,
    icon: Heart,
    price: '10,000??,
    duration: '2?�간',
    location: '미정',
    locationNote: '(?�????별도 공�?)',
    description: '30가지 ?�료�?블렌?�하???�만???�그?�처 ?�수�?만들?�보?�요.',
    materials: '모든 ?�료 ?�공',
    maxParticipants: 12
  },
  'baking': {
    title: '?�베?�킹 ?�래??,
    icon: Coffee,
    price: '8,000??,
    duration: '3?�간',
    location: '미정',
    locationNote: '(?�????별도 공�?)',
    description: '마들?? 쿠키, 브라?�니 ???�콤???��??��? 직접 만들?�보?�요.',
    materials: '모든 ?�료 �??�장 박스 ?�공',
    maxParticipants: 10
  },
  'personal-color': {
    title: '?�스?�컬??진단',
    icon: Palette,
    price: '5,000??,
    duration: '1?�간 30�?,
    location: '미정',
    locationNote: '(?�????별도 공�?)',
    description: '?�문가?� ?�께 ?�에�??�울리는 컬러�?찾아보세??',
    materials: '컬러 진단 차트 ?�공',
    maxParticipants: 8
  },
  'board-game': {
    title: '보드게임 모임',
    icon: Gamepad2,
    price: '무료',
    duration: '3?�간',
    location: '미정',
    locationNote: '(?�????별도 공�?)',
    description: '?�양??보드게임??즐기�??�로??친구?�을 만나보세??',
    materials: '간식 ?�공',
    maxParticipants: 20
  },
  'calligraphy': {
    title: '캘리그래???�래??,
    icon: PenTool,
    price: '7,000??,
    duration: '2?�간',
    location: '미정',
    locationNote: '(?�????별도 공�?)',
    description: '붓펜?�로 ?�름?�운 ?��? 캘리그래?��? 배워보세??',
    materials: '붓펜 �??�습지 ?�공',
    maxParticipants: 10
  },
  'photo': {
    title: '?�마?�폰 ?�진 ?�래??,
    icon: Camera,
    price: '무료',
    duration: '2?�간',
    location: '미정',
    locationNote: '(?�????별도 공�?)',
    description: '?�마?�폰?�로 ?�문가처럼 ?�진 찍는 방법??배워보세??',
    materials: '촬영 ???�료 ?�공',
    maxParticipants: 15
  },
  'humanities': {
    title: '?�네?�서 ?�문?? (?�주??',
    icon: BookOpen,
    price: '?�치�?30,000??,
    priceNote: '(?�료 ???�급)',
    duration: '기수�??�이 (�?1??',
    location: '미정',
    locationNote: '(?�????별도 공�?)',
    description: '매번 ?�른 주제�?진행?�는 �?�� ?�문???�터?�입?�다. 철학, ??��, 문학, ?�술 ???�양??주제�??�께 ?�각?�고 ?�론?�니?? ?�포?�즈?� ?�정??조율?�여 진행?�니??',
    materials: '?�서 �??�료 ?�공',
    maxParticipants: 15,
    special: '?�치�??�도: 과정??100% 참여?�시�??�치�??�액 ?�급'
  }
};

export default function ExperienceApplyPage() {
  const searchParams = useSearchParams();
  const programType = searchParams.get('type') || 'perfume';
  const program = programInfo[programType] || programInfo['perfume'];
  const Icon = program.icon;

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    age: '',
    location: '',
    preferredDate: '',
    preferredTime: '',
    message: '',
    agreement: false,
    depositAgreement: false // ?�문???�로그램??  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, ''); // Remove non-digits
    
    // Ensure it starts with 010
    if (value.length > 0 && !value.startsWith('010')) {
      return;
    }
    
    // Limit to 11 digits
    if (value.length > 11) {
      return;
    }
    
    // Format with hyphens
    let formatted = value;
    if (value.length > 3 && value.length <= 7) {
      formatted = `${value.slice(0, 3)}-${value.slice(3)}`;
    } else if (value.length > 7) {
      formatted = `${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(7)}`;
    }
    
    setFormData(prev => ({ ...prev, phone: formatted }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (programType === 'humanities' && !formData.depositAgreement) {
      alert('?�치�??�책???�의?�주?�요.');
      return;
    }
    
    // Validate required fields
    if (!formData.name || !formData.phone || !formData.age || !formData.location || 
        !formData.preferredDate || !formData.preferredTime || !formData.agreement) {
      alert('?�수 ??��??모두 ?�력?�주?�요.');
      return;
    }
    
    try {
      const response = await fetch('/api/experience-applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          programType,
          programTitle: program.title,
          ...formData
        }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        alert('?�청???�료?�었?�니?? ?�인 ???�락?�리겠습?�다.');
        // Reset form
        setFormData({
          name: '',
          phone: '',
          age: '',
          location: '',
          preferredDate: '',
          preferredTime: '',
          message: '',
          agreement: false,
          depositAgreement: false
        });
      } else {
        alert('?�청 처리 �??�류가 발생?�습?�다. ?�시 ?�도?�주?�요.');
      }
    } catch (error) {
      
      alert('?�청 처리 �??�류가 발생?�습?�다. ?�시 ?�도?�주?�요.');
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-12 md:py-16 lg:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-background"></div>
        <div className="container relative z-10 max-w-4xl mx-auto px-4">
          <div className="text-center">
            <Badge className="mb-4 px-4 py-1" variant="secondary">
              <Sparkles className="w-3 h-3 mr-1" />
              Experience Program
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              체험 ?�로그램 ?�청
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              ?�림캐쳐?� ?�께 ?�별??경험??만들?�보?�요
            </p>
          </div>
        </div>
      </section>

      {/* Program Info */}
      <section className="py-8 -mt-8">
        <div className="container max-w-4xl mx-auto px-4">
          <Card className="border-2 border-primary/20">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">{program.title}</CardTitle>
                    <CardDescription className="mt-1">{program.description}</CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">참�?�?/p>
                    <p className="font-semibold">{program.price}</p>
                    {program.priceNote && (
                      <p className="text-xs text-muted-foreground">{program.priceNote}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">?�요?�간</p>
                    <p className="font-semibold">{program.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">?�소</p>
                    <p className="font-semibold">{program.location}</p>
                    {program.locationNote && (
                      <p className="text-xs text-muted-foreground">{program.locationNote}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">?�원</p>
                    <p className="font-semibold">최�? {program.maxParticipants}�?/p>
                  </div>
                </div>
              </div>

              {program.special && (
                <Alert className="mb-6">
                  <Info className="h-4 w-4" />
                  <AlertDescription className="font-semibold">
                    {program.special}
                  </AlertDescription>
                </Alert>
              )}

              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>?�함?�항:</strong> {program.materials}
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-12 md:py-16">
        <div className="container max-w-4xl mx-auto px-4">
          <Card>
            <CardHeader>
              <CardTitle>참�? ?�청??/CardTitle>
              <CardDescription>
                ?�래 ?�보�??�력?�주?�면 ?�인 ???�락?�리겠습?�다.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">?�름 *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">?�락�?*</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="010-0000-0000"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      maxLength={13}
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="age">?�령?� *</Label>
                    <select
                      id="age"
                      className="w-full px-3 py-2 border rounded-md"
                      value={formData.age}
                      onChange={(e) => handleInputChange('age', e.target.value)}
                      required
                    >
                      <option value="">?�택?�주?�요</option>
                      <option value="20s">20?�</option>
                      <option value="30s">30?�</option>
                      <option value="40s">40?�</option>
                      <option value="50s">50?� ?�상</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">거주 지??*</Label>
                    <select
                      id="location"
                      className="w-full px-3 py-2 border rounded-md"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      required
                    >
                      <option value="">?�택?�주?�요</option>
                      <option value="yeosu">?�수</option>
                      <option value="mokpo">목포</option>
                      <option value="hwasun">?�순</option>
                      <option value="naju">?�주</option>
                      <option value="other">기�?</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="preferredDate">?�망 ?�짜 *</Label>
                    <Input
                      id="preferredDate"
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>?�망 ?�간?� *</Label>
                    <RadioGroup
                      value={formData.preferredTime}
                      onValueChange={(value) => handleInputChange('preferredTime', value)}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="morning" id="morning" />
                        <Label htmlFor="morning">?�전 (10:00-12:00)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="afternoon" id="afternoon" />
                        <Label htmlFor="afternoon">?�후 (14:00-17:00)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="evening" id="evening" />
                        <Label htmlFor="evening">?�??(18:00-20:00)</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">추�? 메시지</Label>
                  <Textarea
                    id="message"
                    rows={4}
                    placeholder="?�레르기, ?�이?�항 ?�을 ?�려주세??
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                  />
                </div>

                {programType === 'humanities' && (
                  <Alert className="bg-primary/5">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>?�치�??�내</strong><br/>
                      ???�치�?30,000?��? ?�로그램 ?�작 ???�금?�주?�야 ?�니??<br/>
                      ???�체 과정??100% 출석?�시�??�액 ?�급?�니??<br/>
                      ??중도 ?�기 ???�치금�? ?�급?��? ?�습?�다.<br/>
                      ???�포?�즈?� ?�정??조율?�여 1:1 ?�는 ?�그룹으�?진행?�니??<br/>
                      ???�치금�? ???��? ?�습 ?�경�?참여?�들??책임�??�는 참여�??�한 ?�도?�니??
                    </AlertDescription>
                  </Alert>
                )}

                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <input
                      type="checkbox"
                      id="agreement"
                      className="mt-1"
                      checked={formData.agreement}
                      onChange={(e) => handleInputChange('agreement', e.target.checked)}
                      required
                    />
                    <Label htmlFor="agreement" className="text-sm">
                      개인?�보 ?�집 �??�용???�의?�니??*
                    </Label>
                  </div>

                  {programType === 'humanities' && (
                    <div className="flex items-start space-x-2">
                      <input
                        type="checkbox"
                        id="depositAgreement"
                        className="mt-1"
                        checked={formData.depositAgreement}
                        onChange={(e) => handleInputChange('depositAgreement', e.target.checked)}
                        required
                      />
                      <Label htmlFor="depositAgreement" className="text-sm">
                        ?�치�??�책???�해?�고 ?�의?�니??*
                      </Label>
                    </div>
                  )}
                </div>

                <Button type="submit" size="lg" className="w-full">
                  ?�청?�기
                </Button>
              </form>
            </CardContent>
          </Card>

          <Alert className="mt-6">
            <Info className="h-4 w-4" />
            <AlertDescription>
              ??문의?�항?� dream24culture@outlook.kr�??�락주세??
            </AlertDescription>
          </Alert>
        </div>
      </section>
    </div>
  );
}
