import Controls from 'features/controls/Controls.tsx';
import { useLocation } from 'react-router-dom';
import { useGetSearchAdvertsQuery } from 'app/api/fetchSearchAdverts.ts';
import { LoaidngWithoutBackground } from 'entity/loading/LoaidngWithoutBackground.tsx';
import { Cart } from 'entity/lastAdverts';
import { AdvertsTypes } from 'app/api/types/lastAdvertsTypes.ts';
import styles from 'widgets/lastAdverts/libr/LastAdverts.module.scss';
import { Suspense, useRef } from 'react';
import { Pagination } from 'features/pagination';
import { useTranslation } from 'react-i18next';
import { getDeclension } from 'shared/utils/getDeclension.ts';

const AdvertisementSearch = () => {
    const location = useLocation();
    const searchValue = location.state?.query;
    const { t } = useTranslation();
    const parentRef = useRef<HTMLDivElement>(null);
    const { data, isSuccess } = useGetSearchAdvertsQuery(searchValue);

    const h3Text = () => {
        if (isSuccess) {
            if (data.count === 0) {
                return t('search_ad_page.no_results');
            }
            return t('search_ad_page.results_found', { count: data.count, declension: getDeclension(data.count, t) });
        }
    }

    return (
        <Suspense fallback={<LoaidngWithoutBackground />}>
            <Controls />
            <section className={styles.last_announcement}>
                {isSuccess && <div
                    className={styles.last_announcement_wrapper}
                    ref={parentRef}
                >
                    <h3>{h3Text()}</h3>
                    <div className={styles.announcement_list}>
                        {data.results.map((ad: AdvertsTypes, index: number) => (
                            <Cart {...ad} key={ad.id} index={index} />
                        ))}
                    </div>
                    <Pagination data={data} parentRef={parentRef} />
                </div>}
            </section>
        </Suspense>
    );
};

export default AdvertisementSearch;