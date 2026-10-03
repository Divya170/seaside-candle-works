import { Suspense } from 'react';
import { GridPage } from '@/components/pages/Pages';

export default function Page({ params }: { params: { id: string } }) {
  return (
    <Suspense>
      <GridPage collectionId={decodeURIComponent(params.id)} />
    </Suspense>
  );
}
