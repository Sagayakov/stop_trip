import { NavLink, useParams } from 'react-router-dom';
import { categories } from '../../shared/const/categories';
import './breadCrumbs.scss';

export const BreadCrumbs = ({ title }: { title: string }) => {
    const { category } = useParams(); //добавить тип выбранного имущества

    return (
        <div className="bread-crumbs">
            <NavLink to="/">Главная</NavLink>
            <NavLink to={`/${category}`}>{` > ${
                categories[category!].description
            } `}</NavLink>
            {`> ${title}`}
        </div>
    );
};
