import { UseFormRegister } from 'react-hook-form';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss'

interface Props {
    register: UseFormRegister<FormAddAnn>;
}

export const AnnouncementExchangeRate = ({ register }: Props) => {
    const { t } = useTranslation();

    return (
        <div className={styles.ann_field}>
            <h3>{t('filters.exchange_rate')}:</h3>
            <input
                type="text"
                id={styles.ann_field_price}
                placeholder={t('filters.exchange_rate')}
                {...register('exchange_rate')}
            />
            <div className={styles.ann_field_err}></div>
        </div>
    );
};
