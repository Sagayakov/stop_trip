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
    const { register, handleSubmit, formState } = useForm<Email>({
        mode: 'onChange',
    });
    const { errors, isValid } = formState;
    const [success, setSuccess] = useState(false);
    const dispatch = useAppDispatch();
    const { t } = useTranslation();

    const onsubmit: SubmitHandler<Email> = async (data) => {
        const { email } = data;
        await handleFetchResetPassword(email, setSuccess, dispatch);
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
                        })}
                        placeholder="Email"
                        autoComplete="username"
                        style={{
                            border: `1px solid ${
                                errors?.email ? '#FF3F25' : '#DCDCDC'
                            }`,
                        }}
                    />
                    <div className={styles.input_error}>
                        {errors?.email && (
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
                    </div>
                    <input
                        type="submit"
                        value={t('modal-reset.send')}
                        className={disableStyle.submit}
                        disabled={!isValid}
                    />
                </form>
            )}
        </div>
    );
};
