import { Controls } from '../../features/controls';
import { categories } from '../../shared/const/categories';
import { NavLink } from 'react-router-dom';
import './style/category-page.scss';
import './style/1024-1439-category-page.scss'
import './style/768-1023-category-page.scss'
import './style/425-767-category-page.scss'
import { AnyCategory, SettingAdvertsForm } from '../../widgets/index';
import { Pagination } from '../../features/pagination';
import { useEffect, useState } from 'react';
import { ArrowLeft14x7 } from '../../shared/ui/icons/icons-tools/ArrowLeft14x7';

export const CategoryPage = () => {
    const category = location.pathname.slice(1);
    const description = categories[category].description;
    const [width, setWidth] = useState<number>(window.innerWidth)

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
    }, [window.innerWidth])

    return (
        <>
            <Controls />
            {width > 475 ? (
                <>
                    <div className="bread-crumbs">
                        <NavLink to="/">Главная</NavLink>
                        {` > ${description}`}
                    </div>
                    <h1>{description}</h1>
                </>
            ) : (
                <>
                    <div className="bread-crumbs">
                        <NavLink to="/">
                            <ArrowLeft14x7 color='' style={{
                                cursor: 'pointer',
                                marginRight: '16px'
                            }}/>
                        </NavLink>

                    </div>
                </>
            )}
            <div className="filters-adverts">
                <SettingAdvertsForm />
                <AnyCategory />
            </div>
            <Pagination />
        </>
    );
};
