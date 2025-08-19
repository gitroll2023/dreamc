'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Calendar, ChevronRight, Sparkles, ArrowRight, Camera, X, AlertCircle, Eye } from 'lucide-react';
import Link from 'next/link';

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

  // Í≥µÏ??¨Ìï≠ Î™©Î°ù Í∞Ä?∏Ïò§Í∏?  useEffect(() => {
    fetchAnnouncements();
  }, [selectedCategory]);

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/announcements?category=${selectedCategory}`);
      const data = await response.json();
      setAnnouncements(data);
    } catch (error) {
      
    } finally {
      setLoading(false);
    }
  };

  // Í≥µÏ??¨Ìï≠ ?¥Î¶≠ ???ÅÏÑ∏ ?ïÎ≥¥ Í∞Ä?∏Ïò§Í∏?Î∞?Ï°∞Ìöå??Ï¶ùÍ?
  const handleAnnouncementClick = async (announcement: Announcement) => {
    try {
      // API ?∏Ï∂úÎ°?Ï°∞Ìöå??Ï¶ùÍ? Î∞?ÏµúÏã† ?ïÎ≥¥ Í∞Ä?∏Ïò§Í∏?      const response = await fetch(`/api/announcements/${announcement.id}`);
      const updatedAnnouncement = await response.json();
      
      // Î™®Îã¨ ?¥Í∏∞
      setSelectedAnnouncement(updatedAnnouncement);
      
      // Î™©Î°ù ?ÖÎç∞?¥Ìä∏ (Ï°∞Ìöå??Î∞òÏòÅ)
      setAnnouncements(prev => 
        prev.map(a => a.id === updatedAnnouncement.id ? updatedAnnouncement : a)
      );
    } catch (error) {
      
      // ?êÎü¨ Î∞úÏÉù ?úÏóê??Í∏∞Î≥∏ ?ïÎ≥¥Î°?Î™®Îã¨ ?¥Í∏∞
      setSelectedAnnouncement(announcement);
    }
  };

  const categories = [
    { value: 'all', label: '?ÑÏ≤¥' },
    { value: 'important', label: 'Ï§ëÏöî' },
    { value: 'notice', label: 'Í≥µÏ?' },
    { value: 'recruitment', label: 'Î™®Ïßë' },
    { value: 'event', label: '?âÏÇ¨' }
  ];

  const getCategoryBadge = (category: string) => {
    switch(category) {
      case 'important':
        return <Badge variant="destructive">Ï§ëÏöî</Badge>;
      case 'recruitment':
        return <Badge variant="default">Î™®Ïßë</Badge>;
      case 'event':
        return <Badge className="bg-accent text-white">?âÏÇ¨</Badge>;
      default:
        return <Badge variant="secondary">Í≥µÏ?</Badge>;
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
              Í≥µÏ??¨Ìï≠
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              ?úÎ¶ºÏ∫êÏ≥ê???àÎ°ú???åÏãùÍ≥?Í≥µÏ??¨Ìï≠???ïÏù∏?òÏÑ∏??            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="space-y-6">
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

              {loading ? (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  <p className="mt-4 text-muted-foreground">Í≥µÏ??¨Ìï≠??Î∂àÎü¨?§Îäî Ï§?..</p>
                </div>
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
                          ?êÏÑ∏??Î≥¥Í∏∞ <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              <div className="text-center mt-12">
                <Link href="/gallery">
                  <Button size="lg" variant="outline">
                    <Camera className="w-4 h-4 mr-2" />
                    ?úÎèô Í∞§Îü¨Î¶?Î≥¥Í∏∞
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-16 bg-secondary/30">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">58</div>
              <p className="text-sm text-muted-foreground">1Í∏??òÎ£å??/p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">96%</div>
              <p className="text-sm text-muted-foreground">ÎßåÏ°±??/p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">4</div>
              <p className="text-sm text-muted-foreground">?¥ÏòÅ ?ÑÏãú</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">{announcements.length}</div>
              <p className="text-sm text-muted-foreground">Í≥µÏ??¨Ìï≠</p>
            </div>
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
                  Ï°∞Ìöå??{selectedAnnouncement.views}
                </span>
                <Button onClick={() => setSelectedAnnouncement(null)}>
                  ?´Í∏∞
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
