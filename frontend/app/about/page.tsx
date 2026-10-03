import type { Metadata } from 'next';
import { AboutPage } from '@/components/pages/Pages';

export const metadata: Metadata = { title: 'About' };

export default function Page() {
  return <AboutPage />;
}
