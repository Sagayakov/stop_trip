import { NavLink, useParams } from 'react-router-dom';
import { categories } from '../../shared/const/categories';
import './breadCrumbs.scss';
import { ProductType } from '../../pages/advertPage/libr/types';
import { getCategorySubType } from '../../shared/utils/getCategorySubType';
import { categorySubTypesDictionary } from '../../shared/const/categorySubTypesDictionary';

export const BreadCrumbs = ({ data }: { data: ProductType }) => {
    const { category } = useParams();
    const categorySubType: keyof typeof categorySubTypesDictionary | null =
        getCategorySubType(data);

    return (
        <div className="bread-crumbs">
            <NavLink to="/">Главная</NavLink>
            <NavLink to={`/${category}`}>{` > ${
                categories[category!].description
            } `}</NavLink>
            {categorySubType && (
                <NavLink
                    to={`/${category}`}
                >{` > ${categorySubTypesDictionary[categorySubType]} `}</NavLink>
            )}
            {`> ${data.title}`}
        </div>
    );
};
