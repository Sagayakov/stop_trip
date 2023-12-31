import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss'

interface Props {
    descript: string | undefined;
    setDescript: React.Dispatch<React.SetStateAction<string | undefined>>;
    defaultValue?: string;
}

const AnnouncementDescriptionField = ({ descript, setDescript, defaultValue }: Props) => {
    const { t } = useTranslation();
    console.log()
    return (
        <div className={styles.ann_field}>
            <h3>{`${t('add-page.description')}:`}</h3>
            <textarea
                placeholder={t('add-page.description')}
                maxLength={1000}
                value={descript}
                defaultValue={defaultValue}
                onChange={(event) => setDescript(event.target.value)}
            />
            <div className={styles.ann_field_err}></div>
        </div>
    );
};

export default AnnouncementDescriptionField;
