import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useMatchMedia } from '../../app/hooks/useMatchMedia';
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
    const [showFilters, setShowFilters] = useState<boolean>(false);
    const { isMobile, isTablet } = useMatchMedia()
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
        display: `${isMobile || isTablet ? 'flex' : 'none'}`,
        backgroundColor: `${showFilters ? '#CDE1FF' : '#EBF3FF'}`,
    };

    return (
        <>
            <Controls />
            {isMobile || isTablet ? (
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
            ) : (
                <>
                    <div className="bread-crumbs">
                        <NavLink to="/">Главная</NavLink>
                        {` > ${description}`}
                    </div>
                    <h1>{description}</h1>
                </>
            )}
            <div className="filters-adverts">
                <div
                    className="filter-form"
                    onClick={() => setShowFilters(false)} //мб из-за этого пропадает на телефоне фильтр
                    style={
                        isMobile
                        ? filterFormStyleDesctop
                        : filterFormStyleMobile
                    }
                >
                    {category === 'property' && (
                        <SettingRealtyForm setShowFilters={setShowFilters} />
                    )}
                    {category === 'transport' && (
                        <SettingTransportForm setShowFilters={setShowFilters} />
                    )}
                </div>
                <AnyCategory />
            </div>
            <Pagination />
        </>
    );
};
