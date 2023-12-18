import { UseFormRegister } from 'react-hook-form';
import { TypeForExcursionFilter } from 'widgets/settingForm/settingExcursion/libr/TypeForExcursionFilter.ts';
import { useTranslation } from 'react-i18next';
import styles from 'widgets/settingForm/settingExcursion/libr/settingExcursionFilter.module.scss'
interface Props {
    register: UseFormRegister<TypeForExcursionFilter>;
}

export const ExcursionFood = ({ register }: Props) => {
    const { t } = useTranslation();

    return (
        <div className={styles.settingExcursion}>
            <h3>{t('filters.food')}</h3>
            <label className={styles.formCheckbox}>
                <input type="checkbox" {...register('excursion_food')} />
                <span>{t('filters.excursion_food')}</span>
            </label>
        </div>
    );
};
