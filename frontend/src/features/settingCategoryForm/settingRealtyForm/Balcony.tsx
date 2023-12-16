import { UseFormRegister } from 'react-hook-form';
import { TypeSettingRealty } from 'widgets/settingForm/settingRealty/libr/TypeSettingRealty.ts';
import { useTranslation } from 'react-i18next';

interface Props {
    register: UseFormRegister<TypeSettingRealty>;
}

export const Balcony = ({ register }: Props) => {
    const { t } = useTranslation();

    return (
        <div className="balcony">
            <h3>{t('filters.property_balcony')}</h3>
            <div className="balcony-setting">
                <label className="form-checkbox">
                    <input
                        type="checkbox"
                        id="balcony-setting-1"
                        value="yes"
                        {...register('property_balcony')}
                    />
                    <span>{t('filters.yes')}</span>
                </label>
                <label className="form-checkbox">
                    <input
                        type="checkbox"
                        id="balcony-setting-2"
                        value="no"
                        {...register('property_balcony')}
                    />
                    <span>{t('filters.no')}</span>
                </label>
                <label className="form-checkbox">
                    <input
                        type="checkbox"
                        id="balcony-setting-3"
                        value="loggia"
                        {...register('property_balcony')}
                    />
                    <span>{t('filters.loggia')}</span>
                </label>
            </div>
        </div>
    );
};
