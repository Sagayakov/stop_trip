import 'i18next';
import en from './src/shared/langs/en.json';
import ru from './src/shared/langs/ru.json';

declare module 'i18next' {
    interface CustomTypeOptions {
        defaultNS: 'en';
        resources: {
            en: typeof en;
            ru: typeof ru;
        };
    }
}
