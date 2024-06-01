import Controls from 'features/controls/Controls.tsx';
import { LoaidngWithoutBackground } from 'entity/loading/LoaidngWithoutBackground.tsx';
import { Suspense, useRef, useState } from 'react';
import style from 'pages/categoryPage/style/categoryPage.module.scss';
import styles from 'widgets/settingForm/forms/filtersForm.module.scss';
import { useMatchMedia } from 'app/hooks/useMatchMedia.ts';
import { Price as PriceType } from 'widgets/settingForm/settingRealty/libr/TypeSettingRealty.ts';
import { Filters } from 'widgets/advertisementSearch';

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
    const { isDesktop } = useMatchMedia();

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
            <div className={style.category_content_wrapper} ref={parentRef}>
                <div className={style.filters_announcement}>
                    <section
                        className={styles.filter_form}
                        onClick={handleClickFilterForm}
                        style={
                            isDesktop
                                ? { display: 'block' }
                                : filterFormStyleMobile
                        }
                    >
                        <Filters />
                    </section>
                </div>
                <section className={style.announcement}>
                    {/*{isLoading && <LoadingWithBackground />}*/}
                    {/*{data?.results.length &&*/}
                    {/*    data.results.map((el: AdvertsTypes, index: number) => (*/}
                    {/*        <CategoryAdvert*/}
                    {/*            {...el}*/}
                    {/*            key={el.id}*/}
                    {/*            index={index}*/}
                    {/*        />*/}
                    {/*    ))}{' '}*/}
                </section>
            </div>
        </Suspense>
    );
};

export default AdvertisementSearch;