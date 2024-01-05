import { Share } from '../icons/icons-tools/Share';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
import styles from 'entities/photoSlider/libr/photoSlider.module.scss';

export const ShareIcon = () => {
    const { t } = useTranslation();

    const handleClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        event.stopPropagation();
        const path = window.location.href;

        navigator.clipboard.writeText(path).then(
            () => toast.info(`${t('main-page.toast-copied')}`),
            (err) => toast.error(`${t('main-page.toast-error')}`, err)
        );
    };

    return (
        <div className={styles.share_icon} onClick={handleClick}>
            <Share />
        </div>
    );
};
