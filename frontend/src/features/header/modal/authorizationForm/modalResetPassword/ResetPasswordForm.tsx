import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from 'features/header/modal/modal.module.scss';
import disableStyle from 'features/header/modal/authorizationForm/modalEnter/libr/formEnter.module.scss';
import { handleFetchResetPassword } from 'features/header/modal/authorizationForm/modalResetPassword/libr/handleFetchResetPassword.ts';
import { useAppDispatch } from 'app/store/hooks.ts';
interface Email {
    email: string;
}

export const ResetPasswordForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<Email>({
        mode: 'onChange',
    });
    const [success, setSuccess] = useState(false);
    const dispatch = useAppDispatch();
    const { t } = useTranslation();

    const [emailDomainLengthError, setEmailDomainLengthError] = useState(false);
    const [emailDomainLength, setEmailDomainLength] = useState(false);
    const [twoPoints, setTwoPoints] = useState(false);
    const [startEndError, setStartEndError] = useState(false);
    const [startsWithDotError, setStartsWithDotError] = useState(false);

    const oninput = (event: React.FormEvent<HTMLInputElement>) => {
        event.currentTarget.value = event.currentTarget.value.toLowerCase();
        let inputText = event.currentTarget.value;
        const atIndex = inputText.indexOf('@');
        const firstPart = inputText.slice(0, atIndex);
        const domainPart = inputText.slice(atIndex + 1);

        sessionStorage.setItem('emailRegistration', inputText);

        setEmailDomainLengthError(
            firstPart.length >= 64 ||
                firstPart.length < 1 ||
                domainPart.length >= 64 ||
                atIndex === -1
        );
        setEmailDomainLength(inputText.length > 128 || inputText.length < 10);
        setTwoPoints(firstPart.includes('..') || domainPart.includes('..'));
        setStartsWithDotError(firstPart.startsWith('.'));

        const firstSymbol = domainPart.charAt(0);
        const lastSymbol = domainPart.charAt(domainPart.length - 1);
        const symbolBeforeDot = domainPart[domainPart.lastIndexOf('.') - 1];
        const symbolAfterDot = domainPart[domainPart.lastIndexOf('.') + 1];

        const isDigitOrHyphen = (char: string) =>
            !isNaN(parseInt(char, 10)) || char === '-';

        setStartEndError(
            isDigitOrHyphen(firstSymbol) ||
                isDigitOrHyphen(lastSymbol) ||
                isDigitOrHyphen(symbolBeforeDot) ||
                isDigitOrHyphen(symbolAfterDot)
        );

        const cyrillicRegex = /[а-яА-ЯёЁ]/g;

        if (cyrillicRegex.test(inputText)) {
            inputText = inputText.replace(cyrillicRegex, '');
            event.currentTarget.value = inputText;
        }

        if (atIndex > -1) {
            const domainPartLowerCase = domainPart.toLowerCase();
            if (domainPart !== domainPartLowerCase || domainPart.length > 63) {
                event.currentTarget.value =
                    inputText.slice(0, atIndex + 1) +
                    domainPartLowerCase.slice(0, 63);
            }
        }
    };

    const borderError = () => {
        return (
            errors.email ||
            emailDomainLength ||
            emailDomainLengthError ||
            twoPoints ||
            startEndError ||
            startsWithDotError
        );
    };

    const onsubmit: SubmitHandler<Email> = async (data) => {
        const { email } = data;
        if (
            !errors.email &&
            !emailDomainLength &&
            !emailDomainLengthError &&
            !twoPoints &&
            !startEndError
        ) {
            await handleFetchResetPassword(email, setSuccess, dispatch);
        }
    };

    return (
        <div className={styles.form_reset_password}>
            {!success && <h3>{t('modal-reset.enter-email')}</h3>}
            {success ? (
                <h3>{t('modal-reset.email-sent')}</h3>
            ) : (
                <form
                    onSubmit={handleSubmit(onsubmit)}
                    id="form-reset-password"
                >
                    <input
                        {...register('email', {
                            required: true,
                            pattern:
                                /^(?!.*\.{2})[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9-]{2,}(?:\.[a-z]{2,})+$/i,
                            minLength: 10,
                            maxLength: 128,
                        })}
                        type="email"
                        placeholder="Email"
                        autoComplete="username"
                        onInput={(event) => oninput(event)}
                        style={{
                            border: `1px solid ${
                                borderError() ? '#FF3F25' : '#DCDCDC'
                            }`,
                        }}
                    />
                    <div className={styles.input_error}>
                        {(errors?.email || startsWithDotError) && (
                            <p
                                style={{
                                    color: '#FF3F25',
                                    fontSize: '13px',
                                    marginTop: 0,
                                }}
                            >
                                {t('modal-login.correct-email')}
                            </p>
                        )}
                        {(emailDomainLengthError || emailDomainLength) && (
                            <p
                                style={{
                                    color: '#FF3F25',
                                    fontSize: '13px',
                                    marginTop: 0,
                                }}
                            >
                                {t('modal-registration.email-length')}
                            </p>
                        )}
                        {twoPoints && (
                            <p
                                style={{
                                    color: '#FF3F25',
                                    fontSize: '13px',
                                    marginTop: 0,
                                }}
                            >
                                {t('modal-registration.two-dots')}
                            </p>
                        )}
                        {startEndError && (
                            <p
                                style={{
                                    color: '#FF3F25',
                                    fontSize: '13px',
                                    marginTop: 0,
                                }}
                            >
                                {t('modal-registration.digit')}
                            </p>
                        )}
                    </div>
                    <input
                        type="submit"
                        value={t('modal-reset.send')}
                        className={disableStyle.submit}
                        disabled={
                            !isValid ||
                            !!errors.email ||
                            emailDomainLength ||
                            emailDomainLengthError ||
                            twoPoints ||
                            startEndError ||
                            startsWithDotError
                        }
                    />
                </form>
            )}
        </div>
    );
};
