import { useLocation } from 'react-router-dom';
import { useGetAdvertsQuery } from 'app/api/fetchAdverts.ts';
import { AdvertsTypes } from 'app/api/types/lastAdvertsTypes.ts';
import { LoadingWithBackground } from 'entity/loading/LoadingWithBackground.tsx';
import { useTranslation } from 'react-i18next';
import style from 'pages/categoryPage/style/categoryPage.module.scss';
import { CategoryAdvert } from 'entity/categoryAdvert';
import { useEffect } from 'react';
import { pushViewListWithDataResults } from 'shared/eCommercy/pushViewListWithDataResults.ts';

const AnyCategory = () => {
    const queryParam = useLocation().search;
    const { data, isLoading } = useGetAdvertsQuery(queryParam);
    const { t } = useTranslation();

    useEffect(() => {
        pushViewListWithDataResults(data, "Категория товаров");
    }, [data]);

    if (!data?.results.length && !isLoading) {
        return (
            <p className={style.announcement_not_found}>
                {t('category-page.no-adverts')}
            </p>
        );
    }

    return (
        <section className={style.announcement}>
            {isLoading && <LoadingWithBackground />}
            {data?.results.length &&
                data.results.map((el: AdvertsTypes, index: number) => (
                    <CategoryAdvert
                        {...el}
                        key={el.id}
                        index={index}
                    />
                ))}{' '}
        </section>
    );
};

export default AnyCategory;
