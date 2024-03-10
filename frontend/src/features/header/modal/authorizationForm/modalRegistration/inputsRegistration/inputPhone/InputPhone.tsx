import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { AuthRegistration } from '../../libr/RegistrationTypes';
import { useTranslation } from 'react-i18next';
import styles from 'features/header/modal/modal.module.scss';
import { useAppSelector } from 'app/store/hooks.ts';

interface Props {
    errors: FieldErrors<AuthRegistration>;
    register: UseFormRegister<AuthRegistration>;
}

export const InputPhone = ({ errors, register }: Props) => {
    const phoneErrors = useAppSelector(
        (state) => state.setIsAuth.errorRegistration?.phone
    );
    const { t } = useTranslation();

    const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
        const inputText = event.currentTarget.value;
        if (inputText && String(inputText).length !== 0) {
            sessionStorage.setItem('phonenumber', String(inputText));
        }
    };

    return (
        <>
            <input
                {...register('phone', {
                    required: true,
                    minLength: 5,
                    pattern:
                        /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){7,15}(\s*)?$/,
                })}
                placeholder={t('modal-registration.phone')}
                defaultValue={sessionStorage.getItem('phonenumber') || ''}
                onInput={(e) => handleInput(e)}
                style={{
                    border: `1px solid ${
                        errors?.phone || phoneErrors ? '#FF3F25' : '#DCDCDC'
                    }`,
                }}
            />
            <div className={styles.input_error}>
                {(errors?.phone || phoneErrors) && (
                    <p style={{ color: '#FF3F25', fontSize: '13px' }}>
                        {t('modal-registration.correct-number')}
                    </p>
                )}
            </div>
        </>
    );
};
