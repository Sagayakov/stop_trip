import { useState } from 'react';
import { AllCategories, Input, ModalWindow, SelectGeo } from 'entity/controls';
import styles from './controls.module.scss';
import { useMatchMedia } from 'app/hooks/useMatchMedia.ts';
import { useTranslation } from 'react-i18next';

interface Props {
    /** Главная страница: показать крупный заголовок над поиском. */
    hero?: boolean;
}

const Controls = ({ hero = false }: Props) => {
    const [showModal, setShowModal] = useState(false);
    const { isMobile } = useMatchMedia();
    const { t } = useTranslation();

    return (
        <div
            className={
                hero ? `${styles.controls} ${styles.controls_hero}` : styles.controls
            }
        >
            {hero && (
                <div className={styles.hero_text}>
                    <h1>{t('main-page.hero-title')}</h1>
                    <p>{t('main-page.hero-subtitle')}</p>
                </div>
            )}
            <div className={styles.controls_wrapper}>
                {!isMobile && (
                    <AllCategories
                        showModal={showModal}
                        setShowModal={setShowModal}
                    />
                )}
                <Input />
                {!isMobile && <SelectGeo />}
                <ModalWindow
                    showModal={showModal}
                    setShowModal={setShowModal}
                />
            </div>
        </div>
    );
};

export default Controls;
