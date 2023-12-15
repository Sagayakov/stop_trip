import { useAppSelector } from '../../../app/store/hooks';
import { useTranslation } from 'react-i18next';

export const GetSpelling = (value: number) => {
    const { t } = useTranslation();
    const lang = useAppSelector((state) => state.setLang.lang);

    const lastStr = value.toString().at(-1);
    const lastTwoStr = value.toString().slice(-2);
    let result = `${t('main-page.offer-spelling')}`;

    if (lang === 'ru') {
        if (lastTwoStr >= '11' && lastTwoStr <= '14') {
            result += 'й';
        } else if (lastStr === '1') {
            result += 'е';
        } else if (lastStr === '2' || lastStr === '3' || lastStr === '4') {
            result += 'я';
        } else {
            result += 'й';
        }
    } else {
        if (lastStr !== '1') {
            result += 's';
        }
    }

    return result;
};
