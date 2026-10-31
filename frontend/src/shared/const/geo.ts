/**
 * Страна, валюта и карта сайта — в одном месте.
 *
 * Чтобы перевести сайт на другую страну:
 * 1. Поменяйте значения ниже (или задайте переменные VITE_COUNTRY_* в frontend/.env).
 * 2. Добавьте страну, её регионы и города в базу (см. backend/countries/data/).
 */

export const COUNTRY = {
    slug: process.env.VITE_COUNTRY_SLUG || 'vietnam',
    nameRu: process.env.VITE_COUNTRY_NAME_RU || 'Вьетнам',
    nameEn: process.env.VITE_COUNTRY_NAME_EN || 'Vietnam',
};

export const getCountryName = (lang: string) =>
    lang === 'ru' ? COUNTRY.nameRu : COUNTRY.nameEn;

/** «во Вьетнаме» / «in Vietnam» — для заголовка главной, когда город не выбран. */
export const COUNTRY_PLACE = { ru: 'во Вьетнаме', en: 'in Vietnam' };

/**
 * Популярные города для быстрого выбора на главной (slug — как в базе, см.
 * backend/countries/data/vietnam.py). inRu — форма для заголовка: «Объявления … в Нячанге».
 */
export const POPULAR_CITIES = [
    { slug: 'nha-trang', ru: 'Нячанг', inRu: 'в Нячанге', en: 'Nha Trang' },
    { slug: 'phu-quoc', ru: 'Фукуок', inRu: 'на Фукуоке', en: 'Phu Quoc' },
    { slug: 'da-nang', ru: 'Дананг', inRu: 'в Дананге', en: 'Da Nang' },
    { slug: 'ho-chi-minh', ru: 'Хошимин', inRu: 'в Хошимине', en: 'Ho Chi Minh City' },
    { slug: 'hanoi', ru: 'Ханой', inRu: 'в Ханое', en: 'Hanoi' },
    { slug: 'da-lat', ru: 'Далат', inRu: 'в Далате', en: 'Da Lat' },
    { slug: 'hoi-an', ru: 'Хойан', inRu: 'в Хойане', en: 'Hoi An' },
    { slug: 'mui-ne', ru: 'Муйне', inRu: 'в Муйне', en: 'Mui Ne' },
    { slug: 'vung-tau', ru: 'Вунгтау', inRu: 'в Вунгтау', en: 'Vung Tau' },
];

export type PopularCity = (typeof POPULAR_CITIES)[number];

export const findPopularCity = (slug: string | null | undefined) =>
    POPULAR_CITIES.find((city) => city.slug === slug);

/** Валюта цен в объявлениях. */
export const CURRENCY = {
    code: process.env.VITE_CURRENCY_CODE || 'VND',
    symbol: process.env.VITE_CURRENCY_SYMBOL || '₫',
};

/** Быстрые кнопки «Максимум …» в фильтре цены (в валюте сайта). */
export const PRICE_PRESETS: string[] = ['5000000', '10000000'];

/** Центр карты по умолчанию [долгота, широта] и масштаб, при котором видна вся страна. */
export const MAP_CENTER: number[] = [107.5, 14.5];
export const MAP_COUNTRY_ZOOM = 5;

/** «5000000» → «5 000 000 ₫» */
export const formatMoney = (value: number | string) =>
    `${Math.round(Number(value)).toLocaleString('ru')} ${CURRENCY.symbol}`;

/**
 * Примерная цена в рублях: «≈ 5 200 ₽». Округляем, чтобы не создавать ложной точности:
 * до 10 ₽ для небольших сумм и до 100 ₽ для крупных.
 */
export const formatRubApprox = (vnd: number | string, vndPerRub: number) => {
    const rub = Number(vnd) / vndPerRub;
    const step = rub < 1000 ? 10 : 100;
    const rounded = Math.max(step, Math.round(rub / step) * step);
    return `≈ ${rounded.toLocaleString('ru')} ₽`;
};
