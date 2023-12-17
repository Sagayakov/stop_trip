import { Share } from '../icons/icons-tools/Share';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';

export const ShareIcon = () => {
    const { t } = useTranslation();

    const handleClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        event.stopPropagation();
        const path = window.location.href;

        navigator.clipboard.writeText(path).then(
            () => toast.info(`${t('advert-page.toast-copied')}`),
            (err) => toast.error(`${t('advert-page.toast-error')}`, err)
        );
    };

    return (
        <div className="share-icon" onClick={handleClick}>
            <Share />
        </div>
    );
};
