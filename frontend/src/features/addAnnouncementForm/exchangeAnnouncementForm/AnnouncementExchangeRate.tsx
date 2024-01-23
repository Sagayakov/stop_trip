import { FormState, UseFormRegister } from 'react-hook-form';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss'

interface Props {
    register: UseFormRegister<FormAddAnn>;
    defaultValue?: string | null | undefined;
    formState: FormState<FormAddAnn>;
}

export const AnnouncementExchangeRate = ({ register, defaultValue, formState }: Props) => {
    const { t } = useTranslation();

    return (
        <div className={styles.ann_field}>
            <h3>{t('filters.exchange_rate')}<span>*</span>:</h3>
            <input
                type="text"
                id={styles.ann_field_price}
                defaultValue={defaultValue!}
                placeholder={t('filters.exchange_rate')}
                {...register('exchange_rate', {
                    required: {
                        value: true,
                        message: t('add-page.required'),
                    },
                })}
            />
            <div className={styles.ann_field_err}>{formState?.errors?.exchange_rate?.message}</div>
        </div>
    );
};
