import { Suspense, lazy, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useMatchMedia } from '../../app/hooks/useMatchMedia';
const Controls = lazy(() => import('../../features/controls/Controls'));
import { Pagination } from '../../features/pagination';
import { categories } from '../../shared/const/categories';
import { ArrowLeft10x24 } from '../../shared/ui/icons/icons-tools/ArrowLeft10x24';
import { HorizontalMixer } from '../../shared/ui/icons/icons-tools/HorizontalMixer';
const SettingCurrencyForm = lazy(() => import('../../widgets/settingForm/settingCurrency/SettingCurrencyForm'));
const SettingRealtyForm = lazy(() => import('../../widgets/settingForm/settingRealty/SettingRealtyForm'));
const SettingTransportForm = lazy(() => import('../../widgets/settingForm/settingTransport/SettingTransportForm'));
const SettingTaxiForm = lazy(() => import('../../widgets/settingForm/settingTaxi/SettingTaxiForm'));
const SettingServicesForm = lazy(() => import('../../widgets/settingForm/settingServices/SettingServicesForm'));
const SettingEventForm = lazy(() => import('../../widgets/settingForm/settingEvent/SettingEventForm'));
const SettingJobForm = lazy(() => import('../../widgets/settingForm/settingJob/SettingJobForm'));
import './style/category-page.scss';
import './style/1024-1439-category-page.scss';
import './style/768-1023-category-page.scss';
import './style/425-767-category-page.scss';
import './style/min-424-category-page.scss';
import { LoadingWithBackground } from '../../entities/loading/LoadingWithBackground';
const AnyCategory = lazy(() => import('../../widgets/anyCategory/AnyCategory'));

export const CategoryPage = () => {
    const category = location.pathname.split('/')[1];
    const description = categories[category].description;
    const [showFilters, setShowFilters] = useState<boolean>(false);

    const { isDesktop } = useMatchMedia();

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
                        <NavLink to="/">Главная</NavLink>
                        {` > ${description}`}
                    </div>
                    <h1>{description}</h1>
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
                    <h1>{description}</h1>
                    <div
                        className="filter-btn"
                        onClick={() => setShowFilters(!showFilters)}
                        style={filterBtnStyle}
                    >
                        <HorizontalMixer />
                        Фильтры
                    </div>
                </div>
            )}
            <div className="filters-announcement">
                <Suspense fallback={<LoadingWithBackground />}>
                    <div
                        className="filter-form"
                        onClick={handleClickFilterForm}
                        style={
                            isDesktop ? { display: 'block' } : filterFormStyleMobile
                        }
                    >
                        {category === 'property' && (
                            <SettingRealtyForm setShowFilters={setShowFilters} />
                        )}
                        {category === 'transport' && (
                            <SettingTransportForm setShowFilters={setShowFilters} />
                        )}
                        {category === 'taxi' && (
                            <SettingTaxiForm setShowFilters={setShowFilters} />
                        )}
                        {category === 'service' && (
                            <SettingServicesForm setShowFilters={setShowFilters} />
                        )}
                        {category === 'job' && (
                            <SettingJobForm setShowFilters={setShowFilters} />
                        )}
                        {category === 'event' && (
                            <SettingEventForm setShowFilters={setShowFilters}/>
                        )}
                        {category === 'exchange_rate' && (
                            <SettingCurrencyForm setShowFilters={setShowFilters}/>
                        )}
                    </div>
                    <AnyCategory />
                </Suspense>
            </div>
            <Pagination />
        </>
    );
};
