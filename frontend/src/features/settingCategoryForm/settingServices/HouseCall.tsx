import { UseFormRegister } from 'react-hook-form';
import { TypeOfServicesForm } from 'widgets/settingForm/settingServices/libr/TypeOfServicesForm.ts';
import { useTranslation } from 'react-i18next';
import styles from 'widgets/settingForm/settingServices/libr/settingServicesForm.module.scss'

interface Props {
    register: UseFormRegister<TypeOfServicesForm>;
}

export const HouseCall = ({ register }: Props) => {
    const { t } = useTranslation();

    return (
        <div className={styles.houseCall}>
            <h3>{t('filters.service_home_visit')}</h3>
            <div className={styles.setting_houseCall}>
                <label className="form_checkbox">
                    <input
                        type="checkbox"
                        {...register('service_home_visit')}
                    />
                    <span>{t('filters.service_home_visit')}</span>
                </label>
            </div>
        </div>
    );
};
