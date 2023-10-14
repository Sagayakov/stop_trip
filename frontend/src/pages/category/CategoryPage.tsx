import { Controls } from '../../features/controls';
import { categories } from '../../shared/const/categories';
import { NavLink } from 'react-router-dom';
import './category-page.scss';
import { AnyCategory, SettingAdvertsForm } from '../../widgets/index';
import { Pagination } from '../../features/pagination';

export const CategoryPage = () => {
    const category = location.pathname.slice(1);
    const description = categories[category].description;

    return (
        <>
            <Controls />
            <div className="bread-crumbs">
                <NavLink to="/">Главная</NavLink>
                {` > ${description}`}
            </div>
            <h1>{description}</h1>
            <div className="filters-adverts">
                <SettingAdvertsForm />
                <AnyCategory />
            </div>
            <Pagination />
        </>
    );
};
