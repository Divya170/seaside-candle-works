export const ORDER_STATUSES = ['New', 'Confirmed', 'Packed', 'Shipped', 'Delivered', 'Cancelled'] as const;
export const PAYMENT_STATUSES = ['Awaiting payment', 'Paid', 'Refunded'] as const;
export const MESSAGE_STATUSES = ['New', 'Replied', 'Closed'] as const;
export const SORTS = ['featured', 'name', 'price-asc', 'price-desc'] as const;
export const MAX_QTY = 99;
/** Design placeholders shown wherever the shop hasn't supplied copy yet. */
export const PH = {
  price: '[Price]',
  scent: '[Scent description]',
  size: '[Size]',
  shortDesc: '[Short product description — supplied by client]',
  description: '[Full product description — supplied by client]',
  scentNotes: '[Scent notes — supplied by client]',
  sizeDetails: '[Size and dimensions — supplied by client]',
  care: '[Client-approved candle care guidance]',
  shipping: '[Approved shipping and returns policy]',
  answer: '[Approved answer — supplied by Seaside Candle Works]',
};
export const money = (cents: number) => '$' + (cents / 100).toFixed(2);
