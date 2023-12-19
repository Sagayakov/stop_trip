import { lazy, Suspense, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useMatchMedia } from 'app/hooks/useMatchMedia.ts';
export const AnyCategory = lazy(() => import('widgets/anyCategory/AnyCategory'));
export const Controls = lazy(() => import('features/controls/Controls'));
import { Pagination } from 'features/pagination';
import { ArrowLeft10x24 } from 'shared/ui/icons/icons-tools/ArrowLeft10x24.tsx';
import { HorizontalMixer } from 'shared/ui/icons/icons-tools/HorizontalMixer.tsx';
import { LoadingWithBackground } from 'entities/loading/LoadingWithBackground.tsx';
import { useTranslation } from 'react-i18next';
import { useGetAdvertsQuery } from 'app/api/fetchAdverts';
import { FilterForms } from 'widgets/settingForm/Forms/FilterForms.tsx';
import './style/category-page.scss';
import './style/1024-1439-category-page.scss';
import './style/768-1023-category-page.scss';
import './style/425-767-category-page.scss';
import './style/min-424-category-page.scss';

export const CategoryPage = () => {
    const category = location.pathname.split('/')[1];
    const queryParam = useLocation().search;
    const { data } = useGetAdvertsQuery(queryParam);
    const [showFilters, setShowFilters] = useState<boolean>(false);
    const { isDesktop } = useMatchMedia();
    const { t } = useTranslation();

    const filterBtnStyle = {
        display: `${isDesktop ? 'none' : 'flex'}`,
        backgroundColor: `${showFilters ? '#CDE1FF' : '#EBF3FF'}`,
    };

    return (
        <>
            <Suspense fallback={<LoadingWithBackground />}>
                <Controls />
            </Suspense>
            {isDesktop ? (
                <>
                    <div className="bread-crumbs">
                        <NavLink to="/">{t('category-page.main-link')}</NavLink>
                        {` > ${t(`categories.${category}`)}`}
                    </div>
                    <h1>{t(`categories.${category}`)}</h1>
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
                        <h1>{t(`categories.${category}`)}</h1>
                    </NavLink>
                    <div
                        className="filter-btn"
                        onClick={() => setShowFilters(!showFilters)}
                        style={filterBtnStyle}
                    >
                        <HorizontalMixer />
                        {t('filters.filters')}
                    </div>
                </div>
            )}
            <div className="filters-announcement">
                <Suspense fallback={<LoadingWithBackground />}>
                        <FilterForms showFilters={showFilters} setShowFilters={setShowFilters} />
                    <AnyCategory />
                </Suspense>
            </div>
            <Pagination data={data} />
        </>
    );
};
