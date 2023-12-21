import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss'

interface Props {
    descript: string | undefined;
    setDescript: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const AnnouncementDescriptionField = ({ descript, setDescript }: Props) => {
    const { t } = useTranslation();

    return (
        <div className={styles.ann_field}>
            <h3>{`${t('add-page.description')}:`}</h3>
            <textarea
                placeholder={t('add-page.description')}
                maxLength={1000}
                value={descript}
                onChange={(event) => setDescript(event.target.value)}
            />
            <div className={styles.ann_field_err}></div>
        </div>
    );
};

export default AnnouncementDescriptionField;
