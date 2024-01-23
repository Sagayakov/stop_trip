import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { FormState, UseFormRegister } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss';

interface Props {
    register: UseFormRegister<FormAddAnn>;
    defaultValue?: string | null | undefined;
    formState: FormState<FormAddAnn>;
}

export const AnnouncementEventEnd = ({ register, defaultValue, formState }: Props) => {
    const { t } = useTranslation();

    return (
        <div className={styles.ann_field}>
            <h3>
                {t('filters.date-end')}
                <span>*</span>:
            </h3>
            <input
                type="date"
                {...register('end_date', {
                    required: {
                        value: true,
                        message: t('add-page.required'),
                    },
                })}
                defaultValue={defaultValue?.slice(0, 10) || ''}
            />
            <div className={styles.ann_field_err}>{formState?.errors?.end_date?.message}</div>
        </div>
    );
};
