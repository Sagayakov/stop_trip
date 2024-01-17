import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'shared/ui/icons/icons-tools/ArrowRight.tsx';
import { Category, categories } from 'shared/const/categories.tsx';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'app/store/hooks';
import styles from './modalCategories.module.scss';

interface Props {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ModalWindow = ({ showModal, setShowModal }: Props) => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const pageCategory = useAppSelector(
        (state) => state.setPageCategory.pageCategory
    );

    const navigateAndClose = (el: [string, Category]) => {
        setShowModal(false);
        navigate(`/${el[0]}/?category=${el[0]}&page=${pageCategory}`);
    };

    const classNameForModalCategories = () => {
        const visible = showModal ? styles.visible : '';
        return `${styles.modal_categories} ${visible}`;
    };
    const classNameForModalContent = () => {
        const visibleContent = showModal ? styles.visible_content : '';
        return `${styles.modal_content} ${visibleContent}`;
    };

    return (
        <div
            className={classNameForModalCategories()}
            onClick={() => setShowModal(false)}
        >
            <div
                className={classNameForModalContent()}
                onClick={(event) => event.stopPropagation()}
            >
                {Object.entries(categories).map((el) => {
                    return (
                        <div
                            key={el[0]}
                            className={styles.modal_category}
                            onClick={() => navigateAndClose(el)}
                        >
                            <span>{t(`categories.${el[0]}`)}</span>
                            <ArrowRight color="#1C1C1E" />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
