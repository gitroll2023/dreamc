'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { 
  Users, Phone, Calendar, Clock, MapPin, 
  CheckCircle, XCircle, RefreshCw, LogOut, 
  Search, Filter, Gift, MessageSquare,
  ChevronDown, ChevronUp, Send, Copy
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface OutreachContact {
  id: string;
  name: string;
  phone: string;
  interestedPrograms: string[];
  location: string;
  preferredDay?: string;
  preferredTimes?: string[];
  specificTime?: string;
  supporterName: string;
  supporterGroup: string;
  agreedAt: string;
  privacyAgreed: boolean;
  marketingAgreed: boolean;
  couponSent: boolean;
  couponSentAt?: string;
  notes?: string;
  createdAt: string;
}

interface Stats {
  total: number;
  bySupporterName: Record<string, number>;
  byLocation: Record<string, number>;
  byProgram: Record<string, number>;
  couponSent: number;
  marketingAgreed: number;
}

const programNames: Record<string, string> = {
  cocktail: '🍹 칵테일 체험',
  humanities: '📚 인문학 체험',
  boardgame: '🎲 보드게임 체험',
  baking: '🍰 베이킹 체험',
  calligraphy: '✍️ 캘리그래피 체험',
  other: '🎨 기타 체험',
};

const timeSlotNames: Record<string, string> = {
  saturday_morning: '토요일 오전',
  saturday_afternoon: '토요일 오후',
  saturday_evening: '토요일 저녁',
  sunday_morning: '일요일 오전',
  sunday_afternoon: '일요일 오후',
  sunday_evening: '일요일 저녁',
  // 이전 버전 호환성
  weekday_morning: '평일 오전',
  weekday_afternoon: '평일 오후',
  weekday_evening: '평일 저녁',
  weekend_morning: '주말 오전',
  weekend_afternoon: '주말 오후',
  weekend_evening: '주말 저녁',
};

