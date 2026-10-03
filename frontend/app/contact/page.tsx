import type { Metadata } from 'next';
import { ContactPage } from '@/components/pages/Pages';

export const metadata: Metadata = { title: 'Contact' };

export default function Page() {
  return <ContactPage />;
}
