import { Suspense, lazy, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useMatchMedia } from 'app/hooks/useMatchMedia.ts';
const Controls = lazy(() => import('../../features/controls/Controls'));
import { Pagination } from 'features/pagination';
import { ArrowLeft10x24 } from 'shared/ui/icons/icons-tools/ArrowLeft10x24.tsx';
import { HorizontalMixer } from 'shared/ui/icons/icons-tools/HorizontalMixer.tsx';
const SettingCurrencyForm = lazy(
    () =>
        import('../../widgets/settingForm/settingCurrency/SettingCurrencyForm')
);
const SettingRealtyForm = lazy(
    () => import('../../widgets/settingForm/settingRealty/SettingRealtyForm')
);
const SettingTransportForm = lazy(
    () =>
        import(
            '../../widgets/settingForm/settingTransport/SettingTransportForm'
        )
);
const SettingTaxiForm = lazy(
    () => import('../../widgets/settingForm/settingTaxi/SettingTaxiForm')
);
const SettingServicesForm = lazy(
    () =>
        import('../../widgets/settingForm/settingServices/SettingServicesForm')
);
const SettingEventForm = lazy(
    () => import('../../widgets/settingForm/settingEvent/SettingEventForm')
);
const SettingJobForm = lazy(
    () => import('../../widgets/settingForm/settingJob/SettingJobForm')
);
const SettingExcursionForm = lazy(
    () =>
        import(
            '../../widgets/settingForm/settingExcursion/SettingExcursionForm'
        )
);
const SettingDocumentForm = lazy(
    () =>
        import('../../widgets/settingForm/settingDocument/SettingDocumentForm')
);
const SettingFoodForm = lazy(
    () => import('../../widgets/settingForm/settingFood/SettingFoodForm')
);
const SettingMarketForm = lazy(
    () => import('widgets/settingForm/settingMarket/SettingMarketForm.tsx')
);
import { LoadingWithBackground } from 'entities/loading/LoadingWithBackground.tsx';
import './style/category-page.scss';
import './style/1024-1439-category-page.scss';
import './style/768-1023-category-page.scss';
import './style/425-767-category-page.scss';
import './style/min-424-category-page.scss';
const AnyCategory = lazy(() => import('../../widgets/anyCategory/AnyCategory'));
import { useTranslation } from 'react-i18next';
import { useGetAdvertsQuery } from 'app/api/fetchAdverts';

export const CategoryPage = () => {
    const category = location.pathname.split('/')[1];
    const queryParam = useLocation().search;
    const { data } = useGetAdvertsQuery(queryParam);

    const [showFilters, setShowFilters] = useState<boolean>(false);
    const { isDesktop } = useMatchMedia();
    const { t } = useTranslation();

    const filterFormStyleMobile = {
        display: `${showFilters ? 'block' : 'none'}`,
        height: '115%', //когда добавится пагинация или что-то ниже объявлений, мб немного увеличить
    };

    const filterBtnStyle = {
        display: `${isDesktop ? 'none' : 'flex'}`,
        backgroundColor: `${showFilters ? '#CDE1FF' : '#EBF3FF'}`,
    };

    const handleClickFilterForm = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        event.stopPropagation();
        setShowFilters(false);
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
                    </NavLink>
                    <h1>{t(`categories.${category}`)}</h1>
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
                    <div
                        className="filter-form"
                        onClick={handleClickFilterForm}
                        style={
                            isDesktop
                                ? { display: 'block' }
                                : filterFormStyleMobile
                        }
                    >
                        {category === 'property' && (
                            <SettingRealtyForm
                                setShowFilters={setShowFilters}
                            />
                        )}
                        {category === 'transport' && (
                            <SettingTransportForm
                                setShowFilters={setShowFilters}
                            />
                        )}
                        {category === 'taxi' && (
                            <SettingTaxiForm setShowFilters={setShowFilters} />
                        )}
                        {category === 'service' && (
                            <SettingServicesForm
                                setShowFilters={setShowFilters}
                            />
                        )}
                        {category === 'job' && (
                            <SettingJobForm setShowFilters={setShowFilters} />
                        )}
                        {category === 'event' && (
                            <SettingEventForm setShowFilters={setShowFilters} />
                        )}
                        {category === 'exchange_rate' && (
                            <SettingCurrencyForm
                                setShowFilters={setShowFilters}
                            />
                        )}
                        {category === 'document' && (
                            <SettingDocumentForm
                                setShowFilters={setShowFilters}
                            />
                        )}
                        {category === 'excursion' && (
                            <SettingExcursionForm
                                setShowFilters={setShowFilters}
                            />
                        )}
                        {category === 'food' && (
                            <SettingFoodForm setShowFilters={setShowFilters} />
                        )}
                        {category === 'market' && (
                            <SettingMarketForm
                                setShowFilters={setShowFilters}
                            />
                        )}
                    </div>
                    <AnyCategory />
                </Suspense>
            </div>
            <Pagination data={data} />
        </>
    );
};
