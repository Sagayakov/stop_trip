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
