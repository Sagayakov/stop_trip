import { FormState, UseFormRegister } from 'react-hook-form';
import { UniversalRadioGroup } from 'entity/universalEntites/UniversalRadioGroup';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss';

interface Props {
    register: UseFormRegister<FormAddAnn>;
    defaultValue?: number | null | undefined;
    formState: FormState<FormAddAnn>;
}

export const AnnouncementRealtyRoomsQuantity = ({
    register,
    defaultValue,
    formState
}: Props) => {
    const { t } = useTranslation();
    // const { data } = useGetSelectOptionsQuery('');
    // console.log(data)

    const optionValues = [
        { value: 1, label: 1 },
        { value: 2, label: 2 },
        { value: 3, label: 3 },
        { value: 4, label: 4 },
    ];

    return (
        <div className={styles.ann_field}>
            <h3>{t('filters.property_rooms_count')}<span>*</span>:</h3>
            <div className={styles.radio_group}>
                <UniversalRadioGroup
                    radioValues={optionValues}
                    name="property_rooms_count"
                    register={register}
                    defaultValue={optionValues.find(
                        (el) => el.value === defaultValue) || undefined}
                    className={styles.radio_group}
                    requiredField={true}
                />
            </div>
            <div className={styles.ann_field_err}>{formState?.errors?.property_rooms_count?.message}</div>
        </div>
    );
};
