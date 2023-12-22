import { UseFormRegister } from 'react-hook-form';
import { TypeForExcursionFilter } from 'widgets/settingForm/settingExcursion/libr/TypeForExcursionFilter.ts';
import { useTranslation } from 'react-i18next';
import styles from 'widgets/settingForm/settingExcursion/libr/settingExcursionFilter.module.scss'

interface Props {
    register: UseFormRegister<TypeForExcursionFilter>;
}

export const ExcursionTransfer = ({ register }: Props) => {
    const { t } = useTranslation();

    return (
        <div className={styles.settingExcursion}>
            <h3>{t('filters.excursion_transfer')}</h3>
            <label className="form_checkbox">
                <input type="checkbox" {...register('excursion_transfer')} />
                <span>{t('filters.excursion_transfer')}</span>
            </label>
        </div>
    );
};
