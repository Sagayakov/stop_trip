import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { useAppSelector } from '../../../../../../app/store/hooks';
import { AuthRegistration } from '../../libr/RegistrationTypes';

interface Props {
    errors: FieldErrors<AuthRegistration>;
    register: UseFormRegister<AuthRegistration>;
}

export const InputEmail = ({ errors, register }: Props) => {
    const emailErrors = useAppSelector((state) => state.setIsAuth.errorEmail); //ошибка повторного использования email

    return (
        <>
            <input
                {...register('email', {
                    required: true,
                    pattern:
                        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    minLength: 10,
                })}
                placeholder="Email"
                autoComplete="username"
                style={{
                    border: `1px solid ${
                        errors?.email || emailErrors ? '#FF3F25' : '#DCDCDC'
                    }`,
                }}
            />
            <div className="input-error">
                {errors?.email && (
                    <p style={{ color: '#FF3F25', fontSize: '13px' }}>
                        Введите корректный email
                    </p>
                )}
                {emailErrors && (
                    <p style={{ color: '#FF3F25', fontSize: '13px' }}>
                        {emailErrors.email[0]}
                    </p>
                )}
            </div>
        </>
    );
};
