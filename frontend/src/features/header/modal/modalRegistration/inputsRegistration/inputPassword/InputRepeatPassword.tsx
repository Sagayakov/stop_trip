import {
    FieldErrors,
    UseFormGetValues,
    UseFormRegister,
} from 'react-hook-form';
import { Eye } from '../../../../../../shared/ui/icons/icons-tools/Eye';
import { AuthRegistration } from '../../libr/RegistrationTypes';

interface Props {
    errors: FieldErrors<AuthRegistration>;
    register: UseFormRegister<AuthRegistration>;
    showPassword: boolean;
    setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
    getValues: UseFormGetValues<AuthRegistration>;
}

export const InputRepeatPassword = ({
    errors,
    register,
    showPassword,
    setShowPassword,
    getValues,
}: Props) => {
    const handleShowPass = () => {
        setShowPassword(!showPassword);
    };

    const onBlurRepeatPassword = () => setShowPassword(false);

    return (
        <>
            <div className="password-div">
                <input
                    {...register('repeatPassword', {
                        required: true,
                        minLength: 8,
                        validate: (value) => value === getValues('passWord'),
                    })}
                    placeholder="Повторите пароль"
                    autoComplete="new-password"
                    type={showPassword ? 'text' : 'password'}
                    onBlur={onBlurRepeatPassword}
                    style={{
                        border: `1px solid ${
                            errors?.repeatPassword
                                ? '#FF3F25'
                                : '#DCDCDC'
                        }`,
                    }}
                />
                <div id="eye" onClick={handleShowPass}>
                    <Eye />
                </div>
                <div className="input-error">
                    {(errors?.repeatPassword) && (
                        <p style={{ color: '#FF3F25', fontSize: '13px' }}>
                            Пароли не совпадают
                        </p>
                    )}
                </div>
            </div>
        </>
    );
};
