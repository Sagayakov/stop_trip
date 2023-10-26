import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import './ActivateAccount.scss';

export const ActivateAccount = () => {
    const url = import.meta.env.VITE_BASE_URL;
    const { uid, token } = useParams();
    const [success, setSuccess] = useState<boolean>(false);

    const activationAcc = async (uid: string, token: string) => {
        const body = {
            uid,
            token,
        };
        const response = await fetch(`${url}/api/auth/users/activation/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        if (response.ok) setSuccess(true);
    };

    useEffect(() => {
        activationAcc(uid!, token!);
    }, []);

    return (
        <div className="activate-acc-page">
            <div className="activate-acc-header">
                <h1>Активация аккаунта</h1>
                {success
                    ? 'Ваш аккаунт активирован, спасибо за регистрацию на нашем сайте!'
                    : 'еще нет'}
                <div className="redirect">
                    <NavLink to={'/'}>Вернуться на главную</NavLink>
                </div>
            </div>
        </div>
    );
};
