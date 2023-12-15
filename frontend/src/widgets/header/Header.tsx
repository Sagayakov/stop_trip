import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dispatch } from 'redux';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import { Modal } from '../../features/header/modal';
import { ModalAddAdvert } from '../../features/header/modal/modalAddAdvert/ModalAddAdvert';
import { ModalMobile } from '../../features/header/modal/modalMobile/ModalMobile';
import { toggleModalEnter } from '../../features/header/model/modalAuth/reducers/toggleModal';
import { LogoHeader } from '../../shared/ui/icons/icons-tools/LogoHeader';
import { Person } from '../../shared/ui/icons/icons-tools/Person';
import { Plus } from '../../shared/ui/icons/icons-tools/Plus';
import './libr/header.scss';
import { setIsAuth } from '../../features/header/model/modalAuth/reducers/auth';
import { checkAuthentication } from './libr/authentication/checkAuthentication';
import { getTokensFromStorage } from './libr/authentication/getTokensFromStorage';
import { handleScroll } from './libr/eventListeners/handleScroll';
import { ModalCheckEmail } from '../../features/header/modal/modalCheckEmail/ModalCheckEmail';
import { ModalResetPassword } from '../../features/header/modal/modalResetPassword/ModalResetPassword';
import { useMatchMedia } from '../../app/hooks/useMatchMedia';
import { Langs } from '../../entities/langs';
import { useTranslation } from 'react-i18next';

export const Header = () => {
    const dispatch: Dispatch = useAppDispatch();
    const toggle = useAppSelector((state) => state.toggleModalEnter.toggle);
    const ref = useRef(null);
    const { t } = useTranslation();

    const { isMobile } = useMatchMedia();

    const [showUserMenu, setShowUserMenu] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const handleToggleModal = () => dispatch(toggleModalEnter(!toggle));
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

    return (
        <header ref={ref}>
            <div className="header-wrapper">
                <LogoHeader />
                <button
                    className={isAuth ? 'addAdvert active' : 'addAdvert'}
                    onClick={
                        isAuth ? () => navigate('/add-announcement') : addAdvert
                    }
                >
                    <Plus color="white" />
                    {window.innerWidth >= 425
                        ? `${t('main-page.post-advert')}`
                        : `${t('main-page.publish')}`}
                </button>
                {isMobile ? (
                    <Person
                        stroke={isAuth ? '#1f6fde' : '#1C1C1E'}
                        handleClick={
                            isAuth
                                ? () => setShowUserMenu(!showUserMenu)
                                : () => handleToggleModal()
                        }
                    />
                ) : (
                    <div className="language-auth">
                        <Langs />
                        {isAuth ? (
                            <div className="person-auth">
                                <Person
                                    stroke={isAuth ? '#1f6fde' : '#1C1C1E'}
                                    handleClick={() =>
                                        setShowUserMenu(!showUserMenu)
                                    }
                                />
                            </div>
                        ) : (
                            <div
                                className="auth-button"
                                onClick={handleToggleModal}
                            >
                                {t('main-page.login-register')}
                            </div>
                        )}
                    </div>
                )}
                <ModalMobile
                    showUserMenu={showUserMenu}
                    setShowUserMenu={setShowUserMenu}
                />
                <Modal />
                {isAddModalOpen && (
                    <ModalAddAdvert closeAddModal={closeAddModal} />
                )}
                {isCheckEmailModalOpen && <ModalCheckEmail />}
                {isResetPasswordModalOpen && <ModalResetPassword />}
            </div>
        </header>
    );
};
