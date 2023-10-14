import { FormState, UseFormRegister } from 'react-hook-form';
import { AuthRegistration } from '../../lib/RegistrationTypes';

interface Props {
    formState: FormState<AuthRegistration>;
    register: UseFormRegister<AuthRegistration>;
}

export const InputPhone = ({ formState, register }: Props) => {
    const { errors } = formState;

    return (
        <>
            <input
                {...register('phone', {
                    required: true,
                    minLength: 5,
                })}
                placeholder="Номер телефона"
                style={{
                    border: `1px solid ${
                        errors?.phone ? '#FF3F25' : '#DCDCDC'
                    }`,
                }}
            />
            <div className="input-error">
                {errors?.phone && (
                    <p style={{ color: '#FF3F25', fontSize: '13px' }}>
                        Введите Ваш номер телефона
                    </p>
                )}
            </div>
        </>
    );
};
