import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { Eye } from 'shared/ui/icons/icons-tools/Eye.tsx';
import { AuthRegistration } from '../../libr/RegistrationTypes';
import { useAppSelector } from 'app/store/hooks.ts';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import stylesForErrors from 'features/header/modal/modal.module.scss';
import styles from '../../libr/formRegistration.module.scss'

interface Props {
    errors: FieldErrors<AuthRegistration>;
    register: UseFormRegister<AuthRegistration>;
    showPassword: boolean;
    setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
}

export const InputPassword = ({
    errors,
    register,
    showPassword,
    setShowPassword,
}: Props) => {
    const errorEnter = useAppSelector((state) => state.setIsAuth.errorEnter);
    const { t } = useTranslation();

    const handleShowPass = () => {
        setShowPassword(!showPassword);
    };

    const handleCopy = (event: React.ClipboardEvent<HTMLInputElement>) => {
        event.preventDefault();
        toast.error(`${t('modal-login.copy-password')}`);
    };

    return (
        <>
            <div className={styles.password_div}>
                <input
                    {...register('passWord', {
                        required: true,
                        minLength: 8,
                        maxLength: 22,
                        pattern:
                            /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!"#$%&'()*+,-./\\:;<=>?@[\]^_`{|}~])(?!.*\s)[0-9a-zA-Z!"#$%&'()*+,-./\\:;<=>?@[\]^_`{|}~]{8,22}/,
                    })}
                    onCopy={(event) => handleCopy(event)}
                    placeholder={t('modal-login.password')}
                    autoComplete="new-password"
                    type={showPassword ? 'text' : 'password'}
                    style={{
                        border: `1px solid ${
                            errors?.passWord ? '#FF3F25' : '#DCDCDC'
                        }`,
                    }}
                    onBlur={() => setShowPassword(false)}
                />
                <div id={styles.eye} onClick={handleShowPass}>
                    <Eye />
                </div>
            </div>
            <div className={stylesForErrors.input_error}>
                {(errors?.passWord?.type === 'minLength' && (
                    <p style={{ color: '#FF3F25', fontSize: '13px' }}>
                        {t('modal-registration.password-short')}
                    </p>
                )) ||
                    (errors?.passWord && (
                        <p style={{ color: '#FF3F25', fontSize: '13px' }}>
                            {t('modal-registration.password-correct')}
                        </p>
                    ))}
                {errorEnter && (
                    <p style={{ color: '#FF3F25', fontSize: '13px' }}>
                        {errorEnter}
                    </p>
                )}
            </div>
        </>
    );
};
