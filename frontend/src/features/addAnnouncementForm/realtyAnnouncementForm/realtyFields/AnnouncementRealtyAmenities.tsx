import { UniversalCheckboxGroup } from 'entity/universalEntites';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss';
import { useGetSelectOptionsQuery } from 'app/api/fetchAdverts.ts';
import { useAppSelector } from 'app/store/hooks';

interface Props {
    register: UseFormRegister<FormAddAnn>;
    defaultValue?: Amenity[] | undefined;
    errors: FieldErrors<FormAddAnn>;
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
    errors,
}: Props) => {
    const { t } = useTranslation();
    const { data } = useGetSelectOptionsQuery('');
    const lang = useAppSelector((state) => state.setLang.lang);

    const val: Options[] = [];
    defaultValue?.forEach((el) => {
        for (const optionValue of data!.property_amenities) {
            if (el.name.toLowerCase() === optionValue.label.toLowerCase()) {
                val.push(optionValue);
            }
        }
    });
    return (
        <div className={styles.ann_field}>
            <h3>{t('filters.property_amenities')}:</h3>
            <UniversalCheckboxGroup
                checkboxValues={
                    (lang === 'ru'
                        ? data?.property_amenities
                        : data?.property_amenities.map((el) => ({
                              value: el.value,
                              label: el.value,
                          }))) || [{ value: '', label: '' }]
                }
                name="property_amenities"
                register={register}
                defaultValue={val}
                className={styles.checkbox_group}
            />
            <div className={styles.ann_field_err}>
                {errors?.property_amenities &&
                    errors.property_amenities.message}
            </div>
        </div>
    );
};
