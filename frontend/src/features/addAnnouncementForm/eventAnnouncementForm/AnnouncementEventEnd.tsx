import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { FormState, UseFormRegister, UseFormWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss';

interface Props {
    register: UseFormRegister<FormAddAnn>;
    defaultValue?: string | null | undefined;
    formState: FormState<FormAddAnn>;
    watch: UseFormWatch<FormAddAnn>;
}

export const AnnouncementEventEnd = ({
    register,
    defaultValue,
    formState,
    watch,
}: Props) => {
    const { t } = useTranslation();
    const startDate = watch('start_date');

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
                defaultValue={
                    defaultValue
                        ? new Date(defaultValue)
                              .toLocaleDateString('ru')
                              .split('.')
                              .reverse()
                              .join('-')
                        : ''
                }
                min={startDate || ''}
            />
            <input
                type="time"
                defaultValue={
                    defaultValue
                        ? `${new Date(defaultValue)
                              .getHours()
                              .toString()
                              .padStart(2, '0')}:${new Date(defaultValue)
                              .getMinutes()
                              .toString()
                              .padStart(2, '0')}`
                        : ''
                }
                {...register('end_time')}
            />
            <div className={styles.ann_field_err}>
                {formState?.errors?.end_date?.message}
            </div>
        </div>
    );
};
