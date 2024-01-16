import { UseFormRegister } from 'react-hook-form';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss'

interface Props {
    register: UseFormRegister<FormAddAnn>;
    defaultValue?: number | null | undefined;
}
export const AnnouncementTransportEngineCapacity = ({ register, defaultValue }: Props) => {
    const { t } = useTranslation();

    return (
        <div className={styles.ann_field}>
            <h3>{t('filters.transport_engine_volume')}</h3>
            <div className={styles.inputNumber_group}>
                <input
                    type="text"
                    pattern="[0-9]*[.,]?[0-9]+"
                    autoComplete="off"
                    defaultValue={defaultValue || ''}
                    {...register('transport_engine_volume')}
                    min="1"
                    max="2.7"
                    placeholder={t('filters.volume')}
                />
            </div>
            <div className={styles.ann_field_err}></div>
        </div>
    );
};
