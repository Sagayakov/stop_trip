import { useNavigate } from 'react-router-dom';
import { categories } from 'shared/const/categories.tsx';
import styles from './notFoundCategories.module.scss';
import { useTranslation } from 'react-i18next';
import { useMatchMedia } from 'app/hooks/useMatchMedia.ts';

const NotFoundCategories = () => {
    const navigate = useNavigate();
    const { isMobile } = useMatchMedia();
    const shownCategoriesNumber = isMobile ? 4 : 5;
    const { t } = useTranslation();

    return (
        <section className={styles.categories_not_found}>
            {Object.entries(categories)
                .slice(0, shownCategoriesNumber)
                .map((el) => {
                    const { icon: Icon } = el[1];
                    return (
                        <div
                            key={el[0]}
                            className={`${styles.category} ${el[0]}`}
                            onClick={() => navigate(`/${el[0]}/`)}
                        >
                            <Icon />
                            <span>{t(`categories.${el[0]}`)}</span>
                        </div>
                    );
                })}
        </section>
    );
};

export default NotFoundCategories;
