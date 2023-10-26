import { FieldErrors, UseFormRegister, UseFormWatch } from 'react-hook-form';
import { Eye } from '../../../shared/ui/icons/icons-tools/Eye';
import { ResetPasswordType } from '../libr/types';

interface Props {
    errors: FieldErrors<ResetPasswordType>;
    register: UseFormRegister<ResetPasswordType>;
    watch: UseFormWatch<ResetPasswordType>;
    showPassword: boolean;
    setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
}

export const InputRepeatPassword = ({
    errors,
    register,
    showPassword,
    watch,
    setShowPassword,
}: Props) => {
    const handleShowPass = () => {
        setShowPassword(!showPassword);
    };

    const password = watch('password');
    const repeatPassword = watch('repeat_password');

    return (
        <>
            <div className="password-div">
                <input
                    className="reset-input"
                    {...register('repeat_password', {
                        required: true,
                        minLength: 5,
                    })}
                    placeholder="Повторите новый пароль"
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
                <div id="eye" onClick={handleShowPass}>
                    <Eye />
                </div>
                <div className="input-error">
                    {(errors?.repeat_password ||
                        password !== repeatPassword) && (
                        <p style={{ color: '#FF3F25', fontSize: '13px' }}>
                            Пароли не совпадают
                        </p>
                    )}
                </div>
            </div>
        </>
    );
};
