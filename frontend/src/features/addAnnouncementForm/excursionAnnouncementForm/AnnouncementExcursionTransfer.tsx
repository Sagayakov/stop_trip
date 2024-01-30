import { FormState, UseFormRegister } from 'react-hook-form';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss'
import { useLocation } from 'react-router-dom';

interface Props {
    register: UseFormRegister<FormAddAnn>;
    defaultValue?: boolean | undefined;
    formState: FormState<FormAddAnn>;
}

export const AnnouncementExcursionTransfer = ({ register, defaultValue, formState }: Props) => {
    const { t } = useTranslation();
    const location = useLocation().pathname.split('/')[1];
    const isRequired = location !== 'advertisement-editing';

    return (
        <div className={styles.ann_field}>
            <h3>{t('filters.excursion_transfer')}{isRequired && <span>*</span>}:</h3>
            <label>
                <input
                    type="checkbox"
                    {...register('excursion_transfer', {
                        required: {
                            value: isRequired,
                            message: t('add-page.required'),
                        },
                    })}
                    style={{ display: 'none' }}
                    defaultChecked={defaultValue}
                />
                <span>{t('filters.excursion_transfer')}</span>
            </label>
            <div className={styles.ann_field_err}>{formState?.errors?.excursion_transfer?.message}</div>
        </div>
    );
};
