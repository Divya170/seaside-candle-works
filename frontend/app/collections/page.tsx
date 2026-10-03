import type { Metadata } from 'next';
import { CollectionsPage } from '@/components/pages/Pages';

export const metadata: Metadata = { title: 'Collections' };

export default function Page() {
  return <CollectionsPage />;
}
