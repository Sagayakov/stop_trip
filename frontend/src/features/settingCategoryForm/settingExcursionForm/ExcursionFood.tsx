import { UseFormRegister } from 'react-hook-form';
import { TypeForExcursionFilter } from 'widgets/settingForm/settingExcursion/libr/TypeForExcursionFilter.ts';
import { useTranslation } from 'react-i18next';
import styles from 'widgets/settingForm/settingExcursion/libr/settingExcursionFilter.module.scss';
import { useSearchParams } from 'react-router-dom';
interface Props {
    register: UseFormRegister<TypeForExcursionFilter>;
}

export const ExcursionFood = ({ register }: Props) => {
    const { t } = useTranslation();
    const [searchParams] = useSearchParams();
    const foodParams = searchParams.get('excursion_food');

    return (
        <div className={styles.settingExcursionFood}>
            <h3>{t('filters.food')}</h3>
            <label className="form_checkbox">
                <input
                    type="checkbox"
                    {...register('excursion_food')}
                    defaultChecked={!!foodParams}
                />
                <span>{t('filters.excursion_food')}</span>
            </label>
        </div>
    );
};
