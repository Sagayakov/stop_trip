import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss'
import { Control, Controller } from 'react-hook-form';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';

interface Props {
    control: Control<FormAddAnn, string>;
    defaultValue?: string;
}

const AnnouncementDescriptionField = ({ defaultValue, control }: Props) => {
    const { t } = useTranslation();
    return (
        <div className={styles.ann_field}>
            <h3>{`${t('add-page.description')}:`}</h3>
            <Controller
                name="description"
                control={control}
                defaultValue={defaultValue || undefined}
                render={({ field }) => (
                    <textarea
                        {...field}
                        placeholder={t('add-page.description')}
                        maxLength={1000}
                    />
                )}
            />
            <div className={styles.ann_field_err}></div>
        </div>
    );
};

export default AnnouncementDescriptionField;
