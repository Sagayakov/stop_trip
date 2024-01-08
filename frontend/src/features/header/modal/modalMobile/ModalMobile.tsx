import { Dispatch } from '@reduxjs/toolkit';
import { setIsAuth } from 'features/header/model/modalAuth/reducers/auth.ts';
import { useAppDispatch } from 'app/store/hooks.ts';
import { Docs } from 'shared/ui/icons/category/Docs.tsx';
import { Favorite } from 'shared/ui/icons/icons-tools/Favorite.tsx';
import { Message } from 'shared/ui/icons/icons-tools/Message.tsx';
import { Setting } from 'shared/ui/icons/icons-tools/Setting.tsx';
import './modalMobile.scss';
import { clearTokensFromCookies } from 'app/cookie/cookieAuth.ts';
import { Langs } from 'entities/langs';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { useMatchMedia } from 'app/hooks/useMatchMedia';
import { toast } from 'react-toastify';
import { Tooltip } from 'react-tooltip';

interface Props {
    showUserMenu: boolean;
    setShowUserMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ModalMobile = (props: Props) => {
    const { showUserMenu, setShowUserMenu } = props;
    const dispatch: Dispatch = useAppDispatch();
    const { t } = useTranslation();
    const { isDesktop, isMobile } = useMatchMedia();

    const handleLogout = () => {
        dispatch(setIsAuth(false));
        setShowUserMenu(false);
        clearTokensFromCookies();
        sessionStorage.clear();
        localStorage.removeItem('isAuth');
    };

    const handleClickMessages = () =>
        !isDesktop && toast.warn(`${t('main-page.messages-tooltip')}`);

    return (
        <div
            className={`modal-mobile ${showUserMenu ? 'visible' : ''}`}
            onClick={() => setShowUserMenu(false)}
        >
            <div
                className={`modal-mobile-content ${
                    showUserMenu ? 'visible-content' : ''
                }`}
                onClick={(event) => event.stopPropagation()}
            >
                <div className="menu">
                    <NavLink
                        className="user-option"
                        to={'/my-announcements'}
                        onClick={() => setShowUserMenu(false)}
                    >
                        <Docs />
                        <p className="user-option-text">
                            {t('modal-logged.adverts')}
                        </p>
                    </NavLink>
                    <div
                        className="user-option my-messages"
                        onClick={handleClickMessages}
                        data-tooltip-id="modal-tooltip"
                        data-tooltip-content={t('main-page.messages-tooltip')}
                    >
                        <Message color="#bcbcbc" stroke="#bcbcbc" />
                        <p className="user-option-text my-messages">
                            {t('modal-logged.messages')}
                        </p>
                    </div>
                    <NavLink
                        className="user-option"
                        to={'/favorites'}
                        onClick={() => setShowUserMenu(false)}
                    >
                        <Favorite color="#f9f9f9" strokeColor="#1F6FDE" />
                        <p className="user-option-text">
                            {t('modal-logged.favorites')}
                        </p>
                    </NavLink>
                    <div className="user-option">
                        <Setting color="#1F6FDE" stroke="#1F6FDE" />
                        <p className="user-option-text">
                            {t('modal-logged.settings')}
                        </p>
                    </div>
                    {isMobile && <Langs />}
                </div>
                <p onClick={handleLogout} className="user-option-logout">
                    {t('modal-logged.logout')}
                </p>
            </div>
            {isDesktop && (
                <Tooltip
                    id="modal-tooltip"
                    variant="warning"
                    place="top"
                    opacity={1}
                    style={{ zIndex: '10', fontFamily: 'Inter' }}
                />
            )}
        </div>
    );
};
