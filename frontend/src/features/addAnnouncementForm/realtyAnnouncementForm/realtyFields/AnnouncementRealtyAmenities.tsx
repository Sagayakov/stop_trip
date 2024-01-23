import { UniversalCheckboxGroup } from 'entity/universalEntites';
import { UseFormRegister } from 'react-hook-form';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss';

interface Props {
    register: UseFormRegister<FormAddAnn>;
    // defaultValue?: Options[] | undefined;
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

    const optionValues = [
        {value: 'kondicioner', label: 'Кондиционер'},
        {value: 'uvlazhnitel', label: 'Увлажнитель'},
        {value: 'wi-fi', label: 'wi-fi'}
    ]
    // const val = defaultValue?.map((el) => el.name.toLowerCase());
    // const defArr = optionValues.map((el) => defaultValue?.includes(el.label))

    const val: Options[] = [];
    defaultValue?.forEach((el) => {
        for (const optionValue of optionValues) {
            if(el.name.toLowerCase() === optionValue.label.toLowerCase()){
                val.push(optionValue)
            }
        }
    })
    return (
        <div className={styles.ann_field}>
            <h3>{t('filters.property_amenities')}:</h3>
            <UniversalCheckboxGroup
                checkboxValues={optionValues}
                name="property_amenities"
                register={register}
                // defaultValue={optionValues.find((el) => defaultValue?.includes(el))}
                defaultValue={val}
                className={styles.checkbox_group}
            />
            <div className={styles.ann_field_err}></div>
        </div>
    );
};
