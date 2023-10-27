import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { Eye } from '../../../shared/ui/icons/icons-tools/Eye';
import { ResetPasswordType } from '../libr/types';

interface Props {
    errors: FieldErrors<ResetPasswordType>;
    register: UseFormRegister<ResetPasswordType>;
    showPassword: boolean;
    setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
}

export const InputPassword = ({
    errors,
    register,
    showPassword,
    setShowPassword,
}: Props) => {
    const handleShowPass = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <div className="password-div">
                <input
                    className="reset-input"
                    {...register('password', {
                        required: true,
                        minLength: 8,
                    })}
                    placeholder="Новый пароль"
                    autoComplete="new-password"
                    type={showPassword ? 'text' : 'password'}
                    style={{
                        border: `1px solid ${
                            errors?.password ? '#FF3F25' : '#DCDCDC'
                        }`,
                    }}
                    onBlur={() => setShowPassword(false)}
                />
                <div id="eye" onClick={handleShowPass}>
                    <Eye />
                </div>
            </div>
            <div className="input-error">
                {(errors?.password?.type === 'minLength' && (
                    <p style={{ color: '#FF3F25', fontSize: '13px' }}>
                        Пароль слишком короткий. Минимальная длина: 8 символов.
                    </p>
                )) ||
                    (errors?.password && (
                        <p style={{ color: '#FF3F25', fontSize: '13px' }}>
                            Ведите корректный пароль
                        </p>
                    ))}
            </div>
        </>
    );
};
