import { Control, UseFormSetValue } from 'react-hook-form';
import { UniversalSelectDropdown } from 'entities/universalEntites/UniversalSelectDropdown';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { valuesOfPropertyForm } from 'widgets/settingForm/settingRealty/libr/valuesOfPropertyForm.ts';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss'
import { getDefaultValue } from 'features/addAnnouncementForm/getDefaultValue.ts';

interface Props {
    setValue: UseFormSetValue<FormAddAnn>;
    control: Control<FormAddAnn, string[]>;
    defaultValue?: string | null | undefined;
}

export const AnnouncementRealtyPrepayment = ({ setValue, control, defaultValue }: Props) => {
    const optionValues = valuesOfPropertyForm.property_prepayment;
    const { t } = useTranslation();

    return (
        <div className={styles.ann_field}>
            <h3>{t('filters.property_prepayment')}</h3>
            <UniversalSelectDropdown<FormAddAnn>
                closeMenuOnSelect={true}
                control={control}
                isMulti={false}
                name="property_prepayment"
                options={optionValues}
                placeholder={t('filters.property_prepayment')}
                defaultValue={getDefaultValue(defaultValue, optionValues)}
                prefix="filterAnnouncementCategory"
                setValue={setValue}
            />
            <div className={styles.ann_field_err}></div>
        </div>
    );
};
