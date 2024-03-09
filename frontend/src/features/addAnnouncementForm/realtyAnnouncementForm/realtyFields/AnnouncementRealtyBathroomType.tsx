import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { UniversalRadioGroup } from 'entity/universalEntites/UniversalRadioGroup';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss';
import { useGetSelectOptionsQuery } from 'app/api/fetchAdverts.ts';

interface Props {
    register: UseFormRegister<FormAddAnn>;
    defaultValue?: string | null | undefined;
    errors: FieldErrors<FormAddAnn>;
}

export const AnnouncementRealtyBathroomType = ({
    register,
    defaultValue,
    errors,
}: Props) => {
    const { t } = useTranslation();
    const { data } = useGetSelectOptionsQuery('');

    return (
        <div className={styles.ann_field}>
            <h3>{t('filters.property_bathroom_type')}:</h3>
            <div className={styles.radio_group}>
                <UniversalRadioGroup
                    name="property_bathroom_type"
                    radioValues={data!.property_bathroom_type}
                    register={register}
                    defaultValue={data?.property_bathroom_type.find(
                        (el) => el.value === defaultValue
                    )}
                    className={styles.radio_group}
                />
            </div>
            <div className={styles.ann_field_err}>
                {errors?.property_bathroom_type &&
                    errors.property_bathroom_type.message}
            </div>
        </div>
    );
};
