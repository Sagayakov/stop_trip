import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss'

interface Props{
    isDisabled?: boolean;
}

export const AnnouncementSubmitButton = ({ isDisabled }: Props) => {
    const { t } = useTranslation();
    return (
        <div className={styles.add_ann_form_button}>
            <input type="submit" disabled={isDisabled}  value={t('main-page.post-advert')} />
            <button className={styles.goBack}>{t('add-page.back')}</button>
        </div>
    );
};
