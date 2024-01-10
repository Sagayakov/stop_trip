//import { Like } from 'shared/ui/Like';
//import { Rating } from 'shared/ui/Rating';
import {
    useAddFavoriteMutation,
    useDeleteFromFavoritesMutation,
    useGetFavoritesQuery,
} from 'app/api/fetchFavorites';
import { AdvertsTypes } from 'app/api/types/lastAdvertsTypes';
import { useMatchMedia } from 'app/hooks/useMatchMedia';
import { useAppSelector } from 'app/store/hooks';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Favorite } from 'shared/ui/icons/icons-tools/Favorite';
import { getDate } from 'shared/utils/getDate';
import { prettifyPrice } from 'shared/utils/prettifyPrice';
import style from 'pages/categoryPage/style/categoryPage.module.scss';
import { useTranslation } from 'react-i18next';

export const CategoryAdvert = ({ el }: { el: AdvertsTypes }) => {
    const { id } = el;
    const category = location.pathname.split('/')[1];
    const { isMobile } = useMatchMedia();
    const lang = useAppSelector((state) => state.setLang.lang);
    const isAuth = useAppSelector((state) => state.setIsAuth.isAuth);
    const [addToFav, setAddToFav] = useState(false);
    const { data } = useGetFavoritesQuery('');
    const [addFavorite] = useAddFavoriteMutation();
    const [deleteFromFavorites] = useDeleteFromFavoritesMutation();
    const { t } = useTranslation();

    const notFoundImg = [
        '../../../src/entities/lastAdverts/ui/image-not-found.jpg',
        '../../../src/entities/lastAdverts/ui/image-not-found.jpg',
        '../../../src/entities/lastAdverts/ui/image-not-found.jpg',
    ];

    const styleFav = {
        color: addToFav && isAuth ? '#FF3F25' : '#f9f9f9',
        strokeColor: addToFav && isAuth ? '#FF3F25' : '#8F8F8F',
    };

    const handleAddToFavorite = () => {
        if (isAuth) {
            setAddToFav(!addToFav);

            !addToFav ? addFavorite({ id }) : deleteFromFavorites({ id });
        } else {
            toast.error(`${t('main-page.toast-favs')}`);
        }
    };

    useEffect(() => {
        const target = data?.results.find((el) => el.id === id);
        isAuth && setAddToFav(!!target);
    }, [data, id, isAuth]);

    const date = getDate(el.date_create);
    const { dayToDisplay } = date;
    let day = dayToDisplay;

    if (dayToDisplay === 'Сегодня') {
        day = lang === 'ru' ? 'Сегодня' : 'Today';
    }
    if (dayToDisplay === 'Вчера') {
        day = lang === 'ru' ? 'Вчера' : 'Yesterday';
    }

    return (
        <NavLink
            className={style.card}
            key={el.id}
            to={`/${category}/${el.id}/`}
        >
            <span
                onClick={(event) => event.stopPropagation()}
                className={style.add_to_favorite}
            >
                <Favorite
                    color={styleFav.color}
                    strokeColor={styleFav.strokeColor}
                    addToFavorite={handleAddToFavorite}
                />
            </span>
            <div className={style.image}>
                {isMobile ? (
                    <>
                        {!el.images[0]
                            ? notFoundImg.map((el, index) => (
                                  <img src={el} alt="Not found" key={index} />
                              ))
                            : el.images.map((item) => (
                                  <img
                                      src={item.image}
                                      key={item.image}
                                      alt="Not found"
                                  />
                              ))}
                    </>
                ) : (
                    <img
                        src={
                            !el.images[0]
                                ? '../../../src/entities/lastAdverts/ui/image-not-found.jpg'
                                : el.images[0].image
                        }
                        alt="Not found"
                    />
                )}
            </div>
            <div className={style.description}>
                <h2>{el.title}</h2>
                {el.city && (
                    <p className={style.description_location}>
                        {`${el.country?.name || ''}, ${
                            el.region?.name || ''
                        }, ${el.city?.name || ''}`}
                    </p>
                )}
                <h3>
                    {el.price
                        ? prettifyPrice(el.price)
                        : `${t('advert-page.price-negotiated')}`}
                </h3>
                <p className={style.card_description}>{el.description}</p>
                <div className={style.author}>
                    {`${el.owner.full_name[0].toUpperCase()}${el.owner.full_name.slice(
                        1
                    )}`}
                    <span className={style.rating_number}>4.5</span>
                    {/* <Rating rating={4.5} /> */}
                </div>
                <p className={style.time}>
                    {`${day}, ${date.hours}:${date.minutes}`}
                </p>
            </div>
        </NavLink>
    );
};
