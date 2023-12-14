import { UseFormRegister } from 'react-hook-form';
import { TypeOfServicesForm } from '../../../widgets/settingForm/settingServices/libr/TypeOfServicesForm';
import { useTranslation } from 'react-i18next';

interface Props {
    register: UseFormRegister<TypeOfServicesForm>;
}

export const HouseCall = ({ register }: Props) => {
    const { t } = useTranslation();

    return (
        <div className="houseCall">
            <h3>{t('filters.home-visit')}</h3>
            <div className="setting-houseCall">
                <label className="form-checkbox">
                    <input
                        type="checkbox"
                        // value=""
                        {...register('service_home_visit')}
                    />
                    <span>{t('filters.home-visit')}</span>
                </label>
            </div>
        </div>
    );
};
