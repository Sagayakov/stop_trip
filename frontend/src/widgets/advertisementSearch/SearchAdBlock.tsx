import { AdvertsTypes } from 'app/api/types/lastAdvertsTypes.ts';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getDeclension } from 'shared/utils/getDeclension.ts';
import { CategoryAdvert } from 'entity/categoryAdvert';
import { useGetAdvertsQuery } from 'app/api/fetchAdverts.ts';
import { LoadingWithBackground } from 'entity/loading/LoadingWithBackground.tsx';
import style from 'pages/categoryPage/style/categoryPage.module.scss';

export const SearchAdBlock = () => {
    const { t } = useTranslation();
    const queryParam = useLocation().search;
    const { data, isSuccess, isLoading } = useGetAdvertsQuery(queryParam);

    const h3Text = () => {
        if (isSuccess) {
            if (data.count === 0) {
                return t('search_ad_page.no_results');
            }
            return t('search_ad_page.results_found', { count: data.count, declension: getDeclension(data.count, t) });
        }
    }

    return (
        <section className={style.announcement}>
            <h3 style={{fontSize: '20px'}} >{h3Text()}</h3>
            {isLoading && <LoadingWithBackground />}
            {isSuccess
                && data.results.length > 0
                && data.results.length
                && data.results.map((el: AdvertsTypes, index: number) => (
                    <CategoryAdvert
                        {...el}
                        key={el.id}
                        index={index}
                    />
                ))}
        </section>
    )
}