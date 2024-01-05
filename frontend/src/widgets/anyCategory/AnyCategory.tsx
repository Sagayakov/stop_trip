import { useLocation } from 'react-router-dom';
import { useGetAdvertsQuery } from 'app/api/fetchAdverts.ts';
import { AdvertsTypes } from 'app/api/types/lastAdvertsTypes.ts';
import { LoadingWithBackground } from 'entities/loading/LoadingWithBackground.tsx';
import { useTranslation } from 'react-i18next';
import { Pagination } from 'features/pagination';
import { useRef } from 'react';
import style from 'pages/categoryPage/style/categoryPage.module.scss';
import { CategoryAdvert } from 'entities/categoryAdvert';

const AnyCategory = () => {
    const queryParam = useLocation().search;
    const { data, isLoading } = useGetAdvertsQuery(queryParam);
    const { t } = useTranslation();
    const parentRef = useRef<HTMLElement>(null);

    if (!data?.results.length && !isLoading) {
        return (
            <p className="announcement-not-found">
                {t('category-page.no-adverts')}
            </p>
        );
    }

    return (
        <section className={style.announcement} ref={parentRef}>
            {isLoading && <LoadingWithBackground />}
            {data?.results.length &&
                data.results.map((el: AdvertsTypes) => (
                    <CategoryAdvert el={el} />
                ))}{' '}
            <Pagination data={data} parentRef={parentRef} />
        </section>
    );
};

export default AnyCategory;
