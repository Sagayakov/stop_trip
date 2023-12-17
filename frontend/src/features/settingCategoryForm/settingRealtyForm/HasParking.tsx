import { UseFormRegister } from 'react-hook-form';
import { TypeSettingRealty } from 'widgets/settingForm/settingRealty/libr/TypeSettingRealty.ts';
import { useTranslation } from 'react-i18next';

interface Props {
    register: UseFormRegister<TypeSettingRealty>;
}

export const HasParking = ({ register }: Props) => {
    const { t } = useTranslation();

    return (
        <div className="hasParking">
            <h3>{t('filters.property_has_parking')}</h3>
            <div className="setting-hasParking">
                <label className="form-checkbox">
                    <input
                        type="checkbox"
                        {...register('property_has_parking')}
                    />
                    <span>{t('filters.with-parking')}</span>
                </label>
            </div>
        </div>
    );
};
