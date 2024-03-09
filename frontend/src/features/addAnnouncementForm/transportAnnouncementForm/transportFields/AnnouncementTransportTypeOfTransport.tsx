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
export const AnnouncementTransportTypeOfTransport = ({
    register,
    defaultValue,
    formState,
}: Props) => {
    const { t } = useTranslation();
    const { data } = useGetSelectOptionsQuery('');

    return (
        <div className={styles.ann_field}>
            <h3>
                {t('filters.transport_type')}
                <span>*</span>:
            </h3>
            <UniversalRadioGroup
                name="transport_type"
                radioValues={
                    data?.transport_type || [{ value: ' ', label: ' ' }]
                }
                register={register}
                defaultValue={data?.transport_type.find(
                    (el) => el.value === defaultValue
                )}
                className={styles.radio_group}
                requiredField={true}
            />
            <div className={styles.ann_field_err}>
                {formState?.errors?.transport_type?.message}
            </div>
        </div>
    );
};
