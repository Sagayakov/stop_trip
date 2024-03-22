import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { UniversalRadioGroup } from 'entity/universalEntites/UniversalRadioGroup';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss';
import { useGetSelectOptionsQuery } from 'app/api/fetchAdverts.ts';
import { useAppSelector } from 'app/store/hooks';

interface Props {
    register: UseFormRegister<FormAddAnn>;
    defaultValue?: string | null | undefined;
    errors: FieldErrors<FormAddAnn>;
}

export const AnnoucementTransportDriveType = ({
    register,
    defaultValue,
    errors,
}: Props) => {
    const { t } = useTranslation();
    const { data } = useGetSelectOptionsQuery('');
    const lang = useAppSelector((state) => state.setLang.lang);

    return (
        <div className={styles.ann_field}>
            <h3>{t('filters.transport_drive_type')}:</h3>
            <UniversalRadioGroup
                register={register}
                name="transport_drive_type"
                radioValues={
                    (lang === 'ru'
                        ? data?.transport_drive_type
                        : data?.transport_drive_type.map((el) => ({
                              value: el.value,
                              label: `${el.value[0].toUpperCase()}${el.value.slice(
                                  1
                              )}`,
                          }))) || [{ value: ' ', label: ' ' }]
                }
                defaultValue={data?.transport_drive_type.find(
                    (el) => el.value === defaultValue
                )}
                className={styles.radio_group}
            />
            <div className={styles.ann_field_err}>
                {errors?.transport_drive_type?.message}
            </div>
        </div>
    );
};
