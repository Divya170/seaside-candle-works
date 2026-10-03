import { FaqPage } from '@/components/pages/Pages';

export default function Page({ params }: { params: { cat: string } }) {
  return <FaqPage cat={decodeURIComponent(params.cat)} />;
}