export default function SupportersDashboard() {
  const router = useRouter();
  const { toast } = useToast();
  const [contacts, setContacts] = useState<OutreachContact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<OutreachContact[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterProgram, setFilterProgram] = useState('all');
  const [selectedContact, setSelectedContact] = useState<OutreachContact | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('today');

  useEffect(() => {
    fetchContacts();
    const interval = setInterval(fetchContacts, 30000); // 30초마다 새로고침
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    filterData();
  }, [contacts, searchTerm, filterProgram, activeTab]);

  const fetchContacts = async () => {
    try {
      const response = await fetch('/api/supporters/contacts');
      
      if (response.status === 401) {
        router.push('/nj/sp');
        return;
      }

      const data = await response.json();
      if (data.success) {
        setContacts(data.contacts);
        setStats(data.stats);
      }
    } catch (error) {
      toast({
        title: '오류',
        description: '데이터를 불러오는데 실패했습니다.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const filterData = () => {
    let filtered = [...contacts];

    // 탭 필터링 (오늘, 이번주, 전체)
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    if (activeTab === 'today') {
      filtered = filtered.filter(c => new Date(c.createdAt) >= today);
    } else if (activeTab === 'week') {
      filtered = filtered.filter(c => new Date(c.createdAt) >= weekAgo);
    }

    // 검색어 필터링
    if (searchTerm) {
      filtered = filtered.filter(c => 
        c.name.includes(searchTerm) || 
        c.phone.includes(searchTerm) ||
        c.supporterName.includes(searchTerm)
      );
    }

    // 프로그램 필터링
    if (filterProgram !== 'all') {
      filtered = filtered.filter(c => 
        c.interestedPrograms.includes(filterProgram)
      );
    }

    setFilteredContacts(filtered);
  };

  const handleCouponSent = async (contactId: string) => {
    try {
      const response = await fetch('/api/supporters/contacts', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contactId, couponSent: true }),
      });

      if (response.ok) {
        toast({
          title: '완료',
          description: '쿠폰 발송 완료로 표시되었습니다.',
        });
        fetchContacts();
      }
    } catch (error) {
      toast({
        title: '오류',
        description: '처리 중 오류가 발생했습니다.',
        variant: 'destructive',
      });
    }
  };

  const handleLogout = async () => {
    await fetch('/api/supporters/auth', { method: 'DELETE' });
    router.push('/nj/sp');
  };

  const copyPhone = (phone: string) => {
    navigator.clipboard.writeText(phone);
    toast({
      title: '복사됨',
      description: '연락처가 클립보드에 복사되었습니다.',
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ko-KR', {
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }).format(date);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <RefreshCw className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">신청자 관리</h1>
              <p className="text-sm text-muted-foreground">드림캐쳐 나주 서포터즈</p>
            </div>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              로그아웃
            </Button>
          </div>
        </div>
      </div>

      {/* 통계 카드 */}
      {stats && (
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">전체 신청</p>
                    <p className="text-2xl font-bold">{stats.total}</p>
                  </div>
                  <Users className="w-8 h-8 text-primary opacity-20" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">오늘 신청</p>
                    <p className="text-2xl font-bold">
                      {contacts.filter(c => 
                        new Date(c.createdAt).toDateString() === new Date().toDateString()
                      ).length}
                    </p>
                  </div>
                  <Calendar className="w-8 h-8 text-primary opacity-20" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">쿠폰 발송</p>
                    <p className="text-2xl font-bold">{stats.couponSent}</p>
                  </div>
                  <Gift className="w-8 h-8 text-green-600 opacity-20" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">마케팅 동의</p>
                    <p className="text-2xl font-bold">{stats.marketingAgreed}</p>
                  </div>
                  <MessageSquare className="w-8 h-8 text-blue-600 opacity-20" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* 필터 및 검색 */}
      <div className="container mx-auto px-4 pb-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="이름, 연락처, 서포터즈 검색..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <select
                value={filterProgram}
                onChange={(e) => setFilterProgram(e.target.value)}
                className="px-4 py-2 border rounded-lg bg-white"
              >
                <option value="all">모든 프로그램</option>
                {Object.entries(programNames).map(([key, name]) => (
                  <option key={key} value={key}>{name}</option>
                ))}
              </select>
              <Button onClick={fetchContacts} variant="outline" size="icon">
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="container mx-auto px-4 pb-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full md:w-auto grid-cols-3">
            <TabsTrigger value="today">오늘</TabsTrigger>
            <TabsTrigger value="week">이번주</TabsTrigger>
            <TabsTrigger value="all">전체</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>신청자 목록</CardTitle>
                <CardDescription>
                  총 {filteredContacts.length}명의 신청자
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {filteredContacts.map((contact) => (
                    <div key={contact.id} className="p-4 hover:bg-gray-50">
                      <div className="space-y-3">
                        {/* 기본 정보 */}
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium">{contact.name}</span>
                              {contact.couponSent && (
                                <Badge variant="outline" className="text-xs">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  발송완료
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Phone className="w-3 h-3" />
                              <button
                                onClick={() => copyPhone(contact.phone)}
                                className="hover:text-primary flex items-center gap-1"
                              >
                                {contact.phone}
                                <Copy className="w-3 h-3" />
                              </button>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                              <Clock className="w-3 h-3" />
                              {formatDate(contact.createdAt)}
                            </div>
                            {/* 가능 시간대 표시 */}
                            {contact.preferredTimes && contact.preferredTimes.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {contact.preferredTimes.map((time) => (
                                  <Badge key={time} variant="secondary" className="text-xs">
                                    {timeSlotNames[time] || time}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setExpandedId(expandedId === contact.id ? null : contact.id)}
                          >
                            {expandedId === contact.id ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </Button>
                        </div>

                        {/* 관심 프로그램 */}
                        <div className="flex flex-wrap gap-1">
                          {contact.interestedPrograms.map((program) => (
                            <Badge key={program} variant="outline" className="text-xs">
                              {programNames[program] || program}
                            </Badge>
                          ))}
                        </div>

                        {/* 확장 정보 */}
                        {expandedId === contact.id && (
                          <div className="pt-3 border-t space-y-3">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-muted-foreground">서포터즈: </span>
                                <Badge variant="outline" className="ml-1">
                                  {contact.supporterName || '미지정'}
                                </Badge>
                              </div>
                              <div>
                                <span className="text-muted-foreground">마케팅 동의: </span>
                                <span className="font-medium">
                                  {contact.marketingAgreed ? '동의' : '미동의'}
                                </span>
                              </div>
                            </div>
                            {contact.notes && (
                              <div className="text-sm">
                                <span className="text-muted-foreground">메모: </span>
                                <p className="mt-1">{contact.notes}</p>
                              </div>
                            )}
                            <div className="flex gap-2">
                              {!contact.couponSent && (
                                <Button
                                  size="sm"
                                  onClick={() => handleCouponSent(contact.id)}
                                >
                                  <Send className="w-3 h-3 mr-1" />
                                  쿠폰 발송 완료
                                </Button>
                              )}
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setSelectedContact(contact)}
                              >
                                상세 보기
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {filteredContacts.length === 0 && (
                    <div className="p-8 text-center text-muted-foreground">
                      신청자가 없습니다.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* 상세 모달 */}
      <Dialog open={!!selectedContact} onOpenChange={() => setSelectedContact(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>신청자 상세 정보</DialogTitle>
          </DialogHeader>
          {selectedContact && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs">이름</Label>
                  <p className="font-medium">{selectedContact.name}</p>
                </div>
                <div>
                  <Label className="text-xs">연락처</Label>
                  <p className="font-medium">{selectedContact.phone}</p>
                </div>
                <div>
                  <Label className="text-xs">지역</Label>
                  <p className="font-medium">{selectedContact.location}</p>
                </div>
                <div className="col-span-2">
                  <Label className="text-xs">가능 시간대</Label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedContact.preferredTimes && selectedContact.preferredTimes.length > 0 ? (
                      selectedContact.preferredTimes.map((time) => (
                        <Badge key={time} variant="secondary">
                          {timeSlotNames[time] || time}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-muted-foreground">미지정</span>
                    )}
                  </div>
                </div>
              </div>
              
              <div>
                <Label className="text-xs">관심 프로그램</Label>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedContact.interestedPrograms.map((program) => (
                    <Badge key={program} variant="secondary">
                      {programNames[program] || program}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs">담당 서포터즈</Label>
                  <Badge variant="secondary" className="mt-1">
                    {selectedContact.supporterName || '미지정'}
                  </Badge>
                </div>
                <div>
                  <Label className="text-xs">신청일시</Label>
                  <p className="font-medium">{formatDate(selectedContact.createdAt)}</p>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      {selectedContact.privacyAgreed ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-600" />
                      )}
                      <span className="text-sm">개인정보 수집 동의</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {selectedContact.marketingAgreed ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <XCircle className="w-4 h-4 text-gray-400" />
                      )}
                      <span className="text-sm">마케팅 수신 동의</span>
                    </div>
                  </div>
                  
                  {selectedContact.couponSent ? (
                    <Badge className="bg-green-100 text-green-700">
                      쿠폰 발송 완료
                    </Badge>
                  ) : (
                    <Button
                      size="sm"
                      onClick={() => {
                        handleCouponSent(selectedContact.id);
                        setSelectedContact(null);
                      }}
                    >
                      쿠폰 발송 완료
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}