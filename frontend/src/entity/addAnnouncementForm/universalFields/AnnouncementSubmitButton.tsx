import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss';

interface Props {
    isDisabled?: boolean;
    value?: string;
}

export const AnnouncementSubmitButton = ({
    isDisabled,
    value = 'post-advert',
}: Props) => {
    const { t } = useTranslation();

    return (
        <div className={styles.add_ann_form_button}>
            <input
                type="submit"
                disabled={isDisabled}
                value={t(`main-page.${value}`)}
            />
            <button className={styles.goBack}>{t('add-page.back')}</button>
        </div>
    );
};
