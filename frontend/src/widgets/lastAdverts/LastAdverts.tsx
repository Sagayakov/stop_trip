import { useGetAdvertsQuery } from 'app/api/fetchAdverts.ts';
import { AdvertsTypes } from 'app/api/types/lastAdvertsTypes.ts';
import { Cart } from 'entity/lastAdverts';
import { Pagination } from 'features/pagination';
import styles from './libr/LastAdverts.module.scss';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'app/store/hooks.ts';
import { findPopularCity } from 'shared/const/geo.ts';
import { setSelectedCity } from 'features/citySelect/model/selectedCity.ts';
import { setPageMain } from 'widgets/lastAdverts/model/pageReducer/pageMain';
import { Suspense, useRef } from 'react';
import { LoaidngWithoutBackground } from 'entity/loading/LoaidngWithoutBackground.tsx';
import { LoadingWithBackground } from 'entity/loading/LoadingWithBackground';

const LastAdverts = () => {
    const pageMain = useAppSelector((state) => state.setPageMain.pageMain);
    // Город, выбранный рядом с поиском: лента показывает объявления только из него
    const citySlug = useAppSelector((state) => state.selectedCity.city);
    const city = findPopularCity(citySlug);
    const lang = useAppSelector((state) => state.setLang.lang);
    const dispatch = useAppDispatch();
    const { data, isLoading } = useGetAdvertsQuery(
        `?page=${pageMain}${city ? `&city=${city.slug}` : ''}`
    );
    const { t } = useTranslation();
    const parentRef = useRef<HTMLDivElement>(null);

    // useEffect(() => {
    //     pushViewListWithDataResults(data, "Последние объявления");//добавляем в яндекс метрику просмотр списка товаров
    // }, [data]);

    if (isLoading) return <LoadingWithBackground />;

    return (
        <Suspense fallback={<LoaidngWithoutBackground />}>
            <div className={styles.last_announcement}>
                <div
                    className={styles.last_announcement_wrapper}
                    ref={parentRef}
                >
                    <div className={styles.heading}>
                        <h3>{t('main-page.last-adverts')}</h3>
                        {city && (
                            <button
                                type="button"
                                className={styles.city_chip}
                                onClick={() => {
                                    dispatch(setSelectedCity(null));
                                    dispatch(setPageMain(1));
                                }}
                                title={t('city-select.reset')}
                            >
                                {lang === 'ru' ? city.ru : city.en}
                                <span aria-hidden="true">×</span>
                            </button>
                        )}
                    </div>
                    {data && data.results.length === 0 && (
                        <p className={styles.empty}>{t('city-select.empty')}</p>
                    )}
                    <div className={styles.announcement_list}>
                        {data &&
                            data.results.map((elem: AdvertsTypes, index) => (
                                <Cart
                                    {...elem}
                                    key={elem.id}
                                    index={index}
                                />
                            ))}
                    </div>
                    <Pagination data={data} parentRef={parentRef} />
                </div>
            </div>
        </Suspense>
    );
};

export default LastAdverts;
