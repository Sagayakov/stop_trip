import { FormState, UseFormRegister } from 'react-hook-form';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss';
import { useState } from 'react';

interface Props {
    register: UseFormRegister<FormAddAnn>;
    formState: FormState<FormAddAnn>;
    defaultValue?: number | null;
}

const AnnouncementPriceField = ({
    register,
    formState,
    defaultValue,
}: Props) => {
    const { errors } = formState;
    const { t } = useTranslation();
    const [value, setValue] = useState(getDefaultPrice() || '');

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

    function getDefaultPrice() {
        if (defaultValue) {
            return defaultValue.toString().slice(0, -3);
        }
    }

    return (
        <div className={styles.ann_field}>
            <h3>{t('add-page.price')}:</h3>
            <input
                type="text"
                pattern="[0-9]*[.,]?[0-9]+"
                id={styles.ann_field_price}
                placeholder={t('add-page.price')}
                style={errors?.price ? { border: '1px solid red' } : {}}
                {...register('price')}
                onInput={(e) => handleInput(e)}
                min="0"
                max="99999999.99"
                value={value}
            />
            <div className={styles.ann_field_err}>
                {errors?.price && errors.price.message}
            </div>
        </div>
    );
};

export default AnnouncementPriceField;
