'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { 
  User, Mail, Phone, Calendar, MapPin, Users, 
  FileText, CheckCircle2, ArrowRight, ArrowLeft,
  AlertCircle, Sparkles, Shield, Clock
} from 'lucide-react';

export default function ApplyPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    // ê¸°ë³¸ ?•ë³´
    name: '',
    birthYear: '',
    gender: '',
    phone: '',
    email: '',
    
    // ì§€??ë°??¼ì •
    location: '',
    startMonth: '',
    attendanceType: '', // online or offline
    
    // ì¶”ê? ?•ë³´
    occupation: '',
    motivation: '',
    expectations: '',
    
    // ?™ì˜?¬í•­
    termsAgree: false,
    privacyAgree: false,
    marketingAgree: false,
  });

  const totalSteps = 4;

  const handleInputChange = (field: string, value: any) => {
    if (field === 'phone') {
      // Remove all non-numeric characters
      const numbersOnly = value.replace(/[^0-9]/g, '');
      
      // Limit to 11 digits
      const limited = numbersOnly.slice(0, 11);
      
      // Format with hyphens
      let formatted = limited;
      if (limited.length >= 4) {
        formatted = limited.slice(0, 3) + '-' + limited.slice(3);
      }
      if (limited.length >= 8) {
        formatted = limited.slice(0, 3) + '-' + limited.slice(3, 7) + '-' + limited.slice(7);
      }
      
      setFormData(prev => ({ ...prev, [field]: formatted }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setShowSuccessModal(true);
        setTimeout(() => {
          router.push('/programs/ai-bootcamp');
        }, 3000);
      } else {
        alert('? ì²­ ì²˜ë¦¬ ì¤??¤ë¥˜ê°€ ë°œìƒ?ˆìŠµ?ˆë‹¤. ?¤ì‹œ ?œë„?´ì£¼?¸ìš”.');
        setIsSubmitting(false);
      }
    } catch (error) {
      
      alert('? ì²­ ì²˜ë¦¬ ì¤??¤ë¥˜ê°€ ë°œìƒ?ˆìŠµ?ˆë‹¤. ?¤ì‹œ ?œë„?´ì£¼?¸ìš”.');
      setIsSubmitting(false);
    }
  };

  const isStepValid = () => {
    switch(step) {
      case 1:
        // Check if phone has exactly 11 digits and starts with 010
        const phoneDigits = formData.phone.replace(/-/g, '');
        const isPhoneValid = phoneDigits.length === 11 && phoneDigits.startsWith('010');
        return formData.name && formData.birthYear && formData.gender && isPhoneValid;
      case 2:
        return formData.location && formData.startMonth && formData.attendanceType;
      case 3:
        return formData.occupation && formData.motivation && formData.expectations;
      case 4:
        return formData.termsAgree && formData.privacyAgree;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background">
      {/* Header */}
      <section className="py-8 md:py-12 border-b">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="text-center">
            <Badge className="mb-4" variant="secondary">
              <Sparkles className="w-3 h-3 mr-1" />
              ?‘ë ¥ ?„ë¡œê·¸ë¨
            </Badge>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">?¸ë¬¸??ë¶€?¸ìº ??? ì²­</h1>
            <p className="text-sm text-muted-foreground mb-2">Application Form</p>
            <p className="text-xs text-muted-foreground mb-4 italic">
              ??"AI ?œë??ì„œ ?´ì•„?¨ê¸° ?¸ë¬¸??ë¶€?¸ìº ????ê°€ì¹?…?ˆë‹¤
            </p>
            <p className="text-lg text-muted-foreground">
              2ê¸?? ì²­???‘ì„± (2025??9???˜ì£¼ ?œì‘)
            </p>
          </div>
        </div>
      </section>

      {/* Progress Bar */}
      <section className="py-6 md:py-8">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex-1 flex items-center">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center font-bold
                  ${step >= s ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}
                  transition-all duration-300
                `}>
                  {step > s ? <CheckCircle2 className="w-6 h-6" /> : s}
                </div>
                {s < 4 && (
                  <div className={`
                    flex-1 h-1 mx-2
                    ${step > s ? 'bg-primary' : 'bg-muted'}
                    transition-all duration-300
                  `} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center mb-4">
            <p className="text-sm text-muted-foreground">
              {step === 1 && 'ê¸°ë³¸ ?•ë³´'}
              {step === 2 && '?˜ê°• ?•ë³´'}
              {step === 3 && 'ì¶”ê? ?•ë³´'}
              {step === 4 && '?½ê? ?™ì˜'}
            </p>
          </div>
        </div>
      </section>

      {/* Form Content */}
      <section className="pb-12 md:pb-20">
        <div className="container max-w-4xl mx-auto px-4">
          <Card className="shadow-xl">
            <CardContent className="p-8">
              {/* Step 1: ê¸°ë³¸ ?•ë³´ */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <User className="w-8 h-8 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold mb-1">ê¸°ë³¸ ?•ë³´ë¥??…ë ¥?´ì£¼?¸ìš”</h2>
                    <p className="text-xs text-muted-foreground mb-2">Please Enter Your Basic Information</p>
                    <p className="text-muted-foreground">?•í™•???•ë³´ë¥??…ë ¥?´ì£¼?¸ìš”</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">?´ë¦„ *</Label>
                      <Input
                        id="name"
                        placeholder="?ê¸¸??
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="birthYear">ì¶œìƒ?°ë„ *</Label>
                      <Select value={formData.birthYear} onValueChange={(value) => handleInputChange('birthYear', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="ì¶œìƒ?°ë„ ? íƒ" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 80 }, (_, i) => 2005 - i).map(year => (
                            <SelectItem key={year} value={year.toString()}>{year}??/SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>?±ë³„ *</Label>
                      <RadioGroup value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                        <div className="flex space-x-4">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="male" id="male" />
                            <Label htmlFor="male" className="font-normal">?¨ì„±</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="female" id="female" />
                            <Label htmlFor="female" className="font-normal">?¬ì„±</Label>
                          </div>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">?°ë½ì²?*</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="010-1234-5678"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        maxLength={13}
                      />
                      <p className="text-xs text-muted-foreground">010?¼ë¡œ ?œì‘?˜ëŠ” 11?ë¦¬ ?´ë???ë²ˆí˜¸ë¥??…ë ¥?´ì£¼?¸ìš”</p>
                    </div>

                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="email">?´ë©”??(? íƒ)</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="example@email.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: ?˜ê°• ?•ë³´ */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Calendar className="w-8 h-8 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold mb-1">?˜ê°• ?•ë³´ë¥?? íƒ?´ì£¼?¸ìš”</h2>
                    <p className="text-xs text-muted-foreground mb-2">Please Select Your Course Information</p>
                    <p className="text-muted-foreground">?¬ë§?˜ëŠ” ?˜ê°• ë°©ì‹??? íƒ?´ì£¼?¸ìš”</p>
                  </div>

                  <div className="space-y-6">
                    <Alert className="mb-4 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 flex-shrink-0" />
                      <AlertDescription className="flex-1">
                        <strong>2025??9???˜ì£¼?ì„œ 2ê¸°ê? ?œì‘?©ë‹ˆ??</strong><br/>
                        1ê¸°ì˜ ?±ê³µ?ì¸ ?˜ë£Œ ?´í›„, 2026??3???•ì‹ ?°ì¹­ ??ë§ˆì?ë§??œë²” ?´ì˜?…ë‹ˆ??
                      </AlertDescription>
                    </Alert>
                    
                    <div className="space-y-2">
                      <Label>?œì‘ ??*</Label>
                      <RadioGroup value={formData.startMonth} onValueChange={(value) => handleInputChange('startMonth', value)}>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-muted/50">
                            <RadioGroupItem value="9" id="month9" />
                            <Label htmlFor="month9" className="font-normal cursor-pointer">
                              2025??9??(2ê¸?
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2 p-4 border rounded-lg opacity-50">
                            <RadioGroupItem value="10" id="month10" disabled />
                            <Label htmlFor="month10" className="font-normal">
                              2025??10??(?ˆì •)
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2 p-4 border rounded-lg opacity-50">
                            <RadioGroupItem value="11" id="month11" disabled />
                            <Label htmlFor="month11" className="font-normal">
                              2025??11??(?ˆì •)
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2 p-4 border rounded-lg opacity-50">
                            <RadioGroupItem value="12" id="month12" disabled />
                            <Label htmlFor="month12" className="font-normal">
                              2025??12??(?ˆì •)
                            </Label>
                          </div>
                        </div>
                      </RadioGroup>
                      {formData.startMonth === '9' && (
                        <Alert className="mt-2 flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 flex-shrink-0" />
                          <AlertDescription className="flex-1">
                            2ê¸°ëŠ” ?˜ì£¼?œì—?œë§Œ ì§„í–‰?©ë‹ˆ?? 10?”ë????¤ë¥¸ ì§€??—?œë„ ?œì°¨?ìœ¼ë¡??¤í”ˆ ?ˆì •?…ë‹ˆ??
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>?˜ê°• ì§€??*</Label>
                      <RadioGroup value={formData.location} onValueChange={(value) => handleInputChange('location', value)}>
                        <div className="grid grid-cols-2 gap-4">
                          <div className={`flex items-center space-x-2 p-4 border rounded-lg ${formData.startMonth === '9' ? 'hover:bg-muted/50' : 'opacity-50'}`}>
                            <RadioGroupItem value="naju" id="naju" disabled={formData.startMonth !== '9'} />
                            <Label htmlFor="naju" className={`font-normal ${formData.startMonth === '9' ? 'cursor-pointer' : ''}`}>
                              ?˜ì£¼??{formData.startMonth === '9' && '(ê°€??'}
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2 p-4 border rounded-lg opacity-50">
                            <RadioGroupItem value="yeosu" id="yeosu" disabled />
                            <Label htmlFor="yeosu" className="font-normal">?¬ìˆ˜??/Label>
                          </div>
                          <div className="flex items-center space-x-2 p-4 border rounded-lg opacity-50">
                            <RadioGroupItem value="mokpo" id="mokpo" disabled />
                            <Label htmlFor="mokpo" className="font-normal">ëª©í¬??/Label>
                          </div>
                          <div className="flex items-center space-x-2 p-4 border rounded-lg opacity-50">
                            <RadioGroupItem value="hwasun" id="hwasun" disabled />
                            <Label htmlFor="hwasun" className="font-normal">?”ìˆœêµ?/Label>
                          </div>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <Label>?˜ê°• ë°©ì‹ *</Label>
                      <RadioGroup value={formData.attendanceType} onValueChange={(value) => handleInputChange('attendanceType', value)}>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div 
                            className={`p-6 border-2 rounded-lg hover:border-primary cursor-pointer transition-all ${
                              formData.attendanceType === 'offline' ? 'border-primary bg-primary/5' : ''
                            }`}
                            onClick={() => handleInputChange('attendanceType', 'offline')}
                          >
                            <div className="flex items-start space-x-2">
                              <RadioGroupItem value="offline" id="offline" />
                              <div className="flex-1">
                                <Label htmlFor="offline" className="text-lg font-semibold cursor-pointer">?¤í”„?¼ì¸ ?˜ê°•</Label>
                                <p className="text-sm text-muted-foreground mt-2">
                                  ?„ì? êµìœ¡?¥ì—??ì§ì ‘ ì°¸ì—¬<br/>
                                  ?Œê·œëª?ëª¨ì„ ì°¸ì—¬ ê°€??                                </p>
                              </div>
                            </div>
                          </div>
                          <div 
                            className={`p-6 border-2 rounded-lg hover:border-primary cursor-pointer transition-all ${
                              formData.attendanceType === 'online' ? 'border-primary bg-primary/5' : ''
                            }`}
                            onClick={() => handleInputChange('attendanceType', 'online')}
                          >
                            <div className="flex items-start space-x-2">
                              <RadioGroupItem value="online" id="online" />
                              <div className="flex-1">
                                <Label htmlFor="online" className="text-lg font-semibold cursor-pointer">?¨ë¼???˜ê°•</Label>
                                <p className="text-sm text-muted-foreground mt-2">
                                  ?€ ì§€??—???ê²© ì°¸ì—¬<br/>
                                  ?¤ì‹œê°??¤íŠ¸ë¦¬ë° ?œê³µ
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: ì¶”ê? ?•ë³´ */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FileText className="w-8 h-8 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold mb-1">ì¶”ê? ?•ë³´ë¥??…ë ¥?´ì£¼?¸ìš”</h2>
                    <p className="text-xs text-muted-foreground mb-2">Please Enter Additional Information</p>
                    <p className="text-muted-foreground">???˜ì? ?„ë¡œê·¸ë¨ ?œê³µ???„í•œ ?•ë³´?…ë‹ˆ??/p>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="occupation">?„ì¬ ì§ì—…/? ë¶„ *</Label>
                      <Input
                        id="occupation"
                        placeholder="?? ?€?™ìƒ, ì§ì¥?? ?„ë¦¬?œì„œ, ?ì˜????
                        value={formData.occupation}
                        onChange={(e) => handleInputChange('occupation', e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="motivation">ì§€???™ê¸° *</Label>
                      <Textarea
                        id="motivation"
                        placeholder="AI ?¸ë¬¸??ë¶€?¸ìº ?„ì— ì°¸ì—¬?˜ê³ ???˜ëŠ” ?´ìœ ë¥??ìœ ë¡?²Œ ?‘ì„±?´ì£¼?¸ìš”"
                        rows={4}
                        value={formData.motivation}
                        onChange={(e) => handleInputChange('motivation', e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">ìµœì†Œ 50???´ìƒ ?‘ì„±?´ì£¼?¸ìš”</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="expectations">?„ë¡œê·¸ë¨???µí•´ ê¸°ë??˜ëŠ” ??*</Label>
                      <Textarea
                        id="expectations"
                        placeholder="?„ë¡œê·¸ë¨???µí•´ ?»ê³ ???˜ëŠ” ê²? ë°°ìš°ê³??¶ì? ê²??±ì„ ?‘ì„±?´ì£¼?¸ìš”"
                        rows={4}
                        value={formData.expectations}
                        onChange={(e) => handleInputChange('expectations', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: ?½ê? ?™ì˜ */}
              {step === 4 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="w-8 h-8 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold mb-1">?½ê????™ì˜?´ì£¼?¸ìš”</h2>
                    <p className="text-xs text-muted-foreground mb-2">Please Agree to the Terms</p>
                    <p className="text-muted-foreground">?„ë˜ ?½ê????•ì¸?˜ê³  ?™ì˜?´ì£¼?¸ìš”</p>
                  </div>

                  <div className="space-y-4">
                    <Card className="p-6">
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="termsAgree"
                          checked={formData.termsAgree}
                          onCheckedChange={(checked) => handleInputChange('termsAgree', checked)}
                          className="mt-0.5"
                        />
                        <div className="flex-1">
                          <Label htmlFor="termsAgree" className="text-base font-semibold cursor-pointer">
                            ?´ìš©?½ê? ?™ì˜ (?„ìˆ˜)
                          </Label>
                          <div className="mt-2 p-4 bg-muted rounded-lg max-h-32 overflow-y-auto text-sm text-muted-foreground">
                            <p>??ì¡?(ëª©ì )</p>
                            <p>ë³??½ê??€ ?œë¦¼ìºì³ AI ?¸ë¬¸??ë¶€?¸ìº ???œë¹„???´ìš©??ê´€??ì¡°ê±´ ë°??ˆì°¨ë¥?ê·œì •?¨ì„ ëª©ì ?¼ë¡œ ?©ë‹ˆ??</p>
                            <p className="mt-2">??ì¡?(?„ë¡œê·¸ë¨ ?´ìš©)</p>
                            <p>1. ?„ë¡œê·¸ë¨?€ 6ê°œì›” ê³¼ì •?¼ë¡œ ì§„í–‰?©ë‹ˆ??</p>
                            <p>2. ì£?2~3???˜ì—…??ì§„í–‰?©ë‹ˆ??</p>
                            <p>3. ?¤í”„?¼ì¸ê³??¨ë¼???˜ì—…??ë³‘í–‰?©ë‹ˆ??</p>
                          </div>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-6">
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="privacyAgree"
                          checked={formData.privacyAgree}
                          onCheckedChange={(checked) => handleInputChange('privacyAgree', checked)}
                          className="mt-0.5"
                        />
                        <div className="flex-1">
                          <Label htmlFor="privacyAgree" className="text-base font-semibold cursor-pointer">
                            ê°œì¸?•ë³´ ?˜ì§‘ ë°??´ìš© ?™ì˜ (?„ìˆ˜)
                          </Label>
                          <div className="mt-2 p-4 bg-muted rounded-lg max-h-32 overflow-y-auto text-sm text-muted-foreground">
                            <p>1. ?˜ì§‘??ª©: ?´ë¦„, ?°ë½ì²? ?´ë©”?? ?ë…„?”ì¼, ?±ë³„</p>
                            <p>2. ?˜ì§‘ëª©ì : ?„ë¡œê·¸ë¨ ?´ì˜ ë°??ˆë‚´</p>
                            <p>3. ë³´ìœ ê¸°ê°„: ?„ë¡œê·¸ë¨ ì¢…ë£Œ ??1??/p>
                            <p>4. ?™ì˜ë¥?ê±°ë???ê¶Œë¦¬ê°€ ?ˆìœ¼ë©? ê±°ë? ???„ë¡œê·¸ë¨ ì°¸ì—¬ê°€ ?œí•œ?????ˆìŠµ?ˆë‹¤.</p>
                          </div>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-6">
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="marketingAgree"
                          checked={formData.marketingAgree}
                          onCheckedChange={(checked) => handleInputChange('marketingAgree', checked)}
                          className="mt-0.5"
                        />
                        <div className="flex-1">
                          <Label htmlFor="marketingAgree" className="text-base font-semibold cursor-pointer">
                            ë§ˆì????•ë³´ ?˜ì‹  ?™ì˜ (? íƒ)
                          </Label>
                          <p className="text-sm text-muted-foreground mt-2">
                            ?„ë¡œê·¸ë¨ ê´€??? ìš©???•ë³´?€ ?´ë²¤???Œì‹??ë°›ì•„ë³´ì‹¤ ???ˆìŠµ?ˆë‹¤.
                          </p>
                        </div>
                      </div>
                    </Card>
                  </div>

                  <Alert className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    <AlertDescription className="flex-1">
                      ?„ìˆ˜ ??ª©???™ì˜?˜ì? ?Šìœ¼?œë©´ ? ì²­??ë¶ˆê??¥í•©?ˆë‹¤.
                    </AlertDescription>
                  </Alert>
                </div>
              )}

              {/* Navigation Buttons */}
              <Separator className="my-8" />
              
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={handlePrev}
                  disabled={step === 1}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  ?´ì „
                </Button>

                {step < totalSteps ? (
                  <Button
                    onClick={handleNext}
                    disabled={!isStepValid()}
                    className="flex items-center gap-2"
                  >
                    ?¤ìŒ
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={!isStepValid() || isSubmitting}
                    className="flex items-center gap-2"
                    size="lg"
                  >
                    {isSubmitting ? 'ì²˜ë¦¬ì¤?..' : '? ì²­ ?„ë£Œ'}
                    {!isSubmitting && <CheckCircle2 className="w-4 h-4" />}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Info Box */}
          <Alert className="mt-8 flex items-center gap-2">
            <Clock className="h-4 w-4 flex-shrink-0" />
            <AlertDescription className="flex-1">
              ? ì²­???‘ì„±?€ ??5-10ë¶??•ë„ ?Œìš”?©ë‹ˆ?? 
              ?‘ì„± ì¤??˜ì´ì§€ë¥?ë²—ì–´?˜ë©´ ?…ë ¥???•ë³´ê°€ ?€?¥ë˜ì§€ ?Šìœ¼??ì£¼ì˜?´ì£¼?¸ìš”.
            </AlertDescription>
          </Alert>
        </div>
      </section>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            </div>
            <DialogTitle className="text-center text-xl">? ì²­???„ë£Œ?˜ì—ˆ?µë‹ˆ??</DialogTitle>
            <DialogDescription className="text-center pt-2">
              <p className="mb-2">
                <strong>{formData.name}</strong>?˜ì˜ ?¸ë¬¸??ë¶€?¸ìº ??? ì²­??
                ?±ê³µ?ìœ¼ë¡??‘ìˆ˜?˜ì—ˆ?µë‹ˆ??
              </p>
              <p className="text-sm text-muted-foreground">
                ?…ë ¥?˜ì‹  ?°ë½ì²˜ë¡œ ?ˆë‚´ ë©”ì‹œì§€ë¥?ë°œì†¡?´ë“œë¦¬ê² ?µë‹ˆ??
              </p>
              <p className="text-xs text-muted-foreground mt-4">
                ? ì‹œ ??ë¶€?¸ìº ???˜ì´ì§€ë¡??´ë™?©ë‹ˆ??..
              </p>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
