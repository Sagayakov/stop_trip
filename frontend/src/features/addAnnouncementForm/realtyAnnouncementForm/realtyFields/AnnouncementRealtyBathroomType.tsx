import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { UniversalRadioGroup } from 'entity/universalEntites/UniversalRadioGroup';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss';
import { useGetSelectOptionsQuery } from 'app/api/fetchAdverts.ts';
import { useAppSelector } from 'app/store/hooks';

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
    const lang = useAppSelector((state) => state.setLang.lang);

    return (
        <div className={styles.ann_field}>
            <h3>{t('filters.property_bathroom_type')}:</h3>
            <div className={styles.radio_group}>
                {data && (
                    <UniversalRadioGroup
                        name="property_bathroom_type"
                        radioValues={
                            lang === 'ru'
                                ? data.property_bathroom_type
                                : data.property_bathroom_type.map((el) => ({
                                      value: el.value,
                                      label: el.value,
                                  }))
                        }
                        register={register}
                        defaultValue={
                            data?.property_bathroom_type?.find(
                                (el) => el.value === defaultValue
                            ) || { value: '', label: '' }
                        }
                        className={styles.radio_group}
                    />
                )}
            </div>
            <div className={styles.ann_field_err}>
                {errors?.property_bathroom_type &&
                    errors.property_bathroom_type.message}
            </div>
        </div>
    );
};
