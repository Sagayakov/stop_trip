import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './ActivateAccount.scss';
import { activate } from './api/activate';
import { LoaidngWithoutBackground } from '../../entities/loading/LoaidngWithoutBackground';
import { setIsEnter } from '../../features/header/model/modalAuth/reducers/isEnter';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import { toggleModalEnter } from '../../features/header/model/modalAuth/reducers/toggleModal';

export const ActivateAccount = () => {
    const { uid, token } = useParams();
    const [success, setSuccess] = useState<boolean>(false);
    const [load, setLoad] = useState(true);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const toggle = useAppSelector((state) => state.toggleModalEnter.toggle);
    const handleToggleModal = () => dispatch(toggleModalEnter(!toggle));

    const activationAcc = async (uid: string, token: string) => {
        await setLoad(true)
        const body = {
            uid,
            token,
        };
        const response = await activate(body);
        if (response.ok){
            await setSuccess(true);
            await setLoad(false);
        }
    };

    useEffect(() => {
        activationAcc(uid!, token!);
    }, []);
    
    const handleRedirect = () => {
        navigate('/');
        handleToggleModal();
        dispatch(setIsEnter(true));
    }

    return (
        <main>
            <div className="activate-acc-page">
                <div className="activate-acc-header">
                    <h1>Активация аккаунта</h1>
                    {success
                        ? 'Ваш аккаунт активирован, спасибо за регистрацию на нашем сайте!'
                        : ''}
                    {load &&
                        <div className="activate-acc-loading">
                            <LoaidngWithoutBackground />
                        </div>
                    }
                    <div className="redirect" onClick={handleRedirect}>
                        Вернуться на главную
                    </div>
                </div>
            </div>
        </main>
    );
};
