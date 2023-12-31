import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useMatchMedia } from 'app/hooks/useMatchMedia.ts';
import { ProductType } from 'pages/advertPage/libr/types.ts';
import { ArrowLeft10x24 } from 'shared/ui/icons/icons-tools/ArrowLeft10x24.tsx';
import styles from './breadCrumbs.module.scss';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'app/store/hooks';

export const BreadCrumbs = ({ data }: { data: ProductType }) => {
    const { category } = useParams();
    const { isMobile } = useMatchMedia();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const pageCategory = useAppSelector(
        (state) => state.setPageCategory.pageCategory
    );

    return (
        <div className={styles.bread_crumbs}>
            {isMobile ? (
                <div
                    className={styles.link_category}
                    onClick={
                        () => navigate(-1)
                        // navigate(
                        //     `/${category}/?category=${category}&page=${pageCategory}`
                        // )
                    }
                >
                    <ArrowLeft10x24 style={{ marginRight: '16px' }} />
                    {<h1>{data.title}</h1>}
                </div>
            ) : (
                <>
                    <NavLink to="/">{t('category-page.main-link')}</NavLink>
                    {category && (
                        <NavLink
                            to={`/${category}/?category=${category}&page=${pageCategory}`}
                        >{`\u00A0>\u00A0${t(
                            `categories.${category}`
                        )}`}</NavLink>
                    )}
                    {`\u00A0>\u00A0${data.title}`}
                </>
            )}
        </div>
    );
};
