import { useTranslation } from 'react-i18next';
import styles from './copyNumberMessage.module.scss';
import { toast } from 'react-toastify';

export const CopyNumberMessage = ({ phone }: { phone: string }) => {
    const { t } = useTranslation();

    const handleClick = () => {
        navigator.clipboard.writeText(phone).then(
            () => {
                const toastId = 'copy number clipboard success toast';
                toast.success(`${t('main-page.toast-number-saved')}`, {
                    toastId,
                });
            },
            (err) => {
                const toastId = 'copy number clipboard error toast';
                toast.error(`${t('main-page.toast-error')}`, {
                    toastId,
                    ...err,
                });
            }
        );
    };

    return (
        <div className={styles.copy_number_toast}>
            <p>{phone}</p>
            <button onClick={handleClick} className={styles.copy_button}>
                {t('main-page.toast-copy-btn')}
            </button>
        </div>
    );
};
