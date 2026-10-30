import { COUNTRY, getCountryName } from 'shared/const/geo.ts';
import { useAppSelector } from 'app/store/hooks';
import { useRef } from 'react';
import { MapIcon } from 'shared/ui/icons/icons-tools/MapIcon.tsx';
import { useMatchMedia } from 'app/hooks/useMatchMedia.ts';
import { useTranslation } from 'react-i18next';
import styles from 'features/controls/controls.module.scss';

export const SelectGeo = () => {
    const selectRef = useRef<null | HTMLSelectElement>(null);
    const { isMobile } = useMatchMedia();
    const { t } = useTranslation();
    const lang = useAppSelector((state) => state.setLang.lang);

    return (
        <div className={styles.select_wrapper}>
            {!isMobile ? (
                <MapIcon color="#8f8f8f" />
            ) : (
                <p>{t('main-page.in-city')}</p>
            )}
            <select name="city_select" ref={selectRef} disabled>
                <option value={COUNTRY.slug}>{getCountryName(lang)}</option>
            </select>
        </div>
    );
};
