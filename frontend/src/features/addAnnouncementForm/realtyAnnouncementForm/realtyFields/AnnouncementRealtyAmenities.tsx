import { UniversalCheckboxGroup } from 'entities/universalEntites';
import { UseFormRegister } from 'react-hook-form';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { valuesOfPropertyForm } from 'widgets/settingForm/settingRealty/libr/valuesOfPropertyForm.ts';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss'

interface Props {
    register: UseFormRegister<FormAddAnn>;
}

export const AnnouncementRealtyAmenities = ({ register }: Props) => {
    const { t } = useTranslation();

    const optionValues = valuesOfPropertyForm.property_amenities;

    return (
        <div className={styles.ann_field}>
            <h3>{t('filters.property_amenities')}</h3>
            <UniversalCheckboxGroup
                checkboxValues={optionValues}
                name="property_amenities"
                register={register}
                className={styles.checkbox_group}
            />
            <div className={styles.ann_field_err}></div>
        </div>
    );
};
