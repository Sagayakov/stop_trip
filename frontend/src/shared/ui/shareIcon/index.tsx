import { Share } from '../icons/icons-tools/Share';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
import styles from 'entity/photoSlider/libr/photoSlider.module.scss';

export const ShareIcon = () => {
    const { t } = useTranslation();

    const handleClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        event.stopPropagation();
        const path = window.location.href;

        navigator.clipboard.writeText(path).then(
            () => {
                const toastId = 'copy path clipboard success toast';
                toast.info(`${t('main-page.toast-copied')}`, { toastId });
            },
            (err) => {
                const toastId = 'copy path clipboard error toast';
                toast.error(`${t('main-page.toast-error')}`, {
                    ...err,
                    toastId,
                });
            }
        );
    };

    return (
        <div className={styles.share_icon} onClick={handleClick}>
            <Share />
        </div>
    );
};
