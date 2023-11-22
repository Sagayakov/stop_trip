import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { Eye } from '../../../../../../shared/ui/icons/icons-tools/Eye';
import { AuthRegistration } from '../../libr/RegistrationTypes';
import { useAppSelector } from '../../../../../../app/store/hooks';

interface Props {
    errors: FieldErrors<AuthRegistration>;
    register: UseFormRegister<AuthRegistration>;
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

    const errorEnter = useAppSelector((state) => state.setIsAuth.errorEmail?.password);

    return (
        <>
            <div className="password-div">
                <input
                    {...register('passWord', {
                        required: true,
                        minLength: 8,
                    })}
                    placeholder="Пароль"
                    autoComplete="new-password"
                    type={showPassword ? 'text' : 'password'}
                    style={{
                        border: `1px solid ${
                            errors?.passWord ? '#FF3F25' : '#DCDCDC'
                        }`,
                    }}
                    onBlur={() => setShowPassword(false)}
                />
                <div id="eye" onClick={handleShowPass}>
                    <Eye />
                </div>
            </div>
            <div className="input-error">
                {(errors?.passWord?.type === 'minLength' && (
                    <p style={{ color: '#FF3F25', fontSize: '13px' }}>
                        Пароль слишком короткий. Минимальная длина: 8 символов.
                    </p>
                )) ||
                    (errors?.passWord && (
                        <p style={{ color: '#FF3F25', fontSize: '13px' }}>
                            Ведите корректный пароль
                        </p>
                    ))}
                {errorEnter && (
                    <p style={{ color: '#FF3F25', fontSize: '13px' }}>
                        {errorEnter}
                    </p>
                )}
            </div>
        </>
    );
};
