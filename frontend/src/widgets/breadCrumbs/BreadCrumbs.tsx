import { NavLink, useParams } from 'react-router-dom';
import { categories } from '../../shared/const/categories';

export const BreadCrumbs = ({ title }: { title: string }) => {
    const { category } = useParams(); //добавить тип выбранного имущества

    return (
        <div className="bread-crumbs">
            <NavLink to="/">Главная</NavLink>
            {` >${categories[category!].description} `}
            <NavLink to={`/${category}`} />
            {`> ${title}`}
        </div>
    );
};
