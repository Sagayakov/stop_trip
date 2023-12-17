import { Control, UseFormSetValue } from 'react-hook-form';
import { UniversalSelectDropdown } from 'entities/universalEntites/UniversalSelectDropdown';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { valuesOfPropertyForm } from 'widgets/settingForm/settingRealty/libr/valuesOfPropertyForm.ts';
import { useTranslation } from 'react-i18next';

interface Props {
    setValue: UseFormSetValue<FormAddAnn>;
    control: Control<FormAddAnn, string[]>;
}

export const AnnouncementRealtyRentalCondition = ({
    setValue,
    control,
}: Props) => {
    const optionValues = valuesOfPropertyForm.property_rental_condition;
    const { t } = useTranslation();

    return (
        <div className="ann-field">
            <h3>{t('filters.property_rental_condition')}</h3>
            <UniversalSelectDropdown<FormAddAnn>
                closeMenuOnSelect={true}
                control={control}
                isMulti={false}
                name="property_rental_condition"
                options={optionValues}
                placeholder={t('filters.property_rental_condition')}
                prefix="filterAnnouncementCategory"
                setValue={setValue}
            />
            <div className="ann-field-err"></div>
        </div>
    );
};
