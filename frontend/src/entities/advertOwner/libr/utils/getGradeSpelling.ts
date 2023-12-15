import { useAppSelector } from '../../../../app/store/hooks';
import { useTranslation } from 'react-i18next';

export const useGradeSpelling = (value: number) => {
    const { t } = useTranslation();
    const lang = useAppSelector((state) => state.setLang.lang);

    const lastStr = value.toString().at(-1);
    const lastTwoStr = value.toString().slice(-2);
    let result = `${t('advert-page.grade')}`;

    if (lang === 'ru') {
        if (lastTwoStr >= '11' && lastTwoStr <= '14') {
            result += 'ок';
        } else if (lastStr === '1') {
            result += 'ка';
        } else if (lastStr === '2' || lastStr === '3' || lastStr === '4') {
            result += 'ки';
        } else {
            result += 'ок';
        }
    } else {
        if (lastStr !== '1') {
            result += 's';
        }
    }

    return result;
};
