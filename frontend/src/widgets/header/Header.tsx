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
import { useTranslation } from 'react-i18next';
import { UniversalButton } from 'entity/universalEntites';
import { LangAuthBlock } from 'features/header/langAuthBlock/LangAuthBlock.tsx';

export const Header = () => {
    const dispatch: Dispatch = useAppDispatch();
    const ref = useRef(null);
    const { t } = useTranslation();

    const [top, setTop] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const isAuth = useAppSelector((state) => state.setIsAuth.isAuth);
    const isCheckEmailModalOpen = useAppSelector(
        (state) => state.setIsCheckMailModalOpen.isCheckMailModalOpen
    );
    const isDevNotificationVisible = useAppSelector(
        (state) => state.setIsDevNotificationVisible.isDevNotificationVisible
    );
    const devNotificationHeight = useAppSelector(
        (state) => state.setIsDevNotificationVisible.height
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

    useEffect(() => {
        setTop(isDevNotificationVisible && window.scrollY === 0 ? devNotificationHeight : '');
    }, [isDevNotificationVisible, devNotificationHeight]);

    const addAdvert = () => {
        setIsAddModalOpen(true);
    };

    const closeAddModal = () => {
        setIsAddModalOpen(false);
    };
    const getClassName = () =>
        isAuth ? `${styles.addAdvert} ${styles.active}` : `${styles.addAdvert}`;

    return (
        <header
            ref={ref}
            style={{ top }}
        >
            <div className={styles.header_wrapper}>
                <LogoHeader />
                <UniversalButton
                    className={getClassName()}
                    onClick={
                        isAuth ? () => navigate('/add-announcement') : addAdvert
                    }
                >
                    <Plus color="white" />
                    {window.innerWidth >= 550
                        ? `${t('main-page.post-advert')}`
                        : window.innerWidth >= 424
                          ? `${t('main-page.publish')}`
                          : ''}
                </UniversalButton>
                <LangAuthBlock />
                {isAddModalOpen && (
                    <ModalAddAdvert
                        closeAddModal={closeAddModal}
                        text={t('modal-add-advert.must')}
                    />
                )}
                {isCheckEmailModalOpen && <ModalCheckEmail />}
            </div>
        </header>
    );
};
