import Controls from 'features/controls/Controls.tsx';
import { LoaidngWithoutBackground } from 'entity/loading/LoaidngWithoutBackground.tsx';
import { Suspense, useRef, useState } from 'react';
import style from 'pages/categoryPage/style/categoryPage.module.scss';
import styles from 'widgets/settingForm/forms/filtersForm.module.scss';
import { useMatchMedia } from 'app/hooks/useMatchMedia.ts';
import { Price as PriceType } from 'widgets/settingForm/settingRealty/libr/TypeSettingRealty.ts';
import { Filters } from 'widgets/advertisementSearch';
import { NavLink, useLocation } from 'react-router-dom';
import { useGetAdvertsQuery } from 'app/api/fetchAdverts.ts';
import { SearchAdBlock } from 'widgets/advertisementSearch';
import { Pagination } from 'features/pagination';
import { ArrowLeft10x24 } from 'shared/ui/icons/icons-tools/ArrowLeft10x24.tsx';
import { HorizontalMixer } from 'shared/ui/icons/icons-tools/HorizontalMixer.tsx';
import { useTranslation } from 'react-i18next';


export interface SearchFormTypes {
    city: string;
    region: string;
    price: PriceType;
    category: string;
}
export interface SearchOptions {
    value: string;
    label: string;
}

const AdvertisementSearch = () => {
    const parentRef = useRef<HTMLDivElement>(null);
    const [showFilters, setShowFilters] = useState<boolean>(false);
    const { t } = useTranslation();
    const { isDesktop } = useMatchMedia();
    const queryParam = useLocation().search;
    const { data } = useGetAdvertsQuery(queryParam);

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
    const filterFormStyleMobile = {
        display: `${showFilters ? 'block' : 'none'}`,
        height: '115%', //мб немного увеличить, чтобы было вплотную к футеру
    };

    
    return (
        <Suspense fallback={<LoaidngWithoutBackground />}>
            <Controls />
            {!isDesktop && (
                <div className={style.bread_crumbs}>
                    <NavLink to="/">
                        <ArrowLeft10x24
                            style={{
                                cursor: 'pointer',
                                marginRight: '8px',
                            }}
                        />
                        <h1>{t('add-page.back')}</h1>
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
            <div className={style.category_content_wrapper} ref={parentRef}>
                <div className={style.filters_announcement}>
                    <div
                        className={styles.filter_form}
                        onClick={handleClickFilterForm}
                        style={
                            isDesktop
                                ? { display: 'block' }
                                : filterFormStyleMobile
                        }
                    >
                        <Filters />
                    </div>
                    <SearchAdBlock />
                </div>
                <Pagination data={data} parentRef={parentRef} />
            </div>
        </Suspense>
    );
};

export default AdvertisementSearch;