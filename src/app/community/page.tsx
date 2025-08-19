'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function CommunityPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">공지사항</h1>
          <p className="text-lg text-muted-foreground">
            드림캐쳐의 새로운 소식을 확인하세요
          </p>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Badge>공지</Badge>
                <CardTitle>서비스 준비 중입니다</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                공지사항 페이지가 곧 업데이트될 예정입니다.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}