import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss';
import { useNavigate } from 'react-router-dom';
import { scrollToTop } from 'shared/utils/scrollToTop';

interface Props {
    isDisabled?: boolean;
    value?: string;
}

export const AnnouncementSubmitButton = ({
    isDisabled,
    value = 'post-advert',
}: Props) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleCancel = () => {
        scrollToTop();
        navigate('/');
    };

    return (
        <div className={styles.add_ann_form_button}>
            <input
                type="submit"
                disabled={isDisabled}
                value={t(`main-page.${value}`)}
            />
            <button className={styles.goBack} onClick={handleCancel}>
                {t('add-page.cancel')}
            </button>
        </div>
    );
};
