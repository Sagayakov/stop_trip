import { useGetAdvertsQuery } from 'app/api/fetchAdverts.ts';
import { AdvertsTypes } from 'app/api/types/lastAdvertsTypes.ts';
import { Cart } from 'entity/lastAdverts';
import { Pagination } from 'features/pagination';
import styles from './libr/LastAdverts.module.scss';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'app/store/hooks.ts';
import { Suspense, useRef } from 'react';
import { LoaidngWithoutBackground } from 'entity/loading/LoaidngWithoutBackground.tsx';
import { LoadingWithBackground } from 'entity/loading/LoadingWithBackground';

const LastAdverts = () => {
    const pageMain = useAppSelector((state) => state.setPageMain.pageMain);
    const { data, isLoading  } = useGetAdvertsQuery(`?page=${pageMain}`);
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
                    <h3>{t('main-page.last-adverts')}</h3>
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
