import en from './src/shared/langs/en.json';
import ru from './src/shared/langs/ru.json';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

i18next.use(initReactI18next).init({
    resources: {
        en: {
            translation: en,
        },
        ru: {
            translation: ru,
        },
    },
    lng: 'ru',
    fallbackLng: 'en',

    interpolation: {
        escapeValue: false,
    },
});
