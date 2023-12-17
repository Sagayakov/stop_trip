import 'i18next';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import en from '../frontend/src/shared/langs/en.json';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ru from './/frontend/src/shared/langs/ru.json';

declare module 'i18next' {
    interface CustomTypeOptions {
        defaultNS: 'en';
        resources: {
            en: typeof en;
            ru: typeof ru;
        };
    }
}
