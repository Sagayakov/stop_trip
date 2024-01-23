import { FormState, UseFormRegister } from 'react-hook-form';
import { UniversalRadioGroup } from 'entity/universalEntites/UniversalRadioGroup';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss';

interface Props {
    register: UseFormRegister<FormAddAnn>;
    defaultValue?: string | undefined;
    formState: FormState<FormAddAnn>;
}
export const AnnouncementRealtyServise = ({
    register,
    defaultValue,
    formState
}: Props) => {
    const { t } = useTranslation();

    const radioValues = [
        { label: `${t('filters.sale')}`, value: 'sale' },
        { label: `${t('filters.rent')}`, value: 'rent' },
    ];

    return (
        <div className={styles.ann_field}>
            <h3>{t('filters.property_type_of_service')}<span>*</span>:</h3>
            <UniversalRadioGroup
                name="property_type_of_service"
                radioValues={radioValues}
                register={register}
                className={styles.radio_group}
                defaultValue={radioValues.find(
                    (el) => el.value === defaultValue
                )}
                requiredField={true}
            />
            <div className={styles.ann_field_err}>{formState?.errors?.property_type_of_service?.message}</div>
        </div>
    );
};
