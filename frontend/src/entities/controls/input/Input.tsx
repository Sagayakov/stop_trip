import { Find } from 'shared/ui/icons/icons-tools/Find.tsx';
import { useTranslation } from 'react-i18next';
import styles from 'features/controls/controls.module.scss'

export const Input = () => {
    const { t } = useTranslation();

    return (
        <div className={styles.input_wrapper}>
            <Find />
            <input placeholder={t('main-page.find')} />
        </div>
    );
};
