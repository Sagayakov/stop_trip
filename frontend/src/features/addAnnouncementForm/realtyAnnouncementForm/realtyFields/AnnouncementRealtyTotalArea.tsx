import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss';
import { useState } from 'react';

interface Props {
    register: UseFormRegister<FormAddAnn>;
    defaultValue?: string | null | undefined;
    errors: FieldErrors<FormAddAnn>;
}
export const AnnouncementRealtyTotalArea = ({
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
            <h3>{t('filters.property_area')}:</h3>
            <div className={styles.inputNumber_group}>
                <input
                    type="text"
                    pattern="[0-9]*[.,]?[0-9]+"
                    autoComplete="off"
                    min={0}
                    placeholder={t('filters.area')}
                    {...register('property_area')}
                    value={value}
                    onInput={(e) => handleInput(e)}
                />
            </div>
            <div className={styles.ann_field_err}>
                {errors?.property_house_type &&
                    errors.property_house_type.message}
            </div>
        </div>
    );
};
