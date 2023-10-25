import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { Eye } from '../../../../../../shared/ui/icons/icons-tools/Eye';
import { AuthRegistration } from '../../libr/RegistrationTypes';

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

    return (
        <>
            <div className="password-div">
                <input
                    {...register('passWord', {
                        required: true,
                        minLength: 5,
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
                {errors?.passWord && (
                    <p style={{ color: '#FF3F25', fontSize: '13px' }}>
                        Ведите корректный пароль
                    </p>
                )}
            </div>
        </>
    );
};
