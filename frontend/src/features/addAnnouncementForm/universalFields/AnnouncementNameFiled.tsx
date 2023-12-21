import { FormState, UseFormRegister } from 'react-hook-form';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss'

interface Props {
    register: UseFormRegister<FormAddAnn>;
    formState: FormState<FormAddAnn>;
}

const AnnouncementNameField = ({ register, formState }: Props) => {
    const { t } = useTranslation();
    const { errors } = formState;

    return (
        <div className={styles.ann_field}>
            <h3>
                {t('add-page.advert-title')}
                <span>*</span>:
            </h3>
            <input
                type="text"
                minLength={1}
                maxLength={100}
                placeholder={t('add-page.title')}
                style={
                    errors?.title
                        ? {
                              border: '1px solid red',
                          }
                        : {}
                }
                {...register('title', { required: true })}
            />
            <div className={styles.ann_field_err}>
                {errors?.title && `${t('add-page.enter-title')}`}
            </div>
        </div>
    );
};

export default AnnouncementNameField;
