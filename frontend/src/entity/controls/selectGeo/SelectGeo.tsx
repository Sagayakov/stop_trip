import { useEffect, useRef, useState } from 'react';
import { MapIcon } from 'shared/ui/icons/icons-tools/MapIcon.tsx';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'app/store/hooks';
import { setSelectedCity } from 'features/citySelect/model/selectedCity.ts';
import { setPageMain } from 'widgets/lastAdverts/model/pageReducer/pageMain';
import { POPULAR_CITIES, findPopularCity, getCountryName } from 'shared/const/geo.ts';
import styles from './selectGeo.module.scss';

/**
 * Выбор города на главной: «Весь Вьетнам» или один из популярных городов.
 * Выбранный город фильтрует ленту «Свежие объявления» и запоминается в браузере.
 */
export const SelectGeo = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const lang = useAppSelector((state) => state.setLang.lang);
    const citySlug = useAppSelector((state) => state.selectedCity.city);
    const city = findPopularCity(citySlug);
    const [isOpen, setIsOpen] = useState(false);
    const rootRef = useRef<HTMLDivElement>(null);

    // закрываем список по клику мимо него и по Escape
    useEffect(() => {
        if (!isOpen) return;
        const onClick = (event: MouseEvent) => {
            if (!rootRef.current?.contains(event.target as Node)) setIsOpen(false);
        };
        const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setIsOpen(false);
        document.addEventListener('mousedown', onClick);
        document.addEventListener('keydown', onKey);
        return () => {
            document.removeEventListener('mousedown', onClick);
            document.removeEventListener('keydown', onKey);
        };
    }, [isOpen]);

    const choose = (slug: string | null) => {
        dispatch(setSelectedCity(slug));
        dispatch(setPageMain(1));
        setIsOpen(false);
    };

    const label = city ? (lang === 'ru' ? city.ru : city.en) : getCountryName(lang);

    return (
        <div className={styles.city_select} ref={rootRef}>
            <button
                type="button"
                className={`${styles.trigger} ${city ? styles.trigger_active : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                <MapIcon color={city ? '#0E6B5C' : '#63736E'} />
                <span>{label}</span>
                <svg className={styles.chevron} width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                    <path d="M3 4.5 6 7.5 9 4.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
            {isOpen && (
                <ul className={styles.menu} role="listbox">
                    <li>
                        <button
                            type="button"
                            role="option"
                            aria-selected={!city}
                            className={!city ? styles.selected : ''}
                            onClick={() => choose(null)}
                        >
                            {t('city-select.all', { country: getCountryName(lang) })}
                        </button>
                    </li>
                    {POPULAR_CITIES.map((item) => (
                        <li key={item.slug}>
                            <button
                                type="button"
                                role="option"
                                aria-selected={item.slug === citySlug}
                                className={item.slug === citySlug ? styles.selected : ''}
                                onClick={() => choose(item.slug)}
                            >
                                {lang === 'ru' ? item.ru : item.en}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
