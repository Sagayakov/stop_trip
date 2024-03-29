import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { AuthRegistration } from '../../libr/RegistrationTypes';
import { useTranslation } from 'react-i18next';
import styles from 'features/header/modal/modal.module.scss';

interface Props {
    errors: FieldErrors<AuthRegistration>;
    register: UseFormRegister<AuthRegistration>;
}

export const InputName = ({ register, errors }: Props) => {
    const { t } = useTranslation();

    const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
        const inputText = event.currentTarget.value;
        if (inputText.length !== 0)
            sessionStorage.setItem('username', inputText);
    };

    const getDefaultValue = () => {
        const name = sessionStorage.getItem('username');
        if (name === undefined || name === null) {
            return '';
        } else {
            return name;
        }
    };

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
                defaultValue={getDefaultValue()}
                onInput={(e) => handleInput(e)}
                placeholder={t('modal-registration.user-name')}
                style={{
                    border: `1px solid ${
                        errors?.userName ? '#FF3F25' : '#DCDCDC'
                    }`,
                }}
            />
            <div className={styles.input_error}>
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
