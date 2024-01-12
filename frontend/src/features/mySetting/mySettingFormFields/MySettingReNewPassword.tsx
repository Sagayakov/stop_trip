import { Control, Controller, FieldErrors, UseFormWatch } from 'react-hook-form';
import { SettingTypes } from 'pages/mySettings/types/settingTypes.ts';
import { useTranslation } from 'react-i18next';
import styles from 'pages/mySettings/libr/mySettings.module.scss';
import { Eye } from 'shared/ui/icons/icons-tools/Eye.tsx';
import { useState } from 'react';

interface Props {
    control: Control<SettingTypes, string>;
    errors: FieldErrors<SettingTypes>;
    handleCopy: (event: React.ClipboardEvent<HTMLInputElement>) => void;
    watch: UseFormWatch<SettingTypes>;
}

export const MySettingReNewPassword = ({ errors, handleCopy, watch, control }: Props) => {
    const { t } = useTranslation();
    const newPassword = watch('new_password');
    const reNewPassword = watch('re_new_password');
    const [showReNewPassword, setShowReNewPassword] = useState(false);
    return (
        <div className={styles.password_div}>
            <h3>{t('my-settings.re-new-password')}:</h3>
            <Controller
                name="re_new_password"
                control={control}
                render={({ field }) => (
                    <input
                        {...field}
                        type={
                            showReNewPassword
                                ? 'text'
                                : 'password'
                        }
                        placeholder={t(
                            'my-settings.re-new-password'
                        )}
                        onCopy={(event) => handleCopy(event)}
                        autoComplete="re_new_password"
                        style={{
                            border: `1px solid ${
                                errors?.re_new_password ||
                                newPassword !== reNewPassword
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
                    setShowReNewPassword(!showReNewPassword)
                }
            >
                <Eye />
            </div>
            <div className={styles.errors}>
                {(errors?.re_new_password ||
                        newPassword !== reNewPassword) &&
                    t('modal-registration.mismatch')}
            </div>
        </div>
    );
};