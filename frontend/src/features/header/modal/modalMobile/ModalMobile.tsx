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
import { Langs } from '../../../../entities/langs';
import { useTranslation } from 'react-i18next';

interface Props {
    showUserMenu: boolean;
    setShowUserMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ModalMobile = (props: Props) => {
    const { showUserMenu, setShowUserMenu } = props;
    const dispatch: Dispatch = useAppDispatch();
    const [width, setWidth] = useState<number>(window.innerWidth);
    const { t } = useTranslation();

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
        /* localStorage.removeItem('rememberMe'); */
        localStorage.removeItem('isAuth');
    };

    return (
        <div
            className={`modal-mobile ${showUserMenu ? 'visible' : ''}`}
            // className="modal-mobile"
            // style={{ display: `${showUserMenu ? 'block' : 'none'}` }}
            onClick={() => setShowUserMenu(false)}
        >
            <div
                className={`modal-mobile-content ${
                    showUserMenu ? 'visible-content' : ''
                }`}
                // className="modal-mobile-content"
                onClick={(event) => event.stopPropagation()}
            >
                <div className="menu">
                    <div className="user-option">
                        <Docs />
                        <p className="user-option-text">
                            {t('modal-logged.adverts')}
                        </p>
                    </div>
                    <div className="user-option">
                        <Message color="#1C1C1E" stroke="#1C1C1E" />
                        <p className="user-option-text">
                            {t('modal-logged.messages')}
                        </p>
                    </div>
                    <div className="user-option">
                        <Favorite color="white" strokeColor="#1C1C1E" />
                        <p className="user-option-text">
                            {t('modal-logged.favorites')}
                        </p>
                    </div>
                    <div className="user-option">
                        <Setting color="#1C1C1E" stroke="#1C1C1E" />
                        <p className="user-option-text">
                            {t('modal-logged.settings')}
                        </p>
                    </div>
                    {width < 767 && (
                        <div className="language-auth">
                            <Langs />
                        </div>
                    )}
                </div>
                <p onClick={handleLogout}>{t('modal-logged.logout')}</p>
            </div>
        </div>
    );
};
