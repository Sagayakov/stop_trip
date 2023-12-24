import { lazy, Suspense, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useMatchMedia } from 'app/hooks/useMatchMedia.ts';
export const AnyCategory = lazy(() => import('widgets/anyCategory/AnyCategory'));
export const Controls = lazy(() => import('features/controls/Controls'));
import { ArrowLeft10x24 } from 'shared/ui/icons/icons-tools/ArrowLeft10x24.tsx';
import { HorizontalMixer } from 'shared/ui/icons/icons-tools/HorizontalMixer.tsx';
import { LoadingWithBackground } from 'entities/loading/LoadingWithBackground.tsx';
import { useTranslation } from 'react-i18next';
import { FilterForms } from 'widgets/settingForm/forms/FilterForms.tsx';
import style from './style/categoryPage.module.scss';

export const CategoryPage = () => {
    const category = location.pathname.split('/')[1];
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
                    <div className={style.bread_crumbs}>
                        <NavLink to="/">{t('category-page.main-link')}</NavLink>
                        {` > ${t(`categories.${category}`)}`}
                    </div>
                    <h1>{t(`categories.${category}`)}</h1>
                </>
            ) : (
                <div className={style.bread_crumbs}>
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
                        className={style.filter_btn}
                        onClick={() => setShowFilters(!showFilters)}
                        style={filterBtnStyle}
                    >
                        <HorizontalMixer />
                        {t('filters.filters')}
                    </div>
                </div>
            )}
            <div className={style.filters_announcement}>
                <Suspense fallback={<LoadingWithBackground />}>
                        <FilterForms showFilters={showFilters} setShowFilters={setShowFilters} />
                    <AnyCategory />
                </Suspense>
            </div>
        </>
    );
};