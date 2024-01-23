import { Burger } from 'shared/ui/icons/icons-tools/Burger.tsx';
import { useTranslation } from 'react-i18next';
import styles from 'features/controls/controls.module.scss'

interface Props {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AllCategories = ({ showModal, setShowModal }: Props) => {
    const { t } = useTranslation();

    return (
        <div
            className={styles.button_all_categories}
            onClick={() => setShowModal(!showModal)}
        >
            <Burger color="white" />
            {t('main-page.all-categories')}
        </div>
    );
};
