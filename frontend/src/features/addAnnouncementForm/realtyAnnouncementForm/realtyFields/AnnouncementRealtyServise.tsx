import { FormState, UseFormRegister } from 'react-hook-form';
import { UniversalRadioGroup } from 'entity/universalEntites/UniversalRadioGroup';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss';
import { useGetSelectOptionsQuery } from 'app/api/fetchAdverts.ts';
import { useAppSelector } from 'app/store/hooks';

interface Props {
    register: UseFormRegister<FormAddAnn>;
    defaultValue?: string | undefined;
    formState: FormState<FormAddAnn>;
}
export const AnnouncementRealtyServise = ({
    register,
    defaultValue,
    formState,
}: Props) => {
    const { t } = useTranslation();
    const { data } = useGetSelectOptionsQuery('');
    const lang = useAppSelector((state) => state.setLang.lang);

    return (
        <div className={styles.ann_field}>
            <h3>
                {t('filters.property_type_of_service')}
                <span>*</span>:
            </h3>
            {data && (
                <UniversalRadioGroup
                    name="property_type_of_service"
                    radioValues={
                        lang === 'ru'
                            ? data.property_type_of_service
                            : data.property_type_of_service.map((el) => ({
                                  value: el.value,
                                  label: `${el.value[0].toUpperCase()}${el.value.slice(
                                      1
                                  )}`,
                              }))
                    }
                    register={register}
                    className={styles.radio_group}
                    defaultValue={
                        data?.property_type_of_service?.find(
                            (el) => el.value === defaultValue
                        ) || { value: '', label: '' }
                    }
                    requiredField={true}
                />
            )}
            <div className={styles.ann_field_err}>
                {formState?.errors?.property_type_of_service?.message}
            </div>
        </div>
    );
};
