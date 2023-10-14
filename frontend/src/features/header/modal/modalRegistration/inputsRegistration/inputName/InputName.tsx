import { FormState, UseFormRegister } from 'react-hook-form';
import { AuthRegistration } from '../../lib/RegistrationTypes';

interface Props {
    formState: FormState<AuthRegistration>;
    register: UseFormRegister<AuthRegistration>;
}

export const InputName = ({ register, formState }: Props) => {
    const { errors } = formState;

    return (
        <>
            <input
                {...register('userName', {
                    required: true,
                    pattern: /^[a-zA-Zа-яА-Я]+$/,
                    minLength: 2
                })}
                placeholder="Имя пользователя"
                style={{
                    border: `1px solid ${
                        errors?.userName ? '#FF3F25' : '#DCDCDC'
                    }`,
                }}
            />
            <div className="input-error">
                {errors?.userName && (
                    <p style={{ color: '#FF3F25', fontSize: '13px' }}>
                        Введите Ваше имя
                    </p>
                )}
            </div>
        </>
    );
};
