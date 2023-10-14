import { FormState,  UseFormRegister, UseFormWatch } from 'react-hook-form';
import { Eye } from '../../../../../../shared/ui/icons/icons-tools/Eye';
import { AuthRegistration } from '../../lib/RegistrationTypes';

interface Props {
    formState: FormState<AuthRegistration>;
    register: UseFormRegister<AuthRegistration>;
    watch: UseFormWatch<AuthRegistration>;
    showPassword: boolean;
    setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
}

export const InputRepeatPassword = ({
    formState,
    register,
    showPassword,
    watch,
    setShowPassword,
}: Props) => {
    const { errors } = formState;
    const handleShowPass = () => {
        setShowPassword(!showPassword);
    };

    const password = watch('passWord');
    const repeatPassword = watch('repeatPassword');

    return (
        <>
            <div className="password-div">
                <input
                    {...register('repeatPassword', {
                        required: true,
                        minLength: 5,
                    })}
                    placeholder="Повторите пароль"
                    type={showPassword ? 'text' : 'password'}
                    style={{
                        border: `1px solid ${
                            errors?.repeatPassword ||
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
                    {(errors?.repeatPassword  || (password !== repeatPassword)) && (
                        <p style={{ color: '#FF3F25', fontSize: '13px' }}>
                            Пароли не совпадают
                        </p>
                    )}
                </div>
            </div>
        </>
    );
};
