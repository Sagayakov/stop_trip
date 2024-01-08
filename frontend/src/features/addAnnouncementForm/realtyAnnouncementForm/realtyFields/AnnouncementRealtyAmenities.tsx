import { UniversalCheckboxGroup } from 'entities/universalEntites';
import { UseFormRegister } from 'react-hook-form';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { valuesOfPropertyForm } from 'widgets/settingForm/settingRealty/libr/valuesOfPropertyForm.ts';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss'

interface Props {
    register: UseFormRegister<FormAddAnn>;
    defaultValue?: Amenity[] | undefined;
}
type Amenity = {
    name: string
}

export const AnnouncementRealtyAmenities = ({ register, defaultValue }: Props) => {
    const { t } = useTranslation();

    const optionValues = valuesOfPropertyForm.property_amenities;
    const val = defaultValue?.map((el) => el.name)
    // console.log(val)
    return (
        <div className={styles.ann_field}>
            <h3>{t('filters.property_amenities')}</h3>
            <UniversalCheckboxGroup
                checkboxValues={optionValues}
                name="property_amenities"
                register={register}
                defaultValue={val}
                className={styles.checkbox_group}
            />
            <div className={styles.ann_field_err}></div>
        </div>
    );
};
