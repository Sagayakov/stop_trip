import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { UniversalRadioGroup } from 'entity/universalEntites/UniversalRadioGroup';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss';
import { useGetSelectOptionsQuery } from 'app/api/fetchAdverts.ts';

interface Props {
    register: UseFormRegister<FormAddAnn>;
    defaultValue?: string | null | undefined;
    errors: FieldErrors<FormAddAnn>;
}

export const AnnouncementRealtyBalcony = ({
    register,
    defaultValue,
    errors,
}: Props) => {
    const { t } = useTranslation();
    const { data } = useGetSelectOptionsQuery('');

    return (
        <div className={styles.ann_field}>
            <h3>{t('filters.property_balcony')}:</h3>
            <UniversalRadioGroup
                name="property_balcony"
                radioValues={
                    data?.property_balcony || [{ value: ' ', label: ' ' }]
                }
                register={register}
                defaultValue={data?.property_balcony.find(
                    (el) => el.value === defaultValue
                )}
                className={styles.radio_group}
            />
            <div className={styles.ann_field_err}>
                {errors?.property_balcony && errors.property_balcony.message}
            </div>
        </div>
    );
};
