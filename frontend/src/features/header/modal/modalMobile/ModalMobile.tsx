import { Dispatch } from '@reduxjs/toolkit';
import { setIsAuth } from '../../../../features/header/model/modalAuth/reducers/auth';
import { useAppDispatch } from '../../../../app/store/hooks';
import { Docs } from '../../../../shared/ui/icons/category/Docs';
import { Favorite } from '../../../../shared/ui/icons/icons-tools/Favorite';
import { Message } from '../../../../shared/ui/icons/icons-tools/Message';
import { Setting } from '../../../../shared/ui/icons/icons-tools/Setting';
import './modalMobile.scss';
import { clearTokensFromCookies } from '../../../../app/cookie/cookieAuth';
import { useEffect, useState } from 'react';

interface Props {
    showUserMenu: boolean;
    setShowUserMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ModalMobile = (props: Props) => {
    const { showUserMenu, setShowUserMenu } = props;
    const dispatch: Dispatch = useAppDispatch();
    const [width, setWidth] = useState<number>(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleLogout = () => {
        dispatch(setIsAuth(false));
        setShowUserMenu(false);
        clearTokensFromCookies();
        sessionStorage.clear();
        localStorage.removeItem('rememberMe');
    };

    return (
        <div
            className="modal-mobile"
            style={{ display: `${showUserMenu ? 'block' : 'none'}` }}
            onClick={() => setShowUserMenu(false)}
        >
            <div
                className="modal-mobile-content"
                onClick={(event) => event.stopPropagation()}
            >
                <div className="menu">
                    <div className="user-option">
                        <Docs />
                        <p className="user-option-text">Мои объявления</p>
                    </div>
                    <div className="user-option">
                        <Message color="#1C1C1E" stroke="#1C1C1E" />
                        <p className="user-option-text">Мои сообщения</p>
                    </div>
                    <div className="user-option">
                        <Favorite color="white" strokeColor="#1C1C1E" />
                        <p className="user-option-text">Избранные</p>
                    </div>
                    <div className="user-option">
                        <Setting color="#1C1C1E" stroke="#1C1C1E" />
                        <p className="user-option-text">Настройки</p>
                    </div>
                    {width < 767 && (
                        <div className="language-auth">
                            <div className="language">
                                <div className="language-ru">RU</div>
                                <div className="language-eng">ENG</div>
                            </div>
                        </div>
                    )}
                </div>
                <p onClick={handleLogout}>Выход</p>
            </div>
        </div>
    );
};
