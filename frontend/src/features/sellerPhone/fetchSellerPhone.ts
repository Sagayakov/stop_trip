import { url } from 'shared/const/url.ts';

export class PhoneLimitError extends Error {}

/**
 * Телефон продавца запрашивается отдельно, только по нажатию кнопки.
 * Сервер ограничивает частоту таких запросов, чтобы номера нельзя было собрать ботом.
 */
export const fetchSellerPhone = async (slug: string): Promise<string | null> => {
    const res = await fetch(`${url}/api/advertisements/${slug}/contacts/`);
    if (res.status === 429) {
        throw new PhoneLimitError('too many requests');
    }
    if (!res.ok) {
        throw new Error(`contacts request failed: ${res.status}`);
    }
    const data: { phone: string | null } = await res.json();
    return data.phone;
};
