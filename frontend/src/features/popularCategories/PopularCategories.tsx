import { useEffect, useState } from 'react';
import { ArrowRight } from '../../shared/ui/icons/icons-tools/ArrowRight';
import './popularCategories.scss';
import { AllCategories, ModalWindow } from '../../entities/controls';
import { categories } from '../../shared/const/categories';
import { useNavigate } from 'react-router-dom';

export const PopularCategories = () => {
    const [showModal, setShowModal] = useState(false);
    const [width, setWidth] = useState<number>(window.innerWidth);
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="popular-categories">
            <div className="popular-categories-wrapper">
                <div className="categories-titles">
                    <h3>Популярные категории</h3>
                    {width < 767 && (
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
                        .filter((el) => el[0] !== 'events')
                        .map((el) => {
                            const { icon: Icon } = el[1];
                            return (
                                <div
                                    key={el[0]}
                                    className={`category ${el[0]}>`}
                                    onClick={() => navigate(`/${el[0]}`)}
                                >
                                    <Icon />
                                    <p>{el[1].description}</p>
                                    <span>
                                        115 предложений{' '}
                                        <ArrowRight color="#1F6FDE" />
                                    </span>
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
};
