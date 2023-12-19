import { Control, UseFormSetValue } from 'react-hook-form';
import { TypeSettingRealty } from 'widgets/settingForm/settingRealty/libr/TypeSettingRealty.ts';
import { valuesOfPropertyForm } from 'widgets/settingForm/settingRealty/libr/valuesOfPropertyForm.ts';
import { useTranslation } from 'react-i18next';
import { UniversalSelectDropdown } from 'entities/universalEntites/UniversalSelectDropdown.tsx';

interface Props {
    setValue: UseFormSetValue<TypeSettingRealty>;
    control: Control<TypeSettingRealty, string[]>;
}

export const Prepayment = ({ control, setValue }: Props) => {
    const prepaymentValues = valuesOfPropertyForm.property_prepayment;
    const { t } = useTranslation();

    return (
        <>
            <div className="prepayment">
                <h3>{t('filters.property_prepayment')}</h3>
                <UniversalSelectDropdown<TypeSettingRealty>
                    setValue={setValue}
                    control={control}
                    name="property_prepayment"
                    prefix="filterPropertyForm"
                    placeholder={t('filters.property_prepayment')}
                    closeMenuOnSelect={false}
                    isMulti={true}
                    options={prepaymentValues}
                />
            </div>
        </>
    );
};
