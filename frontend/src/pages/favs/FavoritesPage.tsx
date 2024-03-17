import { useGetFavoritesQuery } from 'app/api/fetchFavorites';
import { LoadingWithBackground } from 'entity/loading/LoadingWithBackground';
import { NavLink } from 'react-router-dom';
import styles from './libr/favorites.module.scss';
import { useTranslation } from 'react-i18next';
import { Cart } from 'entity/lastAdverts/Cart';
import { useEffect } from 'react';
import { useGetAdvertsQuery } from 'app/api/fetchAdverts';

const FavoritesPage = () => {
    const { data, isLoading, refetch } = useGetFavoritesQuery('');
    const { data: advertsData } = useGetAdvertsQuery('');
    const { t } = useTranslation();

    useEffect(() => {
        refetch();
        // pushViewListWithDataResults(data, "Избранные")
        const path = window.location.pathname.slice(1, -1);
        sessionStorage.setItem('prevLocation', path); //для условия для яндекс метрики
    }, [refetch, data]);

    const targetData = advertsData?.results?.filter(
        (el) => data?.includes(el.id)
    );

    return (
        <>
            {isLoading && <LoadingWithBackground />}
            <div className={styles.bread_crumbs}>
                <NavLink to="/">{t('category-page.main-link')}</NavLink>
                &nbsp;{` > ${t('modal-logged.favorites')}`}
            </div>
            <h1 className={styles.title}>
                {t('modal-logged.favorites')} <span>BETA</span>
            </h1>
            {targetData && targetData.length ? (
                <div className={styles.fav_list}>
                    {targetData.map((el, index: number) => (
                        <Cart key={el.id} {...el} index={index} />
                    ))}
                </div>
            ) : (
                !isLoading && (
                    <h3 className={styles.no_favorites}>
                        {t('favorites.no-favorites')}
                    </h3>
                )
            )}
        </>
    );
};

export default FavoritesPage;
