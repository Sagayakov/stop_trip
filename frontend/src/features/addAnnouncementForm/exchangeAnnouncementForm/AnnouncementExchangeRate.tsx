import { FormState, UseFormRegister } from 'react-hook-form';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss';
import { useState } from 'react';

interface Props {
    register: UseFormRegister<FormAddAnn>;
    defaultValue?: string | null | undefined;
    formState: FormState<FormAddAnn>;
}

export const AnnouncementExchangeRate = ({
    register,
    defaultValue,
    formState,
}: Props) => {
    const { t } = useTranslation();
    const [value, setValue] = useState(defaultValue || '');

    const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
        const lastNumber = e.currentTarget.value.at(-1);
        if (lastNumber && lastNumber === ',') {
            setValue(e.currentTarget.value.replace(lastNumber, '.'));
            return;
        }
        if (
            lastNumber &&
            !Number(lastNumber) &&
            lastNumber !== '0' &&
            lastNumber !== '.' &&
            lastNumber !== ','
        ) {
            setValue(e.currentTarget.value.replace(lastNumber, ''));
            return;
        }
        setValue(e.currentTarget.value);
    };

    return (
        <div className={styles.ann_field}>
            <h3>
                {t('filters.exchange_rate')}
                <span>*</span>:
            </h3>
            <input
                type="text"
                id={styles.ann_field_price}
                placeholder={t('filters.exchange_rate')}
                {...register('exchange_rate', {
                    required: {
                        value: true,
                        message: t('add-page.required'),
                    },
                })}
                value={value}
                onInput={(e) => handleInput(e)}
            />
            <div className={styles.ann_field_err}>
                {formState?.errors?.exchange_rate?.message}
            </div>
        </div>
    );
};
