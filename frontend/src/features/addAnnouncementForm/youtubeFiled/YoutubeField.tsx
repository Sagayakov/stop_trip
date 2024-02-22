import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss';
import { useTranslation } from 'react-i18next';
import { UseFormRegister } from 'react-hook-form';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';

interface Props {
    register: UseFormRegister<FormAddAnn>;
    defaultValue?: string;
}

export const YoutubeField = ({ register, defaultValue }: Props) => {
    const { t } = useTranslation();
    return (
        <div className={styles.ann_field}>
            <h3>{`${t('add-page.youtube')}:`}</h3>
            <input
                type="text"
                placeholder={t('add-page.youtube-placeholder')}
                minLength={1}
                maxLength={100}
                defaultValue={defaultValue}
                {...register('youtube')}
            />
            <div className={styles.ann_field_err}></div>
        </div>
    );
}