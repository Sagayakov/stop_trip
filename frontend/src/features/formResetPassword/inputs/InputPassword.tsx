import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { Eye } from 'shared/ui/icons/icons-tools/Eye.tsx';
import { ResetPasswordType } from '../libr/types';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

interface Props {
    errors: FieldErrors<ResetPasswordType>;
    register: UseFormRegister<ResetPasswordType>;
    showPassword: boolean;
    setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
}

export const InputPassword = ({
    errors,
    register,
    showPassword,
    setShowPassword,
}: Props) => {
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
            <div className="password-div">
                <input
                    className="reset-input"
                    {...register('password', {
                        required: true,
                        minLength: 8,
                        maxLength: 22,
                        pattern:
                            /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!"#$%&'()*+,-./\\:;<=>?@[\]^_`{|}~])(?!.*\s)[0-9a-zA-Z!"#$%&'()*+,-./\\:;<=>?@[\]^_`{|}~]{8,22}/,
                    })}
                    onCopy={(event) => handleCopy(event)}
                    placeholder={t('reset-page.password-new')}
                    autoComplete="new-password"
                    type={showPassword ? 'text' : 'password'}
                    style={{
                        border: `1px solid ${
                            errors?.password ? '#FF3F25' : '#DCDCDC'
                        }`,
                    }}
                    onBlur={() => setShowPassword(false)}
                />
                <div id="eye" onClick={handleShowPass}>
                    <Eye />
                </div>
            </div>
            <div className="input-error">
                {(errors?.password?.type === 'minLength' && (
                    <p style={{ color: '#FF3F25', fontSize: '13px' }}>
                        {t('reset-page.password-short')}
                    </p>
                )) ||
                    (errors?.password && (
                        <p style={{ color: '#FF3F25', fontSize: '13px' }}>
                            {t('reset-page.password-correct')}
                        </p>
                    ))}
            </div>
        </>
    );
};
