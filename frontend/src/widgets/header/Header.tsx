import { useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Dispatch } from 'redux';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import { Modal } from '../../features/header/modal';
import { ModalAddAdvert } from '../../features/header/modal/modalAddAdvert/ModalAddAdvert';
import { ModalMobile } from '../../features/header/modal/modalMobile/ModalMobile';
import { toggleModalEnter } from '../../features/header/model/modalAuth/reducers/toggleModal';
import { LogoHeader } from '../../shared/ui/icons/icons-tools/LogoHeader';
import { Person } from '../../shared/ui/icons/icons-tools/Person';
import { Plus } from '../../shared/ui/icons/icons-tools/Plus';
import './header.scss';
import { setIsAuth } from '../../features/header/model/modalAuth/reducers/auth';
import { checkAuthentication } from './libr/authentication/checkAuthentication';
import { getTokensFromStorage } from './libr/authentication/getTokensFromStorage';
import { handleScroll } from './libr/eventListeners/handleScroll';

export const Header = () => {
    const dispatch: Dispatch = useAppDispatch();
    const toggle = useAppSelector((state) => state.toggleModalEnter.toggle);
    const [width, setWidth] = useState<number>(window.innerWidth);
    const ref = useRef(null);

    const [showUserMenu, setShowUserMenu] = useState(false); //потом переделать на редьюсер
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const handleToggleModal = () => dispatch(toggleModalEnter(!toggle));
    const isAuth = useAppSelector((state) => state.setIsAuth.isAuth);

    const navigate = useNavigate();

    const { accessToken, refreshToken } = getTokensFromStorage();

    if (!refreshToken) dispatch(setIsAuth(false)); //если нет refresh токена, то нужно заново авторизоваться и получить новый

    useEffect(() => {
        checkAuthentication(dispatch);

        const handleResize = () => {
            setWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);

        handleScroll(ref)

        window.addEventListener('scroll', () => handleScroll(ref));

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', () => handleScroll(ref));
        };
    }, [accessToken]);

    const addAdvert = () => {
        setIsAddModalOpen(true);
    };

    const closeAddModal = () => {
        setIsAddModalOpen(false);
    };

    return (
        <header ref={ref}>
            <div className="header-wrapper">
                <NavLink to="/">
                    <LogoHeader />
                </NavLink>
                <button
                    className={isAuth ? 'addAdvert active' : 'addAdvert'}
                    onClick={isAuth ? () => navigate('/add-advert') : addAdvert}
                >
                    <Plus color="white" />
                    {width >= 425 ? 'Разместить объявление' : 'Опубликовать'}
                </button>
                {width <= 767 ? (
                    <Person
                        handleClick={
                            isAuth
                                ? () => setShowUserMenu(!showUserMenu)
                                : () => handleToggleModal()
                        }
                    /> //когда будет регистрация, переделать на редьюсер
                ) : (
                    <div className="language-auth">
                        <div className="language">
                            <div className="language-ru">RU</div>
                            <div className="language-eng">ENG</div>
                        </div>
                        {isAuth ? (
                            <div className="person-auth">
                                <Person
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
                                Вход/Регистрация
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
            </div>
        </header>
    );
};
