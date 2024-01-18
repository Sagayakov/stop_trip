import { FieldErrors, UseFormRegister, UseFormWatch } from 'react-hook-form';
import { Eye } from 'shared/ui/icons/icons-tools/Eye.tsx';
import { ResetPasswordType } from '../libr/types';
import { useTranslation } from 'react-i18next';
import styleForInput from 'pages/resetPassword/resetPassword.module.scss';
import { useState } from 'react';

interface Props {
    errors: FieldErrors<ResetPasswordType>;
    register: UseFormRegister<ResetPasswordType>;
    watch: UseFormWatch<ResetPasswordType>;
}

export const InputRepeatPassword = ({
    errors,
    register,

    watch,
}: Props) => {
    const { t } = useTranslation();
    const [showPassword, setShowPassword] = useState(false);

    const handleShowPass = () => {
        setShowPassword(!showPassword);
    };

    const password = watch('password');
    const repeatPassword = watch('repeat_password');

    return (
        <>
            <div className={styleForInput.password_div}>
                <input
                    {...register('repeat_password', {
                        required: true,
                        minLength: 8,
                        maxLength: 22,
                    })}
                    placeholder={t('reset-page.repeat')}
                    autoComplete="new-password"
                    type={showPassword ? 'text' : 'password'}
                    style={{
                        border: `1px solid ${
                            errors?.repeat_password ||
                            password !== repeatPassword
                                ? '#FF3F25'
                                : '#DCDCDC'
                        }`,
                    }}
                    onBlur={() => setShowPassword(false)}
                />
                <div id={styleForInput.eye} onClick={handleShowPass}>
                    <Eye />
                </div>
                <div className={styleForInput.input_error}>
                    {(errors?.repeat_password ||
                        password !== repeatPassword) && (
                        <p style={{ color: '#FF3F25', fontSize: '13px' }}>
                            {t('reset-page.mismatch')}
                        </p>
                    )}
                </div>
            </div>
        </>
    );
};
