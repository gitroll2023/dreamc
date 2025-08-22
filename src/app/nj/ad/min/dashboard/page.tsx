'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  Users, FileText, MessageSquare, Megaphone, 
  LogOut, RefreshCw, Eye, Trash2, CheckCircle,
  XCircle, Clock, Calendar, Phone, Mail,
  MapPin, Shield, TrendingUp, AlertCircle, Key, Lock, Copy, Ticket
} from 'lucide-react';

interface AdminData {
  bootcampApplications?: any[];
  experienceApplications?: any[];
  surveys?: any[];
  announcements?: any[];
  coupons?: any[];
}

interface Stats {
  totalBootcampApplications: number;
  totalExperienceApplications: number;
  totalSurveys: number;
  totalAnnouncements: number;
  totalCoupons: number;
  pendingBootcampApplications: number;
  pendingExperienceApplications: number;
  unusedCoupons: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const { toast } = useToast();
  const [data, setData] = useState<AdminData>({});
  const [stats, setStats] = useState<Stats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [passwords, setPasswords] = useState<any>(null);
  const [sessionTimer, setSessionTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetchData();
    fetchPasswords();
    
    // 세션 타이머 설정 (19분 후 경고, 20분 후 자동 로그아웃)
    const warningTimer = setTimeout(() => {
      toast({
        title: '세션 만료 경고',
        description: '1분 후 자동 로그아웃됩니다. 계속하려면 페이지를 새로고침하세요.',
        variant: 'destructive',
        duration: 30000, // 30초 동안 표시
      });
    }, 19 * 60 * 1000); // 19분

    const logoutTimer = setTimeout(() => {
      handleLogout();
      toast({
        title: '세션 만료',
        description: '세션이 만료되어 로그아웃되었습니다.',
        variant: 'destructive',
      });
    }, 20 * 60 * 1000); // 20분

    setSessionTimer(logoutTimer);

    // Cleanup
    return () => {
      clearTimeout(warningTimer);
      clearTimeout(logoutTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/data?type=all');
      
      if (response.status === 401) {
        router.push('/nj/ad/min');
        return;
      }

      const result = await response.json();

      if (result.success) {
        setData(result.data);
        setStats(result.stats);
        
        // 성공적으로 데이터를 가져오면 세션이 연장됨 (미들웨어에서 처리)
      } else {
        setError(result.error || '데이터를 불러오는데 실패했습니다.');
      }
    } catch (error) {
      setError('데이터를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  // 세션 타이머 리셋 함수
  const resetSessionTimers = () => {
    // 기존 타이머 클리어
    if (sessionTimer) {
      clearTimeout(sessionTimer);
    }
    
    // 새로운 타이머 설정
    const warningTimer = setTimeout(() => {
      toast({
        title: '세션 만료 경고',
        description: '1분 후 자동 로그아웃됩니다. 계속하려면 페이지를 새로고침하세요.',
        variant: 'destructive',
        duration: 30000,
      });
    }, 19 * 60 * 1000);

    const logoutTimer = setTimeout(() => {
      handleLogout();
      toast({
        title: '세션 만료',
        description: '세션이 만료되어 로그아웃되었습니다.',
        variant: 'destructive',
      });
    }, 20 * 60 * 1000);

    setSessionTimer(logoutTimer);
  };

  const fetchPasswords = async () => {
    try {
      const response = await fetch('/api/admin/passwords');
      
      if (response.status === 401) {
        return;
      }

      const result = await response.json();

      if (result.success) {
        setPasswords(result.passwords);
      }
    } catch (error) {
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth', { method: 'DELETE' });
      router.push('/nj/ad/min');
    } catch (error) {
    }
  };

  const handleStatusUpdate = async (id: string, status: string, type: string) => {
    try {
      const response = await fetch('/api/admin/data', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status, type }),
      });

      if (response.ok) {
        fetchData(); // Refresh data
      }
    } catch (error) {
    }
  };

  const handleDelete = async (id: string, type: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      const response = await fetch(`/api/admin/data?id=${id}&type=${type}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchData(); // Refresh data
      }
    } catch (error) {
    }
  };

  const getStatusBadge = (status: string) => {
    const statusMap: { [key: string]: { variant: any; label: string; icon: any } } = {
      pending: { variant: 'secondary', label: '대기중', icon: Clock },
      approved: { variant: 'default', label: '승인됨', icon: CheckCircle },
      confirmed: { variant: 'default', label: '확정됨', icon: CheckCircle },
      rejected: { variant: 'destructive', label: '거절됨', icon: XCircle },
      cancelled: { variant: 'outline', label: '취소됨', icon: XCircle },
      completed: { variant: 'default', label: '완료됨', icon: CheckCircle },
    };

    const statusInfo = statusMap[status] || statusMap.pending;
    const Icon = statusInfo.icon;

    return (
      <Badge variant={statusInfo.variant} className="inline-flex items-center gap-1">
        <Icon className="w-3 h-3" />
        {statusInfo.label}
      </Badge>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p>데이터를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-primary" />
              <h1 className="text-xl font-bold">드림캐쳐 관리자</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={fetchData}
                className="inline-flex items-center"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                새로고침
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="inline-flex items-center"
              >
                <LogOut className="w-4 h-4 mr-2" />
                로그아웃
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Stats Overview */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold">{stats.totalBootcampApplications}</div>
                <p className="text-xs text-muted-foreground">부트캠프 신청</p>
                {stats.pendingBootcampApplications > 0 && (
                  <Badge variant="secondary" className="mt-1 text-xs">
                    {stats.pendingBootcampApplications} 대기중
                  </Badge>
                )}
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold">{stats.totalExperienceApplications}</div>
                <p className="text-xs text-muted-foreground">체험 신청</p>
                {stats.pendingExperienceApplications > 0 && (
                  <Badge variant="secondary" className="mt-1 text-xs">
                    {stats.pendingExperienceApplications} 대기중
                  </Badge>
                )}
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold">{stats.totalSurveys}</div>
                <p className="text-xs text-muted-foreground">설문조사</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold">{stats.totalAnnouncements}</div>
                <p className="text-xs text-muted-foreground">공지사항</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold">{stats.totalCoupons || 0}</div>
                <p className="text-xs text-muted-foreground">쿠폰 발급</p>
                {stats.unusedCoupons > 0 && (
                  <Badge variant="secondary" className="mt-1 text-xs">
                    {stats.unusedCoupons} 미사용
                  </Badge>
                )}
              </CardContent>
            </Card>
            <Card className="col-span-2 lg:col-span-1">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold">
                      {stats.totalBootcampApplications + stats.totalExperienceApplications}
                    </div>
                    <p className="text-xs text-muted-foreground">전체 신청</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-primary opacity-20" />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-6">
            <TabsTrigger value="overview">전체보기</TabsTrigger>
            <TabsTrigger value="bootcamp">부트캠프</TabsTrigger>
            <TabsTrigger value="experience">체험프로그램</TabsTrigger>
            <TabsTrigger value="survey">설문조사</TabsTrigger>
            <TabsTrigger value="announcement">공지사항</TabsTrigger>
            <TabsTrigger value="coupon">쿠폰관리</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            {/* 시스템 비밀번호 */}
            {passwords && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Key className="w-5 h-5" />
                    시스템 비밀번호
                  </CardTitle>
                  <CardDescription>환경변수에 설정된 비밀번호들</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-primary" />
                        <span className="font-medium">관리자 비밀번호</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <code className="px-2 py-1 bg-gray-100 rounded text-sm">
                          {passwords.adminPassword}
                        </code>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            navigator.clipboard.writeText(passwords.adminPassword);
                            toast({
                              description: '비밀번호가 복사되었습니다.',
                              duration: 2000,
                            });
                          }}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Lock className="w-4 h-4 text-primary" />
                        <span className="font-medium">서포터즈 비밀번호</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <code className="px-2 py-1 bg-gray-100 rounded text-sm">
                          {passwords.supportersPassword}
                        </code>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            navigator.clipboard.writeText(passwords.supportersPassword);
                            toast({
                              description: '비밀번호가 복사되었습니다.',
                              duration: 2000,
                            });
                          }}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Key className="w-4 h-4 text-primary" />
                        <span className="font-medium">쿠폰 입력 비밀번호</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <code className="px-2 py-1 bg-gray-100 rounded text-sm">
                          {passwords.couponAccessPassword}
                        </code>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            navigator.clipboard.writeText(passwords.couponAccessPassword);
                            toast({
                              description: '비밀번호가 복사되었습니다.',
                              duration: 2000,
                            });
                          }}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>최근 활동 요약</CardTitle>
                <CardDescription>모든 데이터의 최근 항목들</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Recent Bootcamp Applications */}
                <div>
                  <h3 className="font-semibold mb-2">최근 부트캠프 신청 (최근 5건)</h3>
                  <div className="space-y-2">
                    {data.bootcampApplications?.slice(0, 5).map((app) => (
                      <div key={app.id} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                        <div className="flex items-center gap-3">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span className="font-medium">{app.name}</span>
                          <span className="text-sm text-muted-foreground">{app.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">{app.applicationDateKST}</span>
                          {getStatusBadge(app.status)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Experience Applications */}
                <div>
                  <h3 className="font-semibold mb-2">최근 체험 프로그램 신청 (최근 5건)</h3>
                  <div className="space-y-2">
                    {data.experienceApplications?.slice(0, 5).map((app) => (
                      <div key={app.id} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                        <div className="flex items-center gap-3">
                          <FileText className="w-4 h-4 text-muted-foreground" />
                          <span className="font-medium">{app.name}</span>
                          <Badge variant="outline" className="text-xs">{app.programTitle}</Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">{app.applicationDateKST}</span>
                          {getStatusBadge(app.status)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Surveys */}
                <div>
                  <h3 className="font-semibold mb-2">최근 설문조사 (최근 5건)</h3>
                  <div className="space-y-2">
                    {data.surveys?.slice(0, 5).map((survey) => (
                      <div key={survey.id} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                        <div className="flex items-center gap-3">
                          <MessageSquare className="w-4 h-4 text-muted-foreground" />
                          <span className="font-medium">{survey.participantName}</span>
                          <Badge variant="outline" className="text-xs">{survey.programType}</Badge>
                        </div>
                        <span className="text-xs text-muted-foreground">{survey.submittedAtKST}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bootcamp Applications Tab */}
          <TabsContent value="bootcamp">
            <Card>
              <CardHeader>
                <CardTitle>AI 인문학 부트캠프 신청 목록</CardTitle>
                <CardDescription>총 {data.bootcampApplications?.length || 0}건</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px]">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>이름</TableHead>
                        <TableHead>연락처</TableHead>
                        <TableHead>이메일</TableHead>
                        <TableHead>지역</TableHead>
                        <TableHead>시작월</TableHead>
                        <TableHead>수강방식</TableHead>
                        <TableHead>신청일</TableHead>
                        <TableHead>상태</TableHead>
                        <TableHead>액션</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data.bootcampApplications?.map((app) => (
                        <TableRow key={app.id}>
                          <TableCell className="font-medium">{app.name}</TableCell>
                          <TableCell>{app.phone}</TableCell>
                          <TableCell>{app.email || '-'}</TableCell>
                          <TableCell>{app.location}</TableCell>
                          <TableCell>{app.startMonth}월</TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {app.attendanceType === 'online' ? '온라인' : '오프라인'}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-xs">{app.applicationDateKST}</TableCell>
                          <TableCell>{getStatusBadge(app.status)}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="ghost" size="sm" onClick={() => setSelectedItem(app)}>
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                                  <DialogHeader>
                                    <DialogTitle>부트캠프 신청 상세</DialogTitle>
                                  </DialogHeader>
                                  {selectedItem && (
                                    <div className="space-y-4">
                                      <div className="grid grid-cols-2 gap-4">
                                        <div>
                                          <p className="text-sm font-medium">이름</p>
                                          <p>{selectedItem.name}</p>
                                        </div>
                                        <div>
                                          <p className="text-sm font-medium">연락처</p>
                                          <p>{selectedItem.phone}</p>
                                        </div>
                                        <div>
                                          <p className="text-sm font-medium">이메일</p>
                                          <p>{selectedItem.email || '-'}</p>
                                        </div>
                                        <div>
                                          <p className="text-sm font-medium">생년</p>
                                          <p>{selectedItem.birthYear}년</p>
                                        </div>
                                        <div>
                                          <p className="text-sm font-medium">성별</p>
                                          <p>{selectedItem.gender === 'male' ? '남성' : '여성'}</p>
                                        </div>
                                        <div>
                                          <p className="text-sm font-medium">직업</p>
                                          <p>{selectedItem.occupation}</p>
                                        </div>
                                      </div>
                                      <div>
                                        <p className="text-sm font-medium mb-1">지원동기</p>
                                        <p className="text-sm bg-gray-50 dark:bg-gray-800 p-3 rounded">
                                          {selectedItem.motivation}
                                        </p>
                                      </div>
                                      <div>
                                        <p className="text-sm font-medium mb-1">기대사항</p>
                                        <p className="text-sm bg-gray-50 dark:bg-gray-800 p-3 rounded">
                                          {selectedItem.expectations}
                                        </p>
                                      </div>
                                      <div className="flex items-center gap-4 pt-4">
                                        <Button
                                          size="sm"
                                          onClick={() => handleStatusUpdate(selectedItem.id, 'approved', 'bootcamp')}
                                        >
                                          승인
                                        </Button>
                                        <Button
                                          size="sm"
                                          variant="destructive"
                                          onClick={() => handleStatusUpdate(selectedItem.id, 'rejected', 'bootcamp')}
                                        >
                                          거절
                                        </Button>
                                      </div>
                                    </div>
                                  )}
                                </DialogContent>
                              </Dialog>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDelete(app.id, 'bootcamp')}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Experience Applications Tab */}
          <TabsContent value="experience">
            <Card>
              <CardHeader>
                <CardTitle>체험 프로그램 신청 목록</CardTitle>
                <CardDescription>총 {data.experienceApplications?.length || 0}건</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px]">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>프로그램</TableHead>
                        <TableHead>이름</TableHead>
                        <TableHead>연락처</TableHead>
                        <TableHead>연령대</TableHead>
                        <TableHead>지역</TableHead>
                        <TableHead>희망날짜</TableHead>
                        <TableHead>희망시간</TableHead>
                        <TableHead>신청일</TableHead>
                        <TableHead>상태</TableHead>
                        <TableHead>액션</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data.experienceApplications?.map((app) => (
                        <TableRow key={app.id}>
                          <TableCell>
                            <Badge>{app.programTitle}</Badge>
                          </TableCell>
                          <TableCell className="font-medium">{app.name}</TableCell>
                          <TableCell>{app.phone}</TableCell>
                          <TableCell>{app.age}</TableCell>
                          <TableCell>{app.location}</TableCell>
                          <TableCell>{app.preferredDate}</TableCell>
                          <TableCell>
                            {app.preferredTime === 'morning' && '오전'}
                            {app.preferredTime === 'afternoon' && '오후'}
                            {app.preferredTime === 'evening' && '저녁'}
                          </TableCell>
                          <TableCell className="text-xs">{app.applicationDateKST}</TableCell>
                          <TableCell>{getStatusBadge(app.status)}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="ghost" size="sm" onClick={() => setSelectedItem(app)}>
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl">
                                  <DialogHeader>
                                    <DialogTitle>체험 프로그램 신청 상세</DialogTitle>
                                  </DialogHeader>
                                  {selectedItem && (
                                    <div className="space-y-4">
                                      <div>
                                        <Badge className="mb-2">{selectedItem.programTitle}</Badge>
                                      </div>
                                      <div className="grid grid-cols-2 gap-4">
                                        <div>
                                          <p className="text-sm font-medium">이름</p>
                                          <p>{selectedItem.name}</p>
                                        </div>
                                        <div>
                                          <p className="text-sm font-medium">연락처</p>
                                          <p>{selectedItem.phone}</p>
                                        </div>
                                        <div>
                                          <p className="text-sm font-medium">연령대</p>
                                          <p>{selectedItem.age}</p>
                                        </div>
                                        <div>
                                          <p className="text-sm font-medium">지역</p>
                                          <p>{selectedItem.location}</p>
                                        </div>
                                        <div>
                                          <p className="text-sm font-medium">희망날짜</p>
                                          <p>{selectedItem.preferredDate}</p>
                                        </div>
                                        <div>
                                          <p className="text-sm font-medium">희망시간</p>
                                          <p>
                                            {selectedItem.preferredTime === 'morning' && '오전'}
                                            {selectedItem.preferredTime === 'afternoon' && '오후'}
                                            {selectedItem.preferredTime === 'evening' && '저녁'}
                                          </p>
                                        </div>
                                      </div>
                                      {selectedItem.message && (
                                        <div>
                                          <p className="text-sm font-medium mb-1">추가 메시지</p>
                                          <p className="text-sm bg-gray-50 dark:bg-gray-800 p-3 rounded">
                                            {selectedItem.message}
                                          </p>
                                        </div>
                                      )}
                                      <div className="flex items-center gap-4 pt-4">
                                        <Button
                                          size="sm"
                                          onClick={() => handleStatusUpdate(selectedItem.id, 'confirmed', 'experience')}
                                        >
                                          확정
                                        </Button>
                                        <Button
                                          size="sm"
                                          variant="outline"
                                          onClick={() => handleStatusUpdate(selectedItem.id, 'cancelled', 'experience')}
                                        >
                                          취소
                                        </Button>
                                      </div>
                                    </div>
                                  )}
                                </DialogContent>
                              </Dialog>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDelete(app.id, 'experience')}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Survey Tab */}
          <TabsContent value="survey">
            <Card>
              <CardHeader>
                <CardTitle>설문조사 응답</CardTitle>
                <CardDescription>총 {data.surveys?.length || 0}건</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px]">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>참가자</TableHead>
                        <TableHead>프로그램</TableHead>
                        <TableHead>서포터즈</TableHead>
                        <TableHead>만족도</TableHead>
                        <TableHead>추천여부</TableHead>
                        <TableHead>다음 참여</TableHead>
                        <TableHead>추첨참여</TableHead>
                        <TableHead>제출일</TableHead>
                        <TableHead>액션</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data.surveys?.map((survey) => (
                        <TableRow key={survey.id}>
                          <TableCell className="font-medium">{survey.participantName}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{survey.programType}</Badge>
                          </TableCell>
                          <TableCell>{survey.supporterGroup}</TableCell>
                          <TableCell>{survey.satisfactionRating}/3</TableCell>
                          <TableCell>{survey.recommendRating}/3</TableCell>
                          <TableCell>
                            {survey.nextExperience ? (
                              <Badge variant="outline" className="text-xs">
                                {survey.nextExperience === 'ai-bootcamp' ? 'AI' : '북코칭'}
                              </Badge>
                            ) : (
                              '-'
                            )}
                          </TableCell>
                          <TableCell>
                            {survey.participateLottery ? (
                              <Badge variant="default">참여</Badge>
                            ) : (
                              <Badge variant="secondary">미참여</Badge>
                            )}
                          </TableCell>
                          <TableCell className="text-xs">{survey.submittedAtKST}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="ghost" size="sm" onClick={() => setSelectedItem(survey)}>
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                                  <DialogHeader>
                                    <DialogTitle>설문조사 상세</DialogTitle>
                                  </DialogHeader>
                                  {selectedItem && (
                                    <div className="space-y-4">
                                      <div className="grid grid-cols-2 gap-4">
                                        <div>
                                          <p className="text-sm font-medium">참가자</p>
                                          <p>{selectedItem.participantName}</p>
                                        </div>
                                        <div>
                                          <p className="text-sm font-medium">프로그램</p>
                                          <p>{selectedItem.programType}</p>
                                        </div>
                                        <div>
                                          <p className="text-sm font-medium">친절도</p>
                                          <p>{selectedItem.kindnessRating}/3</p>
                                        </div>
                                        <div>
                                          <p className="text-sm font-medium">설명 만족도</p>
                                          <p>{selectedItem.explanationRating}/3</p>
                                        </div>
                                        <div>
                                          <p className="text-sm font-medium">전체 만족도</p>
                                          <p>{selectedItem.satisfactionRating}/3</p>
                                        </div>
                                        <div>
                                          <p className="text-sm font-medium">추천 여부</p>
                                          <p>{selectedItem.recommendRating}/3</p>
                                        </div>
                                      </div>
                                      {selectedItem.goodPoints && (
                                        <div>
                                          <p className="text-sm font-medium mb-1">좋았던 점</p>
                                          <p className="text-sm bg-gray-50 dark:bg-gray-800 p-3 rounded">
                                            {selectedItem.goodPoints}
                                          </p>
                                        </div>
                                      )}
                                      {selectedItem.improvements && (
                                        <div>
                                          <p className="text-sm font-medium mb-1">개선할 점</p>
                                          <p className="text-sm bg-gray-50 dark:bg-gray-800 p-3 rounded">
                                            {selectedItem.improvements}
                                          </p>
                                        </div>
                                      )}
                                      {selectedItem.additionalFeedback && (
                                        <div>
                                          <p className="text-sm font-medium mb-1">추가 피드백</p>
                                          <p className="text-sm bg-gray-50 dark:bg-gray-800 p-3 rounded">
                                            {selectedItem.additionalFeedback}
                                          </p>
                                        </div>
                                      )}
                                      {selectedItem.participateLottery && selectedItem.phone && (
                                        <div>
                                          <p className="text-sm font-medium mb-1">추첨 참여 연락처</p>
                                          <p>{selectedItem.phone}</p>
                                        </div>
                                      )}
                                      {selectedItem.nextExperience && (
                                        <div>
                                          <p className="text-sm font-medium mb-1">다음 참여 희망 프로그램</p>
                                          <Badge variant="outline">
                                            {selectedItem.nextExperience === 'ai-bootcamp' 
                                              ? 'AI 인문학 부트캠프' 
                                              : '동네북코칭'}
                                          </Badge>
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </DialogContent>
                              </Dialog>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDelete(survey.id, 'survey')}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Announcements Tab */}
          <TabsContent value="announcement">
            <Card>
              <CardHeader>
                <CardTitle>공지사항 관리</CardTitle>
                <CardDescription>총 {data.announcements?.length || 0}건</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px]">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>카테고리</TableHead>
                        <TableHead>제목</TableHead>
                        <TableHead>조회수</TableHead>
                        <TableHead>게시일</TableHead>
                        <TableHead>액션</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data.announcements?.map((ann) => (
                        <TableRow key={ann.id}>
                          <TableCell>
                            <Badge>{ann.category}</Badge>
                          </TableCell>
                          <TableCell className="font-medium">{ann.title}</TableCell>
                          <TableCell>{ann.views}</TableCell>
                          <TableCell className="text-xs">{ann.publishedAtKST}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="ghost" size="sm" onClick={() => setSelectedItem(ann)}>
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                                  <DialogHeader>
                                    <DialogTitle>공지사항 상세</DialogTitle>
                                  </DialogHeader>
                                  {selectedItem && (
                                    <div className="space-y-4">
                                      <div>
                                        <Badge>{selectedItem.category}</Badge>
                                      </div>
                                      <div>
                                        <p className="text-lg font-semibold">{selectedItem.title}</p>
                                      </div>
                                      <div>
                                        <p className="text-sm font-medium mb-1">미리보기</p>
                                        <p className="text-sm bg-gray-50 dark:bg-gray-800 p-3 rounded">
                                          {selectedItem.preview}
                                        </p>
                                      </div>
                                      <div>
                                        <p className="text-sm font-medium mb-1">내용</p>
                                        <div className="text-sm bg-gray-50 dark:bg-gray-800 p-3 rounded whitespace-pre-wrap">
                                          {selectedItem.content}
                                        </div>
                                      </div>
                                      <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                          <p className="font-medium">조회수</p>
                                          <p>{selectedItem.views}</p>
                                        </div>
                                        <div>
                                          <p className="font-medium">게시일</p>
                                          <p>{selectedItem.publishedAtKST}</p>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </DialogContent>
                              </Dialog>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDelete(ann.id, 'announcement')}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Coupon Tab */}
          <TabsContent value="coupon">
            <Card>
              <CardHeader>
                <CardTitle>쿠폰 관리</CardTitle>
                <CardDescription>총 {data.coupons?.length || 0}건 발급</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px]">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>쿠폰 코드</TableHead>
                        <TableHead>수령인</TableHead>
                        <TableHead>발급일</TableHead>
                        <TableHead>만료일</TableHead>
                        <TableHead>상태</TableHead>
                        <TableHead>사용일</TableHead>
                        <TableHead>사용 프로그램</TableHead>
                        <TableHead>액션</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data.coupons?.map((coupon) => (
                        <TableRow key={coupon.id}>
                          <TableCell className="font-mono font-medium">{coupon.code}</TableCell>
                          <TableCell>{coupon.recipientName || '미지정'}</TableCell>
                          <TableCell className="text-xs">{coupon.issueDate}</TableCell>
                          <TableCell className="text-xs">{coupon.expiryDate}</TableCell>
                          <TableCell>
                            {coupon.status === '사용완료' && (
                              <Badge variant="secondary">사용완료</Badge>
                            )}
                            {coupon.status === '만료' && (
                              <Badge variant="destructive">만료</Badge>
                            )}
                            {coupon.status === '사용가능' && (
                              <Badge variant="default">사용가능</Badge>
                            )}
                          </TableCell>
                          <TableCell className="text-xs">{coupon.usedAt || '-'}</TableCell>
                          <TableCell>{coupon.usedProgram || '-'}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="ghost" size="sm" onClick={() => setSelectedItem(coupon)}>
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-md">
                                  <DialogHeader>
                                    <DialogTitle>쿠폰 상세</DialogTitle>
                                  </DialogHeader>
                                  {selectedItem && (
                                    <div className="space-y-4">
                                      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                                        <p className="text-sm font-medium mb-1">쿠폰 코드</p>
                                        <p className="font-mono text-lg font-bold text-primary">{selectedItem.code}</p>
                                      </div>
                                      <div className="grid grid-cols-2 gap-4">
                                        <div>
                                          <p className="text-sm font-medium">수령인</p>
                                          <p>{selectedItem.recipientName || '미지정'}</p>
                                        </div>
                                        <div>
                                          <p className="text-sm font-medium">상태</p>
                                          <div className="mt-1">
                                            {selectedItem.status === '사용완료' && (
                                              <Badge variant="secondary">사용완료</Badge>
                                            )}
                                            {selectedItem.status === '만료' && (
                                              <Badge variant="destructive">만료</Badge>
                                            )}
                                            {selectedItem.status === '사용가능' && (
                                              <Badge variant="default">사용가능</Badge>
                                            )}
                                          </div>
                                        </div>
                                        <div>
                                          <p className="text-sm font-medium">발급일</p>
                                          <p>{selectedItem.issueDate}</p>
                                        </div>
                                        <div>
                                          <p className="text-sm font-medium">만료일</p>
                                          <p>{selectedItem.expiryDate}</p>
                                        </div>
                                        {selectedItem.usedAt && (
                                          <>
                                            <div>
                                              <p className="text-sm font-medium">사용일</p>
                                              <p>{selectedItem.usedAt}</p>
                                            </div>
                                            <div>
                                              <p className="text-sm font-medium">사용 프로그램</p>
                                              <p>{selectedItem.usedProgram}</p>
                                            </div>
                                          </>
                                        )}
                                      </div>
                                      <div className="flex justify-between items-center pt-4 border-t">
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          onClick={() => {
                                            navigator.clipboard.writeText(selectedItem.code);
                                            toast({
                                              description: '쿠폰 코드가 복사되었습니다.',
                                              duration: 2000,
                                            });
                                          }}
                                        >
                                          <Copy className="w-4 h-4 mr-2" />
                                          코드 복사
                                        </Button>
                                      </div>
                                    </div>
                                  )}
                                </DialogContent>
                              </Dialog>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDelete(coupon.id, 'coupon')}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}