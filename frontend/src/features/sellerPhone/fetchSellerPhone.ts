import { url } from 'shared/const/url.ts';

export class PhoneLimitError extends Error {}

export type PhoneSource = { advertSlug: string } | { userId: number };

/**
 * Телефон продавца запрашивается отдельно, только по нажатию кнопки.
 * Сервер ограничивает частоту таких запросов, чтобы номера нельзя было собрать ботом.
 */
export const fetchSellerPhone = async (source: PhoneSource): Promise<string | null> => {
    const path =
        'advertSlug' in source
            ? `api/advertisements/${source.advertSlug}/contacts/`
            : `api/user/${source.userId}/contacts/`;
    const res = await fetch(`${url}/${path}`);
    if (res.status === 429) {
        throw new PhoneLimitError('too many requests');
    }
    if (!res.ok) {
        throw new Error(`contacts request failed: ${res.status}`);
    }
    const data: { phone: string | null } = await res.json();
    return data.phone;
};
