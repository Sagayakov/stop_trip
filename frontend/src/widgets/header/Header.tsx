import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dispatch } from 'redux';
import { useAppDispatch, useAppSelector } from 'app/store/hooks.ts';
import { ModalAddAdvert } from 'features/header/modal/modalAddAdvert/ModalAddAdvert.tsx';
import { LogoHeader } from 'shared/ui/icons/icons-tools/LogoHeader.tsx';
import { Plus } from 'shared/ui/icons/icons-tools/Plus.tsx';
import styles from './libr/header.module.scss';
import { setIsAuth } from 'features/header/model/modalAuth/reducers/auth.ts';
import { checkAuthentication } from './libr/authentication/checkAuthentication';
import { getTokensFromStorage } from './libr/authentication/getTokensFromStorage';
import { handleScroll } from './libr/eventListeners/handleScroll';
import { ModalCheckEmail } from 'features/header/modal/modalCheckEmail/ModalCheckEmail.tsx';
import { ModalResetPassword } from 'features/header/modal/modalResetPassword/ModalResetPassword.tsx';
import { useTranslation } from 'react-i18next';
import { UniversalButton } from 'entities/universalEntites';
import { LangAuthBlock } from 'features/header/langAuthBlock/LangAuthBlock.tsx';

export const Header = () => {
    const dispatch: Dispatch = useAppDispatch();
    const ref = useRef(null);
    const { t } = useTranslation();

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const isAuth = useAppSelector((state) => state.setIsAuth.isAuth);
    const isCheckEmailModalOpen = useAppSelector(
        (state) => state.setIsCheckMailModalOpen.isCheckMailModalOpen
    );
    const isResetPasswordModalOpen = useAppSelector(
        (state) => state.setIsResetPasswordModalOpen.isResetPasswordModalOpen
    );

    const navigate = useNavigate();

    const { accessToken, refreshToken } = getTokensFromStorage();

    if (!refreshToken) dispatch(setIsAuth(false)); //если нет refresh токена, то нужно заново авторизоваться и получить новый

    useEffect(() => {
        checkAuthentication(dispatch);

        handleScroll(ref);

        window.addEventListener('scroll', () => handleScroll(ref));

        return () => {
            window.removeEventListener('scroll', () => handleScroll(ref));
        };
    }, [accessToken, refreshToken, dispatch]);

    const addAdvert = () => {
        setIsAddModalOpen(true);
    };

    const closeAddModal = () => {
        setIsAddModalOpen(false);
    };
    const getClassName = () =>
        isAuth ? `${styles.addAdvert} ${styles.active}` : `${styles.addAdvert}`;

    return (
        <header ref={ref}>
            <div className={styles.header_wrapper}>
                <LogoHeader />
                <UniversalButton
                    className={getClassName()}
                    onClick={
                        isAuth ? () => navigate('/add-announcement') : addAdvert
                    }
                >
                    <Plus color="white" />
                    {window.innerWidth >= 425
                        ? `${t('main-page.post-advert')}`
                        : `${t('main-page.publish')}`}
                </UniversalButton>
                <LangAuthBlock />
                {isAddModalOpen && (
                    <ModalAddAdvert closeAddModal={closeAddModal} />
                )}
                {isCheckEmailModalOpen && <ModalCheckEmail />}
                {isResetPasswordModalOpen && <ModalResetPassword />}
            </div>
        </header>
    );
};
