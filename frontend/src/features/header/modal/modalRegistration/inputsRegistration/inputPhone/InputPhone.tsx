import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { AuthRegistration } from '../../libr/RegistrationTypes';

interface Props {
    errors: FieldErrors<AuthRegistration>;
    register: UseFormRegister<AuthRegistration>;
}

export const InputPhone = ({ errors, register }: Props) => {
    return (
        <>
            <input
                {...register('phone', {
                    required: true,
                    minLength: 5,
                    pattern: /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){7,14}(\s*)?$/,
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
                        Введите корректный номер телефона
                    </p>
                )}
            </div>
        </>
    );
};
