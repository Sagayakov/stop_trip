import { useRef } from 'react';
import { MapIcon } from '../../../shared/ui/icons/icons-tools/MapIcon';
import { useMatchMedia } from '../../../app/hooks/useMatchMedia';
import { useTranslation } from 'react-i18next';

export const SelectGeo = () => {
    const selectRef = useRef<null | HTMLSelectElement>(null);
    const { isMobile } = useMatchMedia();
    const { t } = useTranslation();

    return (
        <div className="select-wrapper">
            {!isMobile ? (
                <MapIcon color="#1F6FDE" />
            ) : (
                <p>{t('main-page.in-city')}</p>
            )}
            <select ref={selectRef} disabled>
                <option value={t('main-page.goa')}>{t('main-page.goa')}</option>
                <option value={t('main-page.goa')}>{t('main-page.goa')}</option>
                <option value={t('main-page.goa')}>{t('main-page.goa')}</option>
                <option value={t('main-page.goa')}>{t('main-page.goa')}</option>
                <option value={t('main-page.goa')}>{t('main-page.goa')}</option>
            </select>
        </div>
    );
};
