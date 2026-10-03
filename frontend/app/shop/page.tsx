import { Suspense } from 'react';
import type { Metadata } from 'next';
import { GridPage } from '@/components/pages/Pages';

export const metadata: Metadata = { title: 'Shop' };

export default function Page() {
  return (
    <Suspense>
      <GridPage />
    </Suspense>
  );
}
