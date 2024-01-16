import styles from 'pages/myAnnouncements/libr/myAnnouncements.module.scss';
import { SetStateAction } from 'react';

interface Props {
    setShowModal: (value: SetStateAction<boolean>) => void
}
export const AnnouncementOptions = ({ setShowModal }: Props) => {
    return <div
        className={styles.options}
        onClick={() => setShowModal(true)}
    >
        <div className={styles.option}></div>
        <div className={styles.option}></div>
        <div className={styles.option}></div>
    </div>
}