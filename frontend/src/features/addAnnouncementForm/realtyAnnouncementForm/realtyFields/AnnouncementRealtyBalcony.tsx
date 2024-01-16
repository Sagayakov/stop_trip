import { UseFormRegister } from 'react-hook-form';
import { UniversalRadioGroup } from 'entity/universalEntites/UniversalRadioGroup';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss';

interface Props {
    register: UseFormRegister<FormAddAnn>;
    defaultValue?: string | null | undefined;
}

export const AnnouncementRealtyBalcony = ({
    register,
    defaultValue,
}: Props) => {
    const { t } = useTranslation();

    const optionValues = [
        { label: `${t('filters.loggia')}`, value: 'loggia' },
        { label: `${t('filters.no')}`, value: 'no' },
        { label: `${t('filters.yes')}`, value: 'yes' },
    ];
    return (
        <div className={styles.ann_field}>
            <h3>{t('filters.property_balcony')}</h3>
            <UniversalRadioGroup
                name="property_balcony"
                radioValues={optionValues}
                register={register}
                defaultValue={optionValues.find(
                    (el) => el.value === defaultValue
                )}
                className={styles.radio_group}
            />
            <div className={styles.ann_field_err}></div>
        </div>
    );
};
