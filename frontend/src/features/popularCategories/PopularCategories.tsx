import { useState } from 'react';
//import { ArrowRight } from 'shared/ui/icons/icons-tools/ArrowRight.tsx';
import './libr/popularCategories.scss';
import { AllCategories, ModalWindow } from 'entities/controls';
import { categories } from 'shared/const/categories.tsx';
import { useNavigate } from 'react-router-dom';
import { useMatchMedia } from 'app/hooks/useMatchMedia.ts';
//import { useGetAdvertsQuery } from 'app/api/fetchAdverts.ts';
//import { GetSpelling } from './libr/getSpelling';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'app/store/hooks';

const PopularCategories = () => {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const { isMobile } = useMatchMedia();
    const { t } = useTranslation();
    const pageCategory = useAppSelector(
        (state) => state.setPageCategory.pageCategory
    );

    return (
        <div className="popular-categories">
            <div className="popular-categories-wrapper">
                <div className="categories-titles">
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

                <div className="categories-list">
                    {Object.entries(categories)
                        .filter((el) => el[0] !== 'event')
                        .map((el) => {
                            const { icon: Icon } = el[1];
                            /* const offersAmount = data?.results.filter(
                                (item) => item.category === el[0]
                            ).length; */
                            const category = el[0];
                            return (
                                <div
                                    key={el[0]}
                                    className={`category ${el[0]}>`}
                                    onClick={() =>
                                        navigate(
                                            `/${el[0]}/?category=${el[0]}&page=${pageCategory}`
                                        )
                                    }
                                >
                                    <Icon />
                                    <p>{t(`categories.${category}`)}</p>
                                    {/* <span>
                                        {`${offersAmount} ${GetSpelling(
                                          offersAmount
                                        )} `}
                                        <ArrowRight color="#1F6FDE" />
                                    </span> */}
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
};

export default PopularCategories;
