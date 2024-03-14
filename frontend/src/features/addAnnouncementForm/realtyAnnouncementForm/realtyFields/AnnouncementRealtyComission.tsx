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
export const AnnouncementRealtyComission = ({
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
            <h3>{t('filters.property_commission')}:</h3>
            <div className={styles.inputNumber_group}>
                <input
                    type="text"
                    autoComplete="off"
                    {...register('property_commission', {
                        min: {
                            value: 0,
                            message: t('add-page.right-format'),
                        },
                        pattern: {
                            value: /[0-9]*[.,]?[0-9]+/,
                            message: t('add-page.right-format'),
                        },
                    })}
                    placeholder={t('filters.from')}
                    onInput={(e) => handleInput(e)}
                    value={value}
                />
            </div>
            <div className={styles.ann_field_err}>
                {formState?.errors?.property_commission?.message}
            </div>
        </div>
    );
};
