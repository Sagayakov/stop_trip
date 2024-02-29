import { useRef } from 'react';
import { MapIcon } from 'shared/ui/icons/icons-tools/MapIcon.tsx';
import { useMatchMedia } from 'app/hooks/useMatchMedia.ts';
import { useTranslation } from 'react-i18next';
import styles from 'features/controls/controls.module.scss';

export const SelectGeo = () => {
    const selectRef = useRef<null | HTMLSelectElement>(null);
    const { isMobile } = useMatchMedia();
    const { t } = useTranslation();

    return (
        <div className={styles.select_wrapper}>
            {!isMobile ? (
                <MapIcon color="#8f8f8f" />
            ) : (
                <p>{t('main-page.in-city')}</p>
            )}
            <select name="city_select" ref={selectRef} disabled>
                <option value={t('main-page.goa')}>{t('main-page.goa')}</option>
                <option value={t('main-page.goa')}>{t('main-page.goa')}</option>
                <option value={t('main-page.goa')}>{t('main-page.goa')}</option>
                <option value={t('main-page.goa')}>{t('main-page.goa')}</option>
                <option value={t('main-page.goa')}>{t('main-page.goa')}</option>
            </select>
        </div>
    );
};
