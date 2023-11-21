import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useMatchMedia } from '../../app/hooks/useMatchMedia';
import { ProductType } from '../../pages/advertPage/libr/types';
import { categories } from '../../shared/const/categories';
import { categorySubTypesDictionary } from '../../shared/const/categorySubTypesDictionary';
import { ArrowLeft10x24 } from '../../shared/ui/icons/icons-tools/ArrowLeft10x24';
import { getCategorySubType } from '../../shared/utils/getCategorySubType';
import './breadCrumbs.scss';

export const BreadCrumbs = ({ data }: { data: ProductType }) => {
    const { category } = useParams();
    const categorySubType: keyof typeof categorySubTypesDictionary | null =
        getCategorySubType(data);
    const { isMobile } = useMatchMedia();
    const navigate = useNavigate()
    return (
        <div className="bread-crumbs">
            {isMobile ? (
                <>
                    <ArrowLeft10x24
                        style={{ cursor: 'pointer', marginRight: '16px' }}
                        handleClickPrev={() => navigate(-1)}
                    />
                    {<h1>{data.title}</h1>}
                </>
            ) : (
                <>
                    <NavLink to="/">Главная</NavLink>
                    <NavLink to={`/${category}`}>{`\u00A0>\u00A0${
                        categories[category!].description
                    }`}</NavLink>
                    {categorySubType && (
                        <NavLink
                            to={`/${category}`}
                        >{`\u00A0>\u00A0${categorySubTypesDictionary[categorySubType]}`}</NavLink>
                    )}
                    {`\u00A0>\u00A0${data.title}`}
                </>
            )}
        </div>
    );
};
