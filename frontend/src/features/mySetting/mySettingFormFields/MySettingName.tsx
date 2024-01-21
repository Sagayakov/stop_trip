import { Control, Controller, FieldErrors } from 'react-hook-form';
import styles from 'pages/mySettings/libr/mySettings.module.scss';
import { useTranslation } from 'react-i18next';
import { SettingTypes } from 'pages/mySettings/types/settingTypes.ts';
import { User } from 'app/api/types/user.ts';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { SerializedError } from '@reduxjs/toolkit';

interface Props {
    control: Control<SettingTypes, string>;
    data: User;
    errors: FieldErrors<SettingTypes>;
    mutationErrors: FetchBaseQueryError | SerializedError | undefined;
}

export const MySettingName = ({
    control,
    data,
    errors,
    mutationErrors,
}: Props) => {
    const { t } = useTranslation();

    return (
        <>
            <h3>{t('my-settings.name')}:</h3>
            <Controller
                name="full_name"
                control={control}
                defaultValue={data.full_name || ''}
                rules={{
                    required: t('modal-registration.min-name-length'),
                    pattern: {
                        value: /^[a-zA-Zа-яА-ЯёЁ][\w-a-zA-Zа-яА-ЯёЁ_\s]{1,50}$/i,
                        //value: /^([\w\s-а-яА-ЯёЁ]{2,50})+$/i,
                        message: t('modal-registration.wildcars-name'),
                    },
                    minLength: {
                        value: 2,
                        message: t('modal-registration.min-name-length'),
                    },
                    maxLength: {
                        value: 50,
                        message: t('modal-registration.not-more-50'),
                    },
                }}
                render={({ field }) => (
                    <input
                        {...field}
                        placeholder={t('modal-registration.user-name')}
                        style={
                            (errors.full_name || mutationErrors) && {
                                border: '1px solid #FF3F25',
                            }
                        }
                    />
                )}
            />
            <div className={styles.errors}>
                {errors?.full_name && (
                    <p style={{ color: '#FF3F25', fontSize: '13px' }}>
                        {errors?.full_name && errors.full_name.message}
                    </p>
                )}
                {mutationErrors && (
                    <p
                        style={{
                            color: '#FF3F25',
                            fontSize: '13px',
                        }}
                    >
                        {t('my-settings.correct-name')}
                    </p>
                )}
            </div>
        </>
    );
};
