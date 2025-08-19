'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Calendar, Sparkles, Eye, ChevronRight } from 'lucide-react';

interface Announcement {
  id: string;
  category: string;
  title: string;
  preview: string;
  content: string;
  views: number;
  date: string;
  publishedAt: string;
}

export default function CommunityPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  // 공지사항 목록 가져오기
  useEffect(() => {
    fetchAnnouncements();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/announcements?category=${selectedCategory}`);
      const data = await response.json();
      setAnnouncements(data);
    } catch (error) {
      console.error('Failed to fetch announcements:', error);
    } finally {
      setLoading(false);
    }
  };

  // 공지사항 클릭 시 상세 정보 가져오고 조회수 증가
  const handleAnnouncementClick = async (announcement: Announcement) => {
    try {
      // API 호출로 조회수 증가 및 최신 정보 가져오기
      const response = await fetch(`/api/announcements/${announcement.id}`);
      const updatedAnnouncement = await response.json();
      
      // 모달 열기
      setSelectedAnnouncement(updatedAnnouncement);
      
      // 목록 업데이트 (조회수 반영)
      setAnnouncements(prev => 
        prev.map(a => a.id === updatedAnnouncement.id ? updatedAnnouncement : a)
      );
    } catch (error) {
      console.error('Failed to fetch announcement details:', error);
      // 에러 발생 시에도 기본 정보로 모달 열기
      setSelectedAnnouncement(announcement);
    }
  };

  const categories = [
    { value: 'all', label: '전체' },
    { value: 'important', label: '중요' },
    { value: 'notice', label: '공지' },
    { value: 'recruitment', label: '모집' },
    { value: 'event', label: '행사' }
  ];

  const getCategoryBadge = (category: string) => {
    switch(category) {
      case 'important':
        return <Badge variant="destructive">중요</Badge>;
      case 'recruitment':
        return <Badge variant="default">모집</Badge>;
      case 'event':
        return <Badge className="bg-accent text-white">행사</Badge>;
      default:
        return <Badge variant="secondary">공지</Badge>;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-12 md:py-16 lg:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-background"></div>
        <div className="container relative z-10 max-w-6xl mx-auto px-4">
          <div className="text-center">
            <Badge className="mb-4 px-4 py-1" variant="secondary">
              <Sparkles className="w-3 h-3 mr-1" />
              Community
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              공지사항
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              드림캐쳐의 새로운 소식과 공지사항을 확인하세요.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="space-y-6">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map(cat => (
                <Button
                  key={cat.value}
                  variant={selectedCategory === cat.value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(cat.value)}
                >
                  {cat.label}
                </Button>
              ))}
            </div>

            {/* Announcements List */}
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <p className="mt-4 text-muted-foreground">공지사항을 불러오는 중...</p>
              </div>
            ) : announcements.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <p className="text-muted-foreground">등록된 공지사항이 없습니다.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {announcements.map(announcement => (
                  <Card 
                    key={announcement.id} 
                    className="hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => handleAnnouncementClick(announcement)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          {getCategoryBadge(announcement.category)}
                          <span className="text-sm text-muted-foreground flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {announcement.date}
                          </span>
                        </div>
                        <span className="text-sm text-muted-foreground flex items-center">
                          <Eye className="w-3 h-3 mr-1" />
                          {announcement.views}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2 hover:text-primary transition-colors">
                        {announcement.title}
                      </h3>
                      <p className="text-muted-foreground mb-3">
                        {announcement.preview}
                      </p>
                      <Button variant="ghost" size="sm" className="p-0 h-auto font-normal">
                        자세히 보기 <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Announcement Detail Modal */}
      <Dialog open={!!selectedAnnouncement} onOpenChange={() => setSelectedAnnouncement(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          {selectedAnnouncement && (
            <>
              <DialogHeader>
                <div className="flex items-start gap-3 mb-2">
                  {getCategoryBadge(selectedAnnouncement.category)}
                  <span className="text-sm text-muted-foreground flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {selectedAnnouncement.date}
                  </span>
                </div>
                <DialogTitle className="text-xl font-bold">
                  {selectedAnnouncement.title}
                </DialogTitle>
              </DialogHeader>
              
              <div className="mt-4 whitespace-pre-wrap text-sm leading-relaxed">
                {selectedAnnouncement.content}
              </div>
              
              <div className="flex items-center justify-between mt-6 pt-4 border-t">
                <span className="text-sm text-muted-foreground">
                  조회수 {selectedAnnouncement.views}
                </span>
                <Button onClick={() => setSelectedAnnouncement(null)}>
                  닫기
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}