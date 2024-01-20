import {
    Control,
    Controller,
    FieldErrors,
    UseFormWatch,
} from 'react-hook-form';
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

export const MySettingNewPassword = ({
    control,
    errors,
    handleCopy,
    watch,
}: Props) => {
    const { t } = useTranslation();
    const [showNewPassword, setShowNewPassword] = useState(false);
    const newPassword = watch('new_password');
    const currentPassword = watch('current_password');

    return (
        <div className={styles.password_div}>
            <h3>{t('my-settings.new-password')}:</h3>
            <Controller
                name="new_password"
                control={control}
                rules={{
                    pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!'#$%&'()*+,-./\\:;<=>?@[\]^_`{|}~])(?!.*\s)[0-9a-zA-Z!"#$%&'()*+,-./\\:;<=>?@[\]^_`{|}~]{8,22}/,
                        message: t('modal-registration.password-correct'),
                    },
                }}
                render={({ field }) => (
                    <input
                        {...field}
                        type={showNewPassword ? 'text' : 'password'}
                        placeholder={t('my-settings.new-password')}
                        onCopy={(event) => handleCopy(event)}
                        autoComplete="new_password"
                        minLength={8}
                        maxLength={22}
                        style={{
                            border: `1px solid ${
                                errors?.new_password ||
                                newPassword === currentPassword
                                    ? '#FF3F25'
                                    : '#8f8f8f'
                            }`,
                        }}
                    />
                )}
            />
            <div
                id={styles.eye}
                onClick={() => setShowNewPassword(!showNewPassword)}
            >
                <Eye />
            </div>
            <div className={styles.errors}>
                {errors.new_password && errors.new_password.message}
                {newPassword === currentPassword &&
                    t('my-settings.same-password')}
            </div>
        </div>
    );
};
