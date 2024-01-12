import { Control, Controller, FieldErrors } from 'react-hook-form';
import { SettingTypes } from 'pages/mySettings/types/settingTypes.ts';
import { useTranslation } from 'react-i18next';
import styles from 'pages/mySettings/libr/mySettings.module.scss';
import { Eye } from 'shared/ui/icons/icons-tools/Eye.tsx';
import { useState } from 'react';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

interface Props {
    control: Control<SettingTypes, string>;
    errors: FieldErrors<SettingTypes>;
    handleCopy: (event: React.ClipboardEvent<HTMLInputElement>) => void;
    passwordErrors: FetchBaseQueryError | SerializedError | undefined
}

export const MySettingCurrentPassword = ({ errors, control, handleCopy, passwordErrors }: Props) => {
    const { t } = useTranslation();
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    return (
            <div className={styles.password_div}>
                <h3>{t('my-settings.current-password')}:</h3>
                <Controller
                    name="current_password"
                    control={control}
                    render={({ field }) => (
                        <input
                            {...field}
                            type={
                                showCurrentPassword
                                    ? 'text'
                                    : 'password'
                            }
                            placeholder={t(
                                'my-settings.current-password'
                            )}
                            autoComplete="current_password"
                            onCopy={(event) => handleCopy(event)}
                            style={{
                                border: `1px solid ${
                                    errors?.current_password ||
                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    // @ts-ignore
                                    passwordErrors?.data
                                        .current_password
                                        ? '#FF3F25'
                                        : '#8f8f8f'
                                }`,
                            }}
                        />
                    )}
                />
                <div
                    id={styles.eye}
                    onClick={() =>
                        setShowCurrentPassword(
                            !showCurrentPassword
                        )
                    }
                >
                    <Eye />
                </div>
                <div className={styles.errors}>
                    {/*eslint-disable-next-line @typescript-eslint/ban-ts-comment*/}
                    {/*@ts-ignore*/}
                    {passwordErrors?.data.current_password &&
                        t('modal-login.correct-password')}
                </div>
            </div>
    );
};