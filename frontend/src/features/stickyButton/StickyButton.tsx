import { useTranslation } from "react-i18next";
import { getDeclension } from "shared/utils/getDeclension";
import styles from './stickyButton.module.scss';

export const StickyButton = ({ count }: { count: number | undefined }) => {
    const { t } = useTranslation();
    
    return (
        <input
            type="submit"
            value={t('filters.show.show', { count, declension: getDeclension(count || 0, t) })}
            className={styles.sticky_button}
            disabled={count === 0}
        />
    );
};
