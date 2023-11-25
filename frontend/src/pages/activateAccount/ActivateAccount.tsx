import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import './ActivateAccount.scss';
import { activate } from './api/activate';
import { LoaidngWithoutBackground } from '../../entities/loading/LoaidngWithoutBackground'

export const ActivateAccount = () => {
    const { uid, token } = useParams();
    const [success, setSuccess] = useState<boolean>(false);
    const [load, setLoad] = useState(true)

    const activationAcc = async (uid: string, token: string) => {
        await setLoad(true)
        const body = {
            uid,
            token,
        };
        const response = await activate(body);
        if (response.ok){
            await setSuccess(true);
            await setLoad(false)
        }
    };

    useEffect(() => {
        activationAcc(uid!, token!);
    }, []);

    return (
        <main>
            <div className="activate-acc-page">
                <div className="activate-acc-header">
                    <h1>Активация аккаунта</h1>
                    {success
                        ? 'Ваш аккаунт активирован, спасибо за регистрацию на нашем сайте!'
                        : 'Ваш аккаунт еще не активирован'}
                    {load &&
                        <div className="activate-acc-loading">
                            <LoaidngWithoutBackground />
                        </div>
                    }
                    <div className="redirect">
                        <NavLink to={'/'}>Вернуться на главную</NavLink>
                    </div>
                </div>
            </div>
        </main>
    );
};
