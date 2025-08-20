import { Suspense } from 'react';
import ApplyForm from './ApplyForm';

// Loading component for Suspense fallback
function LoadingForm() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-muted-foreground">로딩 중...</p>
      </div>
    </div>
  );
}

export default function ExperienceApplyPage() {
  return (
    <Suspense fallback={<LoadingForm />}>
      <ApplyForm />
    </Suspense>
  );
}