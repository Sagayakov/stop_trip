import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { AuthRegistration } from '../../libr/RegistrationTypes';
import { useTranslation } from 'react-i18next';

interface Props {
    errors: FieldErrors<AuthRegistration>;
    register: UseFormRegister<AuthRegistration>;
}

export const InputPhone = ({ errors, register }: Props) => {
    const { t } = useTranslation();

    return (
        <>
            <input
                {...register('phone', {
                    required: true,
                    minLength: 5,
                    pattern:
                        /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){7,11}(\s*)?$/,
                })}
                placeholder={t('modal-registration.phone')}
                style={{
                    border: `1px solid ${
                        errors?.phone ? '#FF3F25' : '#DCDCDC'
                    }`,
                }}
            />
            <div className="input-error">
                {errors?.phone && (
                    <p style={{ color: '#FF3F25', fontSize: '13px' }}>
                        {t('modal-registration.correct-number')}
                    </p>
                )}
            </div>
        </>
    );
};
