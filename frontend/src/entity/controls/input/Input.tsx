import { Find } from 'shared/ui/icons/icons-tools/Find.tsx';
import { useTranslation } from 'react-i18next';
import styles from 'features/controls/controls.module.scss';
import { toast } from 'react-toastify';
import { useMatchMedia } from 'app/hooks/useMatchMedia';
import { Tooltip } from 'react-tooltip';

export const Input = () => {
    const { t } = useTranslation();
    const { isDesktop } = useMatchMedia();

    const handleClick = () => {
        const toastId = 'search toast';
        toast.warn(`${t('main-page.search-tooltip')}`, { toastId });
    };
    // isTablet && toast.warn(`${t('main-page.search-tooltip')}`);

    return (
        <div
            className={styles.input_wrapper}
            onClick={handleClick}
            data-tooltip-id="search-tooltip"
            data-tooltip-content={t('main-page.search-tooltip')}
        >
            <Find />
            <input
                name="search_input"
                placeholder={t('main-page.find')}
                disabled
            />
            {isDesktop && (
                <Tooltip
                    id="search-tooltip"
                    variant="warning"
                    place="bottom"
                    opacity={1}
                    style={{ zIndex: '5', fontFamily: 'Inter' }}
                />
            )}
        </div>
    );
};
