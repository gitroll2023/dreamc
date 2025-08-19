'use client';

import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Sparkles } from 'lucide-react';

export default function GalleryPage() {
  // 이미지 배열 - public/image 폴더의 파일들
  const images = [
    '/image/a1.jpg',
    '/image/a2.jpg',
    '/image/a3.jpg',
    '/image/a4.jpg',
    '/image/a5.jpg',
    '/image/a6.jpg',
    '/image/a7.jpg',
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-12 md:py-16 lg:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-background"></div>
        <div className="container relative z-10 max-w-6xl mx-auto px-4">
          <div className="text-center">
            <Badge className="mb-4 px-4 py-1" variant="secondary">
              <Sparkles className="w-3 h-3 mr-1" />
              Gallery
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              활동 갤러리
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              드림캐쳐의 다양한 활동 모습을 소개합니다
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((src, index) => (
              <div 
                key={index} 
                className="relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <Image
                  src={src}
                  alt={`드림캐쳐 활동 사진 ${index + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}