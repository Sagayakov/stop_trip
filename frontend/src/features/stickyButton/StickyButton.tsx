import { useTranslation } from "react-i18next";
import styles from './stickyButton.module.scss';

export const StickyButton = () => {
    const { t } = useTranslation();
    
    return (
        <input
            type="submit"
            value={t('filters.apply')}
            className={styles.sticky_button}
        />
    )
}