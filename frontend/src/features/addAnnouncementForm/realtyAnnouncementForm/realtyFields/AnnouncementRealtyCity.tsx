import { Control, UseFormSetValue } from 'react-hook-form';
import { UniversalSelectDropdown } from 'entity/universalEntites/UniversalSelectDropdown';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { valuesOfPropertyForm } from 'widgets/settingForm/settingRealty/libr/valuesOfPropertyForm.ts';
import { useMatchMedia } from 'app/hooks/useMatchMedia.ts';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss';
import { getDefaultValue } from 'features/addAnnouncementForm/getDefaultValue.ts';
import { StringOptions } from 'app/api/types/selectOptionValues.ts';

interface Props {
    setValue: UseFormSetValue<FormAddAnn>;
    control: Control<FormAddAnn, string[]>;
    defaultValue?: { name: string } | null | undefined;
}

export const AnnouncementRealtyCity = ({
    setValue,
    control,
    defaultValue,
}: Props) => {
    const { isMobile } = useMatchMedia();
    const optionValues = valuesOfPropertyForm.property_city;
    const { t } = useTranslation();

    return (
        <div className={styles.ann_field}>
            <h3>{t('filters.property_city')}</h3>
            <UniversalSelectDropdown<FormAddAnn>
                closeMenuOnSelect={true}
                control={control}
                isMulti={false}
                name="property_city"
                options={optionValues}
                placeholder={t('filters.choose-city')}
                prefix="filterAnnouncementCategory"
                defaultValue={getDefaultValue(defaultValue?.name, optionValues) as StringOptions}
                setValue={setValue}
                isSearchable={!isMobile}
            />
            <div className={styles.ann_field_err}></div>
        </div>
    );
};
