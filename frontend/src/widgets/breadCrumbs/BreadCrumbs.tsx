import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useMatchMedia } from '../../app/hooks/useMatchMedia';
import { ProductType } from '../../pages/advertPage/libr/types';
import { ArrowLeft10x24 } from '../../shared/ui/icons/icons-tools/ArrowLeft10x24';
import './breadCrumbs.scss';
import { useTranslation } from 'react-i18next';

export const BreadCrumbs = ({ data }: { data: ProductType }) => {
    const { category } = useParams();
    /* const categorySubType: keyof typeof categorySubTypesDictionary | null =
        getCategorySubType(data); */
    const { isMobile } = useMatchMedia();
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <div className="bread-crumbs">
            {isMobile ? (
                <>
                    <ArrowLeft10x24
                        style={{ cursor: 'pointer', marginRight: '16px' }}
                        handleClickPrev={() => navigate(-1)}
                    />
                    {<h1 onClick={() => navigate(-1)}>{data.title}</h1>}
                </>
            ) : (
                <>
                    <NavLink to="/">{t('category-page.main-link')}</NavLink>
                    <NavLink to={`/${category}`}>{`\u00A0>\u00A0${t(
                        `categories.${category}`
                    )}`}</NavLink>
                    {/* {categorySubType && (
                        <NavLink
                            to={`/${category}`}
                        >{`\u00A0>\u00A0${categorySubTypesDictionary[categorySubType]}`}</NavLink>
                    )} */}
                    {`\u00A0>\u00A0${data.title}`}
                </>
            )}
        </div>
    );
};
