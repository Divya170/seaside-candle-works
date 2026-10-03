import { ProductPage } from '@/components/pages/Pages';

export default function Page({ params }: { params: { id: string } }) {
  return <ProductPage id={decodeURIComponent(params.id)} />;
}
