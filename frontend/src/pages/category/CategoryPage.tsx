import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Controls } from '../../features/controls';
import { Pagination } from '../../features/pagination';
import { categories } from '../../shared/const/categories';
import { ArrowLeft10x24 } from '../../shared/ui/icons/icons-tools/ArrowLeft10x24';
import { HorizontalMixer } from '../../shared/ui/icons/icons-tools/HorizontalMixer';
import { AnyCategory, SettingRealtyForm, SettingTransportForm } from '../../widgets/index';
import './style/category-page.scss';
import './style/1024-1439-category-page.scss';
import './style/768-1023-category-page.scss';
import './style/425-767-category-page.scss';
import './style/min-424-category-page.scss';

export const CategoryPage = () => {
    const category = location.pathname.slice(1);
    const description = categories[category].description;
    const [width, setWidth] = useState<number>(window.innerWidth);
    const [showFilters, setShowFilters] = useState<boolean>(false);

    const filterFormStyleMobile = {
        display: `${showFilters ? 'block' : 'none'}`,
        backgroundColor: 'rgb(0, 0, 0, 0.7)',
        zIndex: 10,
        height: '460vh',
        width: '100vw',
        position: 'absolute',
    };
    const filterFormStyleDesctop = {
        display: 'block',
    };
    const filterBtnStyle = {
        display: `${width > 767 ? 'none' : 'flex'}`,
        backgroundColor: `${showFilters ? '#CDE1FF' : '#EBF3FF'}`,
    };

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
            if (window.innerWidth >= 768) {
                setShowFilters(true);
            } else {
                setShowFilters(false);
            }
        };
        window.addEventListener('resize', handleResize);
    }, [window.innerWidth]);

    return (
        <>
            <Controls />
            {width > 767 ? (
                <>
                    <div className="bread-crumbs">
                        <NavLink to="/">Главная</NavLink>
                        {` > ${description}`}
                    </div>
                    <h1>{description}</h1>
                </>
            ) : (
                <div className="bread-crumbs">
                    <NavLink to="/">
                        <ArrowLeft10x24
                            style={{
                                cursor: 'pointer',
                                marginRight: '8px',
                            }}
                        />
                    </NavLink>
                    <h1>{description}</h1>
                    <div
                        className="filter-btn"
                        onClick={() => setShowFilters(!showFilters)}
                        style={filterBtnStyle}
                    >
                        <HorizontalMixer />
                        Фильтры
                    </div>
                </div>
            )}
            <div className="filters-adverts">
                <div
                    className="filter-form"
                    onClick={() => setShowFilters(false)}
                    style={
                        width <= 767
                            ? filterFormStyleMobile
                            : filterFormStyleDesctop
                    }
                >
                    {category === 'property' && <SettingRealtyForm setShowFilters={setShowFilters} />}
                    {category === 'transport' && <SettingTransportForm setShowFilters={setShowFilters} />}
                </div>
                <AnyCategory />
            </div>
            <Pagination />
        </>
    );
};
