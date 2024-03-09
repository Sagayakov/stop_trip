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

export const AnnoucementTransportDriveType = ({
    register,
    defaultValue,
    errors,
}: Props) => {
    const { t } = useTranslation();
    const { data } = useGetSelectOptionsQuery('');

    return (
        <div className={styles.ann_field}>
            <h3>{t('filters.transport_drive_type')}:</h3>
            <UniversalRadioGroup
                register={register}
                name="transport_drive_type"
                radioValues={
                    data?.transport_drive_type || [{ value: ' ', label: ' ' }]
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
