import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { AuthRegistration } from '../../libr/RegistrationTypes';
import { useTranslation } from 'react-i18next';

interface Props {
    errors: FieldErrors<AuthRegistration>;
    register: UseFormRegister<AuthRegistration>;
}

export const InputName = ({ register, errors }: Props) => {
    const { t } = useTranslation();

    return (
        <>
            <input
                {...register('userName', {
                    required: true,
                    pattern: /^[\w\s-а-яА-ЯёЁ]+$/i,
                    // pattern: /^[a-zA-Zа-яА-Я]+$/,
                    minLength: 2,
                    maxLength: 50,
                })}
                placeholder={t('modal-registration.user-name')}
                style={{
                    border: `1px solid ${
                        errors?.userName ? '#FF3F25' : '#DCDCDC'
                    }`,
                }}
            />
            <div className="input-error">
                {errors?.userName && (
                    <p style={{ color: '#FF3F25', fontSize: '13px' }}>
                        {t('modal-registration.user-name')}
                    </p>
                )}
                {errors?.userName?.type === 'maxLength' && (
                    <p style={{ color: '#FF3F25', fontSize: '13px' }}>
                        {t('modal-registration.not-more-50')}
                    </p>
                )}
            </div>
        </>
    );
};
