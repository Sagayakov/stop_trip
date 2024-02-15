import { UseFormRegister } from 'react-hook-form';
import { TypeForExcursionFilter } from 'widgets/settingForm/settingExcursion/libr/TypeForExcursionFilter.ts';
import { useTranslation } from 'react-i18next';
import styles from 'widgets/settingForm/settingExcursion/libr/settingExcursionFilter.module.scss';
import { useSearchParams } from 'react-router-dom';

interface Props {
    register: UseFormRegister<TypeForExcursionFilter>;
}

export const ExcursionTransfer = ({ register }: Props) => {
    const { t } = useTranslation();
    const [searchParams] = useSearchParams();
    const transferParams = searchParams.get('excursion_transfer');

    return (
        <div className={styles.settingExcursionTransfer}>
            <h3>{t('filters.excursion_transfer')}</h3>
            <label className="form_checkbox">
                <input
                    type="checkbox"
                    {...register('excursion_transfer')}
                    defaultChecked={!!transferParams}
                />
                <span>{t('filters.excursion_transfer')}</span>
            </label>
        </div>
    );
};
