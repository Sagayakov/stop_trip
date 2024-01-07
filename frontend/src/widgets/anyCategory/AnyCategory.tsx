import { useLocation } from 'react-router-dom';
import { useGetAdvertsQuery } from 'app/api/fetchAdverts.ts';
import { AdvertsTypes } from 'app/api/types/lastAdvertsTypes.ts';
import { LoadingWithBackground } from 'entities/loading/LoadingWithBackground.tsx';
import { useTranslation } from 'react-i18next';
import style from 'pages/categoryPage/style/categoryPage.module.scss';
import { CategoryAdvert } from 'entities/categoryAdvert';

const AnyCategory = () => {
    const queryParam = useLocation().search;
    const { data, isLoading } = useGetAdvertsQuery(queryParam);
    const { t } = useTranslation();

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
                data.results.map((el: AdvertsTypes) => (
                    <CategoryAdvert el={el} key={el.id} />
                ))}{' '}
        </section>
    );
};

export default AnyCategory;
