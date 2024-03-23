import { FormState, UseFormRegister } from 'react-hook-form';
import { UniversalRadioGroup } from 'entity/universalEntites/UniversalRadioGroup';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss';
import { useGetSelectOptionsQuery } from 'app/api/fetchAdverts.ts';
import { useAppSelector } from 'app/store/hooks';

interface Props {
    register: UseFormRegister<FormAddAnn>;
    defaultValue?: string | null | undefined;
    formState: FormState<FormAddAnn>;
}
export const AnnouncementRealtyRentDuration = ({
    register,
    defaultValue,
    formState,
}: Props) => {
    const { t } = useTranslation();
    const { data } = useGetSelectOptionsQuery('');
    const lang = useAppSelector((state) => state.setLang.lang);

    return (
        <div className={styles.ann_field}>
            <h3>{t('add-page.rent-duration')}:</h3>
            <UniversalRadioGroup
                register={register}
                name="property_rent_duration"
                radioValues={
                    (lang === 'ru'
                        ? data?.property_rent_duration
                        : data?.property_rent_duration.map((el) => ({
                              value: el.value,
                              label: `${el.value[0].toUpperCase()}${el.value.slice(
                                  1
                              )}`,
                          }))) || [{ value: ' ', label: ' ' }]
                }
                defaultValue={data?.property_rent_duration.find(
                    (el) => el.value === defaultValue
                )}
                className={styles.radio_group}
            />
            <div className={styles.ann_field_err}>
                {formState?.errors?.transport_type_of_service?.message}
            </div>
        </div>
    );
};
