import { formatMoney } from 'shared/const/geo.ts';

/** Цена для показа: «5000000.00» → «5 000 000 ₫». Валюта задаётся в shared/const/geo.ts. */
export const prettifyPrice = (price: number | string) => formatMoney(price);
