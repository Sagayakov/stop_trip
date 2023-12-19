import { useState } from 'react';
import { AllCategories, ModalWindow } from 'entities/controls';
import { categories } from 'shared/const/categories.tsx';
import { useNavigate } from 'react-router-dom';
import { useMatchMedia } from 'app/hooks/useMatchMedia.ts';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'app/store/hooks';
import styles from './libr/popularCategories.module.scss';

const PopularCategories = () => {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const { isMobile } = useMatchMedia();
    const { t } = useTranslation();
    const pageCategory = useAppSelector(
        (state) => state.setPageCategory.pageCategory
    );

    return (
        <div className={styles.popular_categories}>
            <div className={styles.popular_categories_wrapper}>
                <div className={styles.categories_titles}>
                    <h3>{t('main-page.popular-categories')}</h3>
                    {isMobile && (
                        <>
                            <AllCategories
                                showModal={showModal}
                                setShowModal={setShowModal}
                            />
                            <ModalWindow
                                showModal={showModal}
                                setShowModal={setShowModal}
                            />
                        </>
                    )}
                </div>

                <div className={styles.categories_list}>
                    {Object.entries(categories)
                        .filter((el) => el[0] !== 'event')
                        .map((el) => {
                            const { icon: Icon } = el[1];
                            const category = el[0];
                            return (
                                <div
                                    key={el[0]}
                                    className={`${styles.category} ${el[0]}>`}
                                    onClick={() =>
                                        navigate(
                                            `/${el[0]}/?category=${el[0]}&page=${pageCategory}`
                                        )
                                    }
                                >
                                    <Icon />
                                    <p>{t(`categories.${category}`)}</p>
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
};

export default PopularCategories;
