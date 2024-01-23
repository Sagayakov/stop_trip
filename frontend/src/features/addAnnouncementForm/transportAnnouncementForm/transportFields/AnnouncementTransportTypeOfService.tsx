import { FormState, UseFormRegister } from 'react-hook-form';
import { UniversalRadioGroup } from 'entity/universalEntites/UniversalRadioGroup';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss';

interface Props {
    register: UseFormRegister<FormAddAnn>;
    defaultValue?: string | null | undefined;
    formState: FormState<FormAddAnn>;
}
export const AnnouncementTransportTypeOfService = ({
    register,
    defaultValue,
    formState
}: Props) => {
    const { t } = useTranslation();

    const radioValues = [
        { label: `${t('filters.rent')}`, value: 'rent' },
        { label: `${t('filters.sale')}`, value: 'sale' },
    ];

    return (
        <div className={styles.ann_field}>
            <h3>{t('filters.transport_type_of_service')}<span>*</span>:</h3>
            <UniversalRadioGroup
                register={register}
                name="transport_type_of_service"
                radioValues={radioValues}
                defaultValue={radioValues.find(
                    (el) => el.value === defaultValue
                )}
                className={styles.radio_group}
                requiredField={true}
            />
            <div className={styles.ann_field_err}>{formState?.errors?.transport_type_of_service?.message}</div>
        </div>
    );
};
