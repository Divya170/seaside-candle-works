'use client';

import ProductCardView from './views/ProductCardView';

/** The design's ProductCard component: `c` is a card view-model, `size` sm | md | lg. */
export function ProductCard({ c, size }: { c: any; size?: string }) {
  const s = size || 'md';
  const nameSize = s === 'lg' ? 'clamp(28px,2.8vw,42px)' : s === 'sm' ? '19px' : 'clamp(20px,1.7vw,25px)';
  return <ProductCardView v={{ c, nameSize }} />;
}
