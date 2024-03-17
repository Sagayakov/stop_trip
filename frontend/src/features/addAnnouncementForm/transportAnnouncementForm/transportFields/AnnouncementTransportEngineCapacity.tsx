import { FormState, UseFormRegister } from 'react-hook-form';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss';
import { useGetSelectOptionsQuery } from 'app/api/fetchAdverts.ts';
import { useState } from 'react';

interface Props {
    register: UseFormRegister<FormAddAnn>;
    defaultValue?: number | null | undefined;
    formState: FormState<FormAddAnn>;
}
export const AnnouncementTransportEngineCapacity = ({
    register,
    defaultValue,
    formState,
}: Props) => {
    const { t } = useTranslation();
    const { data } = useGetSelectOptionsQuery('');
    const { errors } = formState;
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
            <h3>{t('filters.transport_engine_volume')}:</h3>
            <div className={styles.inputNumber_group}>
                <input
                    type="text"
                    autoComplete="off"
                    {...register('transport_engine_volume', {
                        pattern: {
                            value: /^(?:(?:0|[1-9]\d*)(?:[.]\d+)?|[1-9]\d*\/[1-9]\d*)$/,
                            message: t('add-page.right-format'),
                        },
                        min: {
                            value: data?.transport_engine_volume.min || '0.1',
                            message: t('add-page.right-format'),
                        },
                        max: {
                            value: data?.transport_engine_volume.max || '9.9',
                            message: t('add-page.right-format'),
                        },
                    })}
                    placeholder={t('filters.volume')}
                    value={value}
                    onInput={(e) => handleInput(e)}
                />
            </div>
            <div className={styles.ann_field_err}>
                {errors?.transport_engine_volume?.message}
            </div>
        </div>
    );
};
