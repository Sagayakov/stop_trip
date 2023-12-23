import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss'
import { MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
interface Props{
    onClick: () => void
}
export const SuccessAddAnnouncement = ({ onClick }: Props) => {
    const { t } = useTranslation()
    return (
        <div
            className={styles.modal}
            onClick={(event: MouseEvent) => event.stopPropagation()}
        >
            <p>{t('advert-page.advertisement-added')}</p>
            <button onClick={onClick}>Ok</button>
        </div>
    );
}