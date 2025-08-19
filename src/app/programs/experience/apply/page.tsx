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

// ?„ë¡œê·¸ë¨ ?•ë³´
const programInfo: Record<string, any> = {
  'perfume': {
    title: '?˜ë§Œ???¥ìˆ˜ ë§Œë“¤ê¸?,
    icon: Heart,
    price: '10,000??,
    duration: '2?œê°„',
    location: 'ë¯¸ì •',
    locationNote: '(?€????ë³„ë„ ê³µì?)',
    description: '30ê°€ì§€ ?¥ë£Œë¥?ë¸”ë Œ?©í•˜???˜ë§Œ???œê·¸?ˆì²˜ ?¥ìˆ˜ë¥?ë§Œë“¤?´ë³´?¸ìš”.',
    materials: 'ëª¨ë“  ?¬ë£Œ ?œê³µ',
    maxParticipants: 12
  },
  'baking': {
    title: '?ˆë² ?´í‚¹ ?´ë˜??,
    icon: Coffee,
    price: '8,000??,
    duration: '3?œê°„',
    location: 'ë¯¸ì •',
    locationNote: '(?€????ë³„ë„ ê³µì?)',
    description: 'ë§ˆë“¤?? ì¿ í‚¤, ë¸Œë¼?°ë‹ˆ ???¬ì½¤???”ì??¸ë? ì§ì ‘ ë§Œë“¤?´ë³´?¸ìš”.',
    materials: 'ëª¨ë“  ?¬ë£Œ ë°??¬ì¥ ë°•ìŠ¤ ?œê³µ',
    maxParticipants: 10
  },
  'personal-color': {
    title: '?¼ìŠ¤?ì»¬??ì§„ë‹¨',
    icon: Palette,
    price: '5,000??,
    duration: '1?œê°„ 30ë¶?,
    location: 'ë¯¸ì •',
    locationNote: '(?€????ë³„ë„ ê³µì?)',
    description: '?„ë¬¸ê°€?€ ?¨ê»˜ ?˜ì—ê²??´ìš¸ë¦¬ëŠ” ì»¬ëŸ¬ë¥?ì°¾ì•„ë³´ì„¸??',
    materials: 'ì»¬ëŸ¬ ì§„ë‹¨ ì°¨íŠ¸ ?œê³µ',
    maxParticipants: 8
  },
  'board-game': {
    title: 'ë³´ë“œê²Œì„ ëª¨ì„',
    icon: Gamepad2,
    price: 'ë¬´ë£Œ',
    duration: '3?œê°„',
    location: 'ë¯¸ì •',
    locationNote: '(?€????ë³„ë„ ê³µì?)',
    description: '?¤ì–‘??ë³´ë“œê²Œì„??ì¦ê¸°ë©??ˆë¡œ??ì¹œêµ¬?¤ì„ ë§Œë‚˜ë³´ì„¸??',
    materials: 'ê°„ì‹ ?œê³µ',
    maxParticipants: 20
  },
  'calligraphy': {
    title: 'ìº˜ë¦¬ê·¸ë˜???´ë˜??,
    icon: PenTool,
    price: '7,000??,
    duration: '2?œê°„',
    location: 'ë¯¸ì •',
    locationNote: '(?€????ë³„ë„ ê³µì?)',
    description: 'ë¶“íœ?¼ë¡œ ?„ë¦„?¤ìš´ ?œê? ìº˜ë¦¬ê·¸ë˜?¼ë? ë°°ì›Œë³´ì„¸??',
    materials: 'ë¶“íœ ë°??°ìŠµì§€ ?œê³µ',
    maxParticipants: 10
  },
  'photo': {
    title: '?¤ë§ˆ?¸í° ?¬ì§„ ?´ë˜??,
    icon: Camera,
    price: 'ë¬´ë£Œ',
    duration: '2?œê°„',
    location: 'ë¯¸ì •',
    locationNote: '(?€????ë³„ë„ ê³µì?)',
    description: '?¤ë§ˆ?¸í°?¼ë¡œ ?„ë¬¸ê°€ì²˜ëŸ¼ ?¬ì§„ ì°ëŠ” ë°©ë²•??ë°°ì›Œë³´ì„¸??',
    materials: 'ì´¬ì˜ ???ë£Œ ?œê³µ',
    maxParticipants: 15
  },
  'humanities': {
    title: '?™ë„¤?ì„œ ?¸ë¬¸?? (?˜ì£¼??',
    icon: BookOpen,
    price: '?ˆì¹˜ê¸?30,000??,
    priceNote: '(?˜ë£Œ ???˜ê¸‰)',
    duration: 'ê¸°ìˆ˜ë³??ì´ (ì£?1??',
    location: 'ë¯¸ì •',
    locationNote: '(?€????ë³„ë„ ê³µì?)',
    description: 'ë§¤ë²ˆ ?¤ë¥¸ ì£¼ì œë¡?ì§„í–‰?˜ëŠ” ì²?…„ ?¸ë¬¸???¤í„°?”ì…?ˆë‹¤. ì² í•™, ??‚¬, ë¬¸í•™, ?ˆìˆ  ???¤ì–‘??ì£¼ì œë¡??¨ê»˜ ?ê°?˜ê³  ? ë¡ ?©ë‹ˆ?? ?œí¬?°ì¦ˆ?€ ?¼ì •??ì¡°ìœ¨?˜ì—¬ ì§„í–‰?©ë‹ˆ??',
    materials: '?„ì„œ ë°??ë£Œ ?œê³µ',
    maxParticipants: 15,
    special: '?ˆì¹˜ê¸??œë„: ê³¼ì •??100% ì°¸ì—¬?˜ì‹œë©??ˆì¹˜ê¸??„ì•¡ ?˜ê¸‰'
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
    depositAgreement: false // ?¸ë¬¸???„ë¡œê·¸ë¨??  });

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
      alert('?ˆì¹˜ê¸??•ì±…???™ì˜?´ì£¼?¸ìš”.');
      return;
    }
    
    // Validate required fields
    if (!formData.name || !formData.phone || !formData.age || !formData.location || 
        !formData.preferredDate || !formData.preferredTime || !formData.agreement) {
      alert('?„ìˆ˜ ??ª©??ëª¨ë‘ ?…ë ¥?´ì£¼?¸ìš”.');
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
        alert('? ì²­???„ë£Œ?˜ì—ˆ?µë‹ˆ?? ?•ì¸ ???°ë½?œë¦¬ê² ìŠµ?ˆë‹¤.');
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
        alert('? ì²­ ì²˜ë¦¬ ì¤??¤ë¥˜ê°€ ë°œìƒ?ˆìŠµ?ˆë‹¤. ?¤ì‹œ ?œë„?´ì£¼?¸ìš”.');
      }
    } catch (error) {
      
      alert('? ì²­ ì²˜ë¦¬ ì¤??¤ë¥˜ê°€ ë°œìƒ?ˆìŠµ?ˆë‹¤. ?¤ì‹œ ?œë„?´ì£¼?¸ìš”.');
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
              ì²´í—˜ ?„ë¡œê·¸ë¨ ? ì²­
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              ?œë¦¼ìºì³?€ ?¨ê»˜ ?¹ë³„??ê²½í—˜??ë§Œë“¤?´ë³´?¸ìš”
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
                    <p className="text-xs text-muted-foreground">ì°¸ê?ë¹?/p>
                    <p className="font-semibold">{program.price}</p>
                    {program.priceNote && (
                      <p className="text-xs text-muted-foreground">{program.priceNote}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">?Œìš”?œê°„</p>
                    <p className="font-semibold">{program.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">?¥ì†Œ</p>
                    <p className="font-semibold">{program.location}</p>
                    {program.locationNote && (
                      <p className="text-xs text-muted-foreground">{program.locationNote}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">?•ì›</p>
                    <p className="font-semibold">ìµœë? {program.maxParticipants}ëª?/p>
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
                  <strong>?¬í•¨?¬í•­:</strong> {program.materials}
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
              <CardTitle>ì°¸ê? ? ì²­??/CardTitle>
              <CardDescription>
                ?„ë˜ ?•ë³´ë¥??…ë ¥?´ì£¼?œë©´ ?•ì¸ ???°ë½?œë¦¬ê² ìŠµ?ˆë‹¤.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">?´ë¦„ *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">?°ë½ì²?*</Label>
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
                    <Label htmlFor="age">?°ë ¹?€ *</Label>
                    <select
                      id="age"
                      className="w-full px-3 py-2 border rounded-md"
                      value={formData.age}
                      onChange={(e) => handleInputChange('age', e.target.value)}
                      required
                    >
                      <option value="">? íƒ?´ì£¼?¸ìš”</option>
                      <option value="20s">20?€</option>
                      <option value="30s">30?€</option>
                      <option value="40s">40?€</option>
                      <option value="50s">50?€ ?´ìƒ</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">ê±°ì£¼ ì§€??*</Label>
                    <select
                      id="location"
                      className="w-full px-3 py-2 border rounded-md"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      required
                    >
                      <option value="">? íƒ?´ì£¼?¸ìš”</option>
                      <option value="yeosu">?¬ìˆ˜</option>
                      <option value="mokpo">ëª©í¬</option>
                      <option value="hwasun">?”ìˆœ</option>
                      <option value="naju">?˜ì£¼</option>
                      <option value="other">ê¸°í?</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="preferredDate">?¬ë§ ? ì§œ *</Label>
                    <Input
                      id="preferredDate"
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>?¬ë§ ?œê°„?€ *</Label>
                    <RadioGroup
                      value={formData.preferredTime}
                      onValueChange={(value) => handleInputChange('preferredTime', value)}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="morning" id="morning" />
                        <Label htmlFor="morning">?¤ì „ (10:00-12:00)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="afternoon" id="afternoon" />
                        <Label htmlFor="afternoon">?¤í›„ (14:00-17:00)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="evening" id="evening" />
                        <Label htmlFor="evening">?€??(18:00-20:00)</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">ì¶”ê? ë©”ì‹œì§€</Label>
                  <Textarea
                    id="message"
                    rows={4}
                    placeholder="?Œë ˆë¥´ê¸°, ?¹ì´?¬í•­ ?±ì„ ?Œë ¤ì£¼ì„¸??
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                  />
                </div>

                {programType === 'humanities' && (
                  <Alert className="bg-primary/5">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>?ˆì¹˜ê¸??ˆë‚´</strong><br/>
                      ???ˆì¹˜ê¸?30,000?ì? ?„ë¡œê·¸ë¨ ?œì‘ ???…ê¸ˆ?´ì£¼?”ì•¼ ?©ë‹ˆ??<br/>
                      ???„ì²´ ê³¼ì •??100% ì¶œì„?˜ì‹œë©??„ì•¡ ?˜ê¸‰?©ë‹ˆ??<br/>
                      ??ì¤‘ë„ ?¬ê¸° ???ˆì¹˜ê¸ˆì? ?˜ê¸‰?˜ì? ?ŠìŠµ?ˆë‹¤.<br/>
                      ???œí¬?°ì¦ˆ?€ ?¼ì •??ì¡°ìœ¨?˜ì—¬ 1:1 ?ëŠ” ?Œê·¸ë£¹ìœ¼ë¡?ì§„í–‰?©ë‹ˆ??<br/>
                      ???ˆì¹˜ê¸ˆì? ???˜ì? ?™ìŠµ ?˜ê²½ê³?ì°¸ì—¬?ë“¤??ì±…ì„ê°??ˆëŠ” ì°¸ì—¬ë¥??„í•œ ?œë„?…ë‹ˆ??
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
                      ê°œì¸?•ë³´ ?˜ì§‘ ë°??´ìš©???™ì˜?©ë‹ˆ??*
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
                        ?ˆì¹˜ê¸??•ì±…???´í•´?˜ê³  ?™ì˜?©ë‹ˆ??*
                      </Label>
                    </div>
                  )}
                </div>

                <Button type="submit" size="lg" className="w-full">
                  ? ì²­?˜ê¸°
                </Button>
              </form>
            </CardContent>
          </Card>

          <Alert className="mt-6">
            <Info className="h-4 w-4" />
            <AlertDescription>
              ??ë¬¸ì˜?¬í•­?€ dream24culture@outlook.krë¡??°ë½ì£¼ì„¸??
            </AlertDescription>
          </Alert>
        </div>
      </section>
    </div>
  );
}
