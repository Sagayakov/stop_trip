import { UniversalCheckboxGroup } from 'entity/universalEntites';
import { UseFormRegister } from 'react-hook-form';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss';
import { useGetSelectOptionsQuery } from 'app/api/fetchAdverts.ts';

interface Props {
    register: UseFormRegister<FormAddAnn>;
    defaultValue?: Amenity[] | undefined;
}
type Amenity = {
    name: string;
};
interface Options {
    value: string;
    label: string;
}

export const AnnouncementRealtyAmenities = ({
    register,
    defaultValue,
}: Props) => {
    const { t } = useTranslation();
    const { data } = useGetSelectOptionsQuery('');

    const val: Options[] = [];
    defaultValue?.forEach((el) => {
        for (const optionValue of data!.property_amenities) {
            if(el.name.toLowerCase() === optionValue.label.toLowerCase()){
                val.push(optionValue)
            }
        }
    })
    return (
        <div className={styles.ann_field}>
            <h3>{t('filters.property_amenities')}:</h3>
            <UniversalCheckboxGroup
                checkboxValues={data!.property_amenities}
                name="property_amenities"
                register={register}
                defaultValue={val}
                className={styles.checkbox_group}
            />
            <div className={styles.ann_field_err}></div>
        </div>
    );
};
