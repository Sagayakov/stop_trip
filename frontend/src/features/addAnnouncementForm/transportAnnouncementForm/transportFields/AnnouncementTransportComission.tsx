import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss';
import { useState } from 'react';

interface Props {
    register: UseFormRegister<FormAddAnn>;
    defaultValue?: number | null | undefined;
    errors: FieldErrors<FormAddAnn>;
}
export const AnnouncementTransportComission = ({
    register,
    defaultValue,
    errors,
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
            <h3>{t('filters.transport_commission')}:</h3>
            <div className={styles.inputNumber_group}>
                <input
                    type="text"
                    autoComplete="off"
                    {...register('transport_commission', {
                        pattern: {
                            value: /[0-9]*[.,]?[0-9]+/,
                            message: t('add-page.right-format'),
                        },
                        min: {
                            value: 0,
                            message: t('add-page.right-format'),
                        },
                    })}
                    placeholder={t('filters.transport_commission')}
                    onInput={(e) => handleInput(e)}
                    value={value}
                />
            </div>
            <div className={styles.ann_field_err}>
                {errors?.transport_commission?.message}
            </div>
        </div>
    );
};
