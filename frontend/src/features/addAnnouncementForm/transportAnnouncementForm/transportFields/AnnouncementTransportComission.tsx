import { UseFormRegister } from 'react-hook-form';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss'

interface Props {
    register: UseFormRegister<FormAddAnn>;
    defaultValue?: number | null | undefined;
}
export const AnnouncementTransportComission = ({ register, defaultValue }: Props) => {
    const { t } = useTranslation();

    return (
        <div className={styles.ann_field}>
            <h3>{t('filters.transport_commission')}</h3>
            <div className={styles.inputNumber_group}>
                <input
                    type="text"
                    pattern="[0-9]*[.,]?[0-9]+"
                    autoComplete="off"
                    {...register('transport_commission')}
                    defaultValue={defaultValue || ''}
                    min={1}
                    placeholder={t('filters.transport_commission')}
                />
            </div>
            <div className={styles.ann_field_err}></div>
        </div>
    );
};
