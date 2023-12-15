import { Control, UseFormSetValue } from 'react-hook-form';
import { UniversalSelectDropdown } from '../../../../entities/universalDropdown/UniversalSelectDropdown';
import { FormAddAnn } from '../../../../pages/addAnnouncement/libr/AnnouncementFormTypes';
import { valuesOfPropertyForm } from '../../../../widgets/settingForm/settingRealty/libr/valuesOfPropertyForm';
import { useMatchMedia } from '../../../../app/hooks/useMatchMedia';
import { useTranslation } from 'react-i18next';

interface Props {
    setValue: UseFormSetValue<FormAddAnn>;
    control: Control<FormAddAnn, string[]>;
}

export const AnnouncementRealtyCity = ({ setValue, control }: Props) => {
    const { isMobile } = useMatchMedia();
    const optionValues = valuesOfPropertyForm.property_city;
    const { t } = useTranslation();

    return (
        <div className="ann-field">
            <h3>{t('filters.property_city')}</h3>
            <UniversalSelectDropdown<FormAddAnn>
                closeMenuOnSelect={true}
                control={control}
                isMulti={false}
                name="property_city"
                options={optionValues}
                placeholder={t('filters.choose-city')}
                prefix="filterAnnouncementCategory"
                setValue={setValue}
                isSearchable={!isMobile}
            />
            <div className="ann-field-err"></div>
        </div>
    );
};
