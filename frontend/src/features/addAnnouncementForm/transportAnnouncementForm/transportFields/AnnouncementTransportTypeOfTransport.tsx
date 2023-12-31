import { UseFormRegister } from 'react-hook-form';
import { UniversalRadioGroup } from 'entities/universalEntites/UniversalRadioGroup';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss'

interface Props {
    register: UseFormRegister<FormAddAnn>;
    defaultValue?: string | null | undefined;
}
export const AnnouncementTransportTypeOfTransport = ({ register, defaultValue }: Props) => {
    const { t } = useTranslation();

    const values = [
        { label: `${t('filters.ground')}`, value: 'ground' },
        { label: `${t('filters.water')}`, value: 'water' },
    ];
    return (
        <div className={styles.ann_field}>
            <h3>{t('filters.transport_type')}</h3>
            <UniversalRadioGroup
                name="transport_type"
                radioValues={values}
                register={register}
                defaultValue={values.find((el) => el.value === defaultValue)}
                className={styles.radio_group}
            />
            <div className={styles.ann_field_err}></div>
        </div>
    );
};
