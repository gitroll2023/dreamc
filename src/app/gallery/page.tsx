'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { 
  Calendar, MapPin, Users, Heart, Share2, ChevronLeft, 
  ChevronRight, X, Sparkles, Camera
} from 'lucide-react';

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const categories = [
    { id: 'all', name: '전체', count: 48 },
    { id: 'perfume', name: '향수 만들기', count: 12 },
    { id: 'baking', name: '홈베이킹', count: 8 },
    { id: 'color', name: '퍼스널컬러', count: 6 },
    { id: 'board', name: '보드게임', count: 7 },
    { id: 'calligraphy', name: '캘리그래피', count: 5 },
    { id: 'photo', name: '사진 워크샵', count: 4 },
    { id: 'craft', name: '석고방향제', count: 6 }
  ];

  const galleryItems = [
    // 향수 만들기
    {
      id: 1,
      category: 'perfume',
      title: '나만의 시그니처 향수 만들기',
      date: '2024-12-18',
      location: '여수 청년센터',
      participants: 8,
      likes: 234,
      image: '/api/placeholder/400/300',
      description: '30가지 향료를 직접 블렌딩하며 자신만의 향수를 만드는 시간'
    },
    {
      id: 2,
      category: 'perfume',
      title: '크리스마스 특별 향수 클래스',
      date: '2024-12-23',
      location: '목포 문화공간',
      participants: 6,
      likes: 189,
      image: '/api/placeholder/400/300',
      description: '크리스마스를 테마로 한 특별한 향수 만들기'
    },
    {
      id: 3,
      category: 'perfume',
      title: '커플 향수 만들기 체험',
      date: '2024-12-10',
      location: '화순 문화공간',
      participants: 10,
      likes: 312,
      image: '/api/placeholder/400/300',
      description: '커플이 함께 만드는 페어 향수 클래스'
    },
    // 홈베이킹
    {
      id: 4,
      category: 'baking',
      title: '마들렌 & 파운드케이크 클래스',
      date: '2024-12-15',
      location: '목포 베이킹스튜디오',
      participants: 12,
      likes: 267,
      image: '/api/placeholder/400/300',
      description: '달콤한 마들렌과 촉촉한 파운드케이크 만들기'
    },
    {
      id: 5,
      category: 'baking',
      title: '크리스마스 쿠키 만들기',
      date: '2024-12-22',
      location: '목포 베이킹스튜디오',
      participants: 15,
      likes: 423,
      image: '/api/placeholder/400/300',
      description: '아이싱으로 꾸미는 크리스마스 쿠키'
    },
    {
      id: 6,
      category: 'baking',
      title: '수제 브라우니 클래스',
      date: '2024-11-28',
      location: '목포 문화공간',
      participants: 8,
      likes: 198,
      image: '/api/placeholder/400/300',
      description: '진한 초콜릿 브라우니 만들기'
    },
    // 퍼스널컬러
    {
      id: 7,
      category: 'color',
      title: '퍼스널컬러 진단 & 스타일링',
      date: '2024-12-05',
      location: '여수 뷰티센터',
      participants: 10,
      likes: 356,
      image: '/api/placeholder/400/300',
      description: '전문가와 함께하는 퍼스널컬러 진단'
    },
    {
      id: 8,
      category: 'color',
      title: '컬러별 메이크업 클래스',
      date: '2024-11-20',
      location: '화순 청년공간',
      participants: 8,
      likes: 278,
      image: '/api/placeholder/400/300',
      description: '퍼스널컬러에 맞는 메이크업 팁'
    },
    // 보드게임
    {
      id: 9,
      category: 'board',
      title: '금요일 밤 보드게임 파티',
      date: '2024-12-13',
      location: '여수 보드게임카페',
      participants: 20,
      likes: 145,
      image: '/api/placeholder/400/300',
      description: '다양한 보드게임을 즐기는 금요일 밤'
    },
    {
      id: 10,
      category: 'board',
      title: '전략 보드게임 토너먼트',
      date: '2024-12-07',
      location: '목포 청년센터',
      participants: 16,
      likes: 167,
      image: '/api/placeholder/400/300',
      description: '카탄, 티켓투라이드 등 전략게임 대회'
    },
    {
      id: 11,
      category: 'board',
      title: '초보자 보드게임 교실',
      date: '2024-11-25',
      location: '화순 문화센터',
      participants: 12,
      likes: 123,
      image: '/api/placeholder/400/300',
      description: '보드게임 입문자를 위한 친절한 교실'
    },
    // 캘리그래피
    {
      id: 12,
      category: 'calligraphy',
      title: '한글 캘리그래피 기초반',
      date: '2024-12-08',
      location: '여수 문화센터',
      participants: 10,
      likes: 289,
      image: '/api/placeholder/400/300',
      description: '붓펜으로 쓰는 아름다운 한글'
    },
    {
      id: 13,
      category: 'calligraphy',
      title: '연말 카드 캘리그래피',
      date: '2024-12-20',
      location: '여수 청년센터',
      participants: 12,
      likes: 334,
      image: '/api/placeholder/400/300',
      description: '손글씨로 전하는 따뜻한 연말 인사'
    },
    // 사진 워크샵
    {
      id: 14,
      category: 'photo',
      title: '스마트폰 사진 촬영 기법',
      date: '2024-12-02',
      location: '여수 해양공원',
      participants: 15,
      likes: 412,
      image: '/api/placeholder/400/300',
      description: '스마트폰으로 전문가처럼 찍는 방법'
    },
    {
      id: 15,
      category: 'photo',
      title: '야경 촬영 워크샵',
      date: '2024-11-30',
      location: '화순 야경명소',
      participants: 8,
      likes: 367,
      image: '/api/placeholder/400/300',
      description: '아름다운 야경을 담는 촬영 기법'
    },
    // 석고방향제
    {
      id: 16,
      category: 'craft',
      title: '석고방향제 만들기 클래스',
      date: '2024-12-12',
      location: '여수 공방',
      participants: 10,
      likes: 256,
      image: '/api/placeholder/400/300',
      description: '예쁜 몰드로 만드는 석고방향제'
    },
    {
      id: 17,
      category: 'craft',
      title: '크리스마스 석고 오너먼트',
      date: '2024-12-19',
      location: '여수 공방',
      participants: 12,
      likes: 298,
      image: '/api/placeholder/400/300',
      description: '크리스마스 트리 장식용 석고 오너먼트'
    },
    {
      id: 18,
      category: 'craft',
      title: '선물용 석고방향제 만들기',
      date: '2024-11-22',
      location: '화순 문화공간',
      participants: 8,
      likes: 187,
      image: '/api/placeholder/400/300',
      description: '소중한 사람을 위한 석고방향제 선물'
    }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  const handleImageClick = (item: any, index: number) => {
    setSelectedImage(item);
    setCurrentImageIndex(index);
  };

  const handlePrevImage = () => {
    const newIndex = currentImageIndex > 0 ? currentImageIndex - 1 : filteredItems.length - 1;
    setCurrentImageIndex(newIndex);
    setSelectedImage(filteredItems[newIndex]);
  };

  const handleNextImage = () => {
    const newIndex = currentImageIndex < filteredItems.length - 1 ? currentImageIndex + 1 : 0;
    setCurrentImageIndex(newIndex);
    setSelectedImage(filteredItems[newIndex]);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-12 md:py-16 lg:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-background"></div>
        <div className="container relative z-10 max-w-7xl mx-auto px-4">
          <div className="text-center">
            <Badge className="mb-4 px-4 py-1" variant="secondary">
              <Camera className="w-3 h-3 mr-1" />
              Gallery
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              활동 갤러리
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              드림캐쳐와 함께한 청년들의 즐거운 순간들을 만나보세요
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 border-b sticky top-16 bg-background/95 backdrop-blur z-40">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map(category => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="whitespace-nowrap"
              >
                {category.name}
                <Badge variant="secondary" className="ml-2">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item, index) => (
              <Card 
                key={item.id} 
                className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
                onClick={() => handleImageClick(item, index)}
              >
                <div className="aspect-[4/3] bg-gradient-to-br from-primary/20 to-accent/20 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Camera className="w-12 h-12 text-muted-foreground/30" />
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Badge variant="secondary" className="px-3 py-1">
                        <Sparkles className="w-3 h-3 mr-1" />
                        자세히 보기
                      </Badge>
                    </div>
                  </div>
                  <Badge 
                    className="absolute top-2 left-2 text-xs"
                    variant={item.category === 'perfume' ? 'default' : 'secondary'}
                  >
                    {categories.find(c => c.id === item.category)?.name}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2 line-clamp-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {item.date}
                      </span>
                      <span className="flex items-center">
                        <Users className="w-3 h-3 mr-1" />
                        {item.participants}명
                      </span>
                    </div>
                    <span className="flex items-center">
                      <Heart className="w-3 h-3 mr-1" />
                      {item.likes}
                    </span>
                  </div>
                  <div className="flex items-center mt-2 text-xs text-muted-foreground">
                    <MapPin className="w-3 h-3 mr-1" />
                    {item.location}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <Button size="lg" variant="outline">
              더 많은 활동 보기
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-16 bg-secondary/30">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <p className="text-sm text-muted-foreground">참여 청년</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">48</div>
              <p className="text-sm text-muted-foreground">진행된 프로그램</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">4</div>
              <p className="text-sm text-muted-foreground">활동 지역</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">95%</div>
              <p className="text-sm text-muted-foreground">만족도</p>
            </div>
          </div>
        </div>
      </section>

      {/* Image Modal */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-5xl p-0">
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-50 bg-background/80 backdrop-blur"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-4 h-4" />
            </Button>
            
            {selectedImage && (
              <div className="relative">
                <div className="aspect-[16/10] bg-gradient-to-br from-primary/20 to-accent/20 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Camera className="w-24 h-24 text-muted-foreground/30" />
                  </div>
                </div>
                
                <div className="p-6">
                  <Badge className="mb-3">
                    {categories.find(c => c.id === selectedImage.category)?.name}
                  </Badge>
                  <h2 className="text-2xl font-bold mb-2">{selectedImage.title}</h2>
                  <p className="text-muted-foreground mb-4">{selectedImage.description}</p>
                  
                  <div className="flex items-center gap-6 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {selectedImage.date}
                    </span>
                    <span className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      {selectedImage.location}
                    </span>
                    <span className="flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      참가자 {selectedImage.participants}명
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Heart className="w-4 h-4 mr-2" />
                        {selectedImage.likes}
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="w-4 h-4 mr-2" />
                        공유
                      </Button>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={handlePrevImage}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <span className="flex items-center px-3 text-sm text-muted-foreground">
                        {currentImageIndex + 1} / {filteredItems.length}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={handleNextImage}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}