import { TFunction } from 'i18next';

export const getDeclension = (count: number, t: TFunction<"translation", undefined>) => {
    const singular = t('search_ad_page.one');
    const few = t('search_ad_page.few');
    const many = t('search_ad_page.many');

    const mod10 = count % 10;
    const mod100 = count % 100;

    if (mod10 === 1 && mod100 !== 11) {
        return singular;
    } else if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) {
        return few;
    } else {
        return many;
    }
};