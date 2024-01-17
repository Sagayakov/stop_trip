import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './activateAccount.module.scss';
import { activate } from './api/activate';
import { LoaidngWithoutBackground } from 'entity/loading/LoaidngWithoutBackground.tsx';
import { setIsEnter } from 'features/header/model/modalAuth/reducers/isEnter.ts';
import { useAppDispatch, useAppSelector } from 'app/store/hooks.ts';
import { toggleModalEnter } from 'features/header/model/modalAuth/reducers/toggleModal.ts';
import { useTranslation } from 'react-i18next';

const ActivateAccount = () => {
    const { uid, token } = useParams();
    const [success, setSuccess] = useState<boolean>(false);
    const [load, setLoad] = useState(true);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const toggle = useAppSelector((state) => state.toggleModalEnter.toggle);
    const handleToggleModal = () => dispatch(toggleModalEnter(!toggle));
    const { t } = useTranslation();

    const activationAcc = async (uid: string, token: string) => {
        setLoad(true);
        const body = {
            uid,
            token,
        };
        const response = await activate(body);
        if (response.ok) {
            setSuccess(true);
            setLoad(false);
        }
    };

    useEffect(() => {
        activationAcc(uid!, token!);
    }, []);

    const handleRedirect = () => {
        navigate('/');
        handleToggleModal();
        dispatch(setIsEnter(true));
    };

    return (
        <main>
            <div className={styles.activate_acc_page}>
                <div className={styles.activate_acc_header}>
                    <h1>{t('activate-page.activation')}</h1>
                    {success ? `${t('activate-page.activated')}` : ''}
                    {load ? (
                        <div className={styles.activate_acc_loading}>
                            <LoaidngWithoutBackground />
                        </div>
                    ) : (
                        <div></div>
                    )}
                    <div className={styles.redirect} onClick={handleRedirect}>
                        {t('activate-page.back')}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ActivateAccount;
