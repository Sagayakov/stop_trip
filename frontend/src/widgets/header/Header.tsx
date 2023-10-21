import { useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import { Modal } from '../../features/header/modal';
import { ModalMobile } from '../../features/header/modal/modalMobile/ModalMobile';
import { toggleModalEnter } from '../../features/header/model/modalAuth/reducers/toggleModal';
import { LogoHeader } from '../../shared/ui/icons/icons-tools/LogoHeader';
import { Person } from '../../shared/ui/icons/icons-tools/Person';
import { Plus } from '../../shared/ui/icons/icons-tools/Plus';
import './header.scss';
import { ModalAddAdvert } from '../../features/header/modal/modalAddAdvert/ModalAddAdvert';
import { Dispatch } from 'redux';
import { clearTokensFromCookies, getTokensAuthFromCookies, saveTokensAuthToCookie } from '../../app/cookie/cookieAuth';
import { setIsAuth } from '../../features/header/model/modalAuth/reducers/auth';

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

    const rememberMe = 'true' === localStorage.getItem('rememberMe') ? true : false

    const {accessToken, refreshToken} = getTokensAuthFromCookies()
    const checkAuth = async() => {
        const url = import.meta.env.VITE_BASE_URL
        const headersConfig ={
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }

        if (accessToken) { //если токена нет, вернется статус 401
            try {
                const res = await fetch(`${url}/api/auth/jwt/verify/`, {
                    method: 'POST',
                    headers: headersConfig,
                    body: JSON.stringify({ token: accessToken }),
                });
                if (res.status === 200) dispatch(setIsAuth(true))
                return res
            } catch (error) {
                console.log(error)
            }
        } else {
            const response = await fetch(`${url}/api/auth/jwt/refresh/`,{
                method: 'POST',
                headers: headersConfig,
                body: JSON.stringify({ refresh: refreshToken }),
            });
            const data = await response.json();
            saveTokensAuthToCookie(data.access, refreshToken);
        }
    }

    if (!refreshToken) dispatch(setIsAuth(false)) //если нет refresh токена, то нужно заново авторизоваться и получить новый

    // function handleBeforeUnload(event: BeforeUnloadEvent){
    //     if (event.target instanceof Window){
    //         if (rememberMe === false){
    //             localStorage.removeItem('rememberMe')
    //             clearTokensFromCookies()
    //         }
    //     }
    // }//удалить токены авторизации из cookie и состояние чекбокса "Запомнить меня", если не нужно запоминать пользователя

    useEffect(() => {
        checkAuth()//чтобы не вылетало из акка при перезагрузке страницы


        const handleResize = () => {
            setWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);

        const handleScroll = () => {
            if (ref.current) {
                if (
                    document.body.scrollTop > 1 ||
                    document.documentElement.scrollTop > 1
                ) {
                    (ref.current as HTMLElement).classList.add('fixed-header');
                } else {
                    (ref.current as HTMLElement).classList.remove(
                        'fixed-header'
                    );
                }
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleScroll);
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
