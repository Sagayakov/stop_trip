import { UseFormRegister } from 'react-hook-form';
import { UniversalRadioGroup } from 'entity/universalEntites/UniversalRadioGroup';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss';

interface Props {
    register: UseFormRegister<FormAddAnn>;
    defaultValue?: number | null | undefined;
}

export const AnnouncementRealtyRoomsQuantity = ({
    register,
    defaultValue,
}: Props) => {
    const { t } = useTranslation();

    const optionValues = [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
    ];
    return (
        <div className={styles.ann_field}>
            <h3>{t('filters.property_rooms_count')}</h3>
            <div className={styles.radio_group}>
                <UniversalRadioGroup
                    radioValues={optionValues}
                    name="property_rooms_count"
                    register={register}
                    defaultValue={optionValues.find(
                        (el) => el.value === String(defaultValue)
                    )}
                    className={styles.radio_group}
                />
            </div>
            <div className={styles.ann_field_err}></div>
        </div>
    );
};
