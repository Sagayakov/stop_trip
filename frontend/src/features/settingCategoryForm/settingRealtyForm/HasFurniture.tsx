import { UseFormRegister } from 'react-hook-form';
import { TypeSettingRealty } from 'widgets/settingForm/settingRealty/libr/TypeSettingRealty.ts';
import { useTranslation } from 'react-i18next';

interface Props {
    register: UseFormRegister<TypeSettingRealty>;
}

export const HasFurniture = ({ register }: Props) => {
    const { t } = useTranslation();

    return (
        <div className="hasFurniture">
            <h3>{t('filters.property_has_furniture')}</h3>
            <div className="setting-hasFurniture">
                <label className="form-checkbox">
                    <input
                        type="checkbox"
                        {...register('property_has_furniture')}
                    />
                    <span>{t('filters.with-furniture')}</span>
                </label>
            </div>
        </div>
    );
};
