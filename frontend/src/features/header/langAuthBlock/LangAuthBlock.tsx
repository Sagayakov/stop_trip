import { LangAuthBlockDesctop, LangAuthBlockMobile } from 'entities/header';
import { useMatchMedia } from 'app/hooks/useMatchMedia.ts';
import { ModalMobile } from 'features/header/modal/modalMobile/ModalMobile.tsx';
import { useState } from 'react';
import { Modal } from 'features/header/modal';

export const LangAuthBlock = () => {
    const [showUserMenu, setShowUserMenu] = useState(false);
    const { isMobile } = useMatchMedia();

    return (
        <>
            {isMobile ? (
                <LangAuthBlockMobile
                    showUserMenu={showUserMenu}
                    setShowUserMenu={setShowUserMenu}
                />
            ) : (
                <LangAuthBlockDesctop
                    showUserMenu={showUserMenu}
                    setShowUserMenu={setShowUserMenu}
                />
            )}
            <ModalMobile
                showUserMenu={showUserMenu}
                setShowUserMenu={setShowUserMenu}
            />
            <Modal />
        </>
    );
};
