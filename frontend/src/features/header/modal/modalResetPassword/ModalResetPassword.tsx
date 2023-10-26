import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import './ModalResetPassword.scss';

export const ModalResetPassword = () => {
    interface Email {
        email: string;
    }
    const url = import.meta.env.VITE_BASE_URL;
    const { register, handleSubmit, formState } = useForm<Email>();
    const { errors } = formState;
    const [success, setSuccess] = useState(false);

    const onsubmit: SubmitHandler<Email> = async (data) => {
        const { email } = data;
        console.log(email);
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
            if (response.ok) setSuccess(true);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="form-reset-password">
            <h3>
                Пожалуйста, введите вашу почту. На нее придет ссылка для
                восстановления пароля.
            </h3>
            {success ? (
                <p>
                    письмо для восстановления пароля отправлено на ваш почтовый
                    ящик
                </p>
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
                            <p style={{ color: '#FF3F25', fontSize: '13px' }}>
                                Введите корректный email
                            </p>
                        )}
                    </div>
                    <input type="submit" value="Отправить" />
                </form>
            )}
        </div>
    );
};
