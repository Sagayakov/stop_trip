import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import './ActivateAccount.scss';
import { activate } from './api/activate';

export const ActivateAccount = () => {
    const { uid, token } = useParams();
    const [success, setSuccess] = useState<boolean>(false);

    const activationAcc = async (uid: string, token: string) => {
        const body = {
            uid,
            token,
        };
        const response = await activate(body);
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
                    : 'Ваш аккаунт еще не активирован'}
                <div className="redirect">
                    <NavLink to={'/'}>Вернуться на главную</NavLink>
                </div>
            </div>
        </div>
    );
};
