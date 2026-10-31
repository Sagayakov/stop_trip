import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
import styles from 'entity/photoSlider/libr/photoSlider.module.scss';

/**
 * Кнопка «Поделиться»: на телефоне открывает системное меню (WhatsApp, Telegram…),
 * на компьютере копирует ссылку на объявление.
 */
export const ShareIcon = () => {
    const { t } = useTranslation();

    const copyLink = (link: string) =>
        navigator.clipboard.writeText(link).then(
            () => toast.info(`${t('advert-page.link-copied')}`, { toastId: 'copy link toast' }),
            () => toast.error(`${t('main-page.toast-error')}`, { toastId: 'copy link error toast' })
        );

    const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        const link = window.location.href;

        if (navigator.share) {
            try {
                await navigator.share({ title: document.title, url: link });
            } catch {
                // пользователь закрыл меню «Поделиться» — ничего не делаем
            }
            return;
        }
        copyLink(link);
    };

    return (
        <button
            type="button"
            className={styles.share_icon}
            onClick={handleClick}
            title={t('advert-page.share')}
            aria-label={t('advert-page.share')}
        >
            {/* Стрелка из коробки — привычный знак «Поделиться» */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                    d="M12 15V3m0 0L7.5 7.5M12 3l4.5 4.5M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </button>
    );
};
