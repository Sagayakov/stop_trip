import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import './ModalResetPassword.scss';
import { useAppDispatch, useAppSelector } from 'app/store/hooks.ts';
import { Close } from 'shared/ui/icons/icons-tools/Close.tsx';
import { setIsResetPasswordModalOpen } from 'features/header/model/modalAuth/reducers/isResetPasswordModalOpen.ts';
import { setLoading } from 'entities/loading/model/setLoadingSlice.ts';
import { useTranslation } from 'react-i18next';

export const ModalResetPassword = () => {
    interface Email {
        email: string;
    }
    const url = import.meta.env.VITE_BASE_URL;
    const { register, handleSubmit, formState } = useForm<Email>();
    const { errors } = formState;
    const [success, setSuccess] = useState(false);
    const isResetPasswordModalOpen = useAppSelector(
        (state) => state.setIsResetPasswordModalOpen.isResetPasswordModalOpen
    );
    const dispatch = useAppDispatch();
    const { t } = useTranslation();

    const onsubmit: SubmitHandler<Email> = async (data) => {
        const { email } = data;
        dispatch(setLoading(true));
        try {
            const response = await fetch(
                `${url}/api/auth/users/reset_password/`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email }),
                }
            );
            console.log(response);
            if (response.ok) {
                setSuccess(true);
                dispatch(setLoading(false));
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div
            className={`modal ${
                isResetPasswordModalOpen ? 'visible visible-wrapper' : ''
            }`}
            onClick={() => dispatch(setIsResetPasswordModalOpen(false))}
        >
            <div
                className="modal-wrapper"
                onClick={(event) => event.stopPropagation()}
            >
                <Close
                    onclick={() => dispatch(setIsResetPasswordModalOpen(false))}
                />
                <div className="form-reset-password">
                    {!success && <h3>{t('modal-reset.enter-email')}</h3>}
                    {success ? (
                        <h3>{t('modal-reset.email-sent')}</h3>
                    ) : (
                        <form onSubmit={handleSubmit(onsubmit)}>
                            <input
                                {...register('email', {
                                    required: true,
                                    pattern:
                                        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
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
                            <div className="input-error">
                                {errors?.email && (
                                    <p
                                        style={{
                                            color: '#FF3F25',
                                            fontSize: '13px',
                                        }}
                                    >
                                        {t('modal-login.correct-email')}
                                    </p>
                                )}
                            </div>
                            <input
                                type="submit"
                                value={t('modal-reset.send')}
                            />
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};
