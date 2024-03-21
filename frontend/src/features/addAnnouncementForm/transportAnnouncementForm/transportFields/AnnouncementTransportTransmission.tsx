import { FormState, UseFormRegister } from 'react-hook-form';
import { UniversalRadioGroup } from 'entity/universalEntites/UniversalRadioGroup';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss';
import { useGetSelectOptionsQuery } from 'app/api/fetchAdverts.ts';

interface Props {
    register: UseFormRegister<FormAddAnn>;
    defaultValue?: string | null | undefined;
    formState: FormState<FormAddAnn>;
}

export const AnnouncementTransportTransmission = ({
    register,
    defaultValue,
    formState
}: Props) => {
    const { data } = useGetSelectOptionsQuery('');
    const { t } = useTranslation();

    return (
        <div className={styles.ann_field}>
            <h3>{t('filters.transport_transmission_type')}:</h3>
            <UniversalRadioGroup
                register={register}
                name="transport_transmission_type"
                defaultValue={data?.transport_transmission_type.find(
                    (el) => el.value === defaultValue
                )}
                radioValues={data?.transport_transmission_type || [{value: ' ', label: ' '}]}
                className={styles.radio_group}
            />
            <div className={styles.ann_field_err}>{formState?.errors?.transport_transmission_type?.message}</div>
        </div>
    );
};
