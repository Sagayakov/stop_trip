import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { FormState, UseFormRegister } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss';
//import { useLocation } from 'react-router-dom';

interface Props {
    register: UseFormRegister<FormAddAnn>;
    defaultValue?: boolean;
    formState: FormState<FormAddAnn>;
}

export const AnnouncementHomeVisit = ({
    register,
    defaultValue,
    formState,
}: Props) => {
    const { t } = useTranslation();
    //const location = useLocation().pathname.split('/')[1];
    //const isRequired = location !== 'advertisement-editing';

    return (
        <div className={styles.ann_field}>
            <h3>
                {t('filters.service_home_visit')}
                {/*{isRequired && <span>*</span>}*/}:
            </h3>
            <label>
                <input
                    type="checkbox"
                    {...register('service_home_visit', {
                        /* required: {
                            value: isRequired,
                            message: t('add-page.required'),
                        }, */
                    })}
                    style={{ display: 'none' }}
                    defaultChecked={defaultValue}
                />
                <span>{t('filters.service_home_visit')}</span>
            </label>
            <div className={styles.ann_field_err}>
                {formState?.errors?.service_home_visit?.message}
            </div>
        </div>
    );
};
