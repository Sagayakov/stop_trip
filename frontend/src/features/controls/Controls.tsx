import { useAppSelector } from 'app/store/hooks';
import { COUNTRY_PLACE, findPopularCity } from 'shared/const/geo.ts';
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
    const lang = useAppSelector((state) => state.setLang.lang);
    const city = findPopularCity(useAppSelector((state) => state.selectedCity.city));

    return (
        <div
            className={
                hero ? `${styles.controls} ${styles.controls_hero}` : styles.controls
            }
        >
            {hero && (
                <div className={styles.hero_text}>
                    <h1>
                        {t('main-page.hero-title', {
                            place: city
                                ? lang === 'ru'
                                    ? city.inRu
                                    : `in ${city.en}`
                                : COUNTRY_PLACE[lang === 'ru' ? 'ru' : 'en'],
                        })}
                    </h1>
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
                {/* Выбор города — только на главной: он фильтрует ленту свежих объявлений */}
                {hero && <SelectGeo />}
                <ModalWindow
                    showModal={showModal}
                    setShowModal={setShowModal}
                />
            </div>
        </div>
    );
};

export default Controls;
