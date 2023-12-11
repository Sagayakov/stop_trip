import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LastAdvertsTypes } from '../../app/api/types/lastAdvertsTypes';
import { Favorite } from '../../shared/ui/icons/icons-tools/Favorite';
import { getDateOfCreating } from './libr/getDateOfCreating';
import {
    useAddFavoriteMutation,
    useDeleteFromFavoritesMutation,
    useGetFavoritesQuery,
 } from '../../app/api/fetchFavorites';
import { useAppSelector } from '../../app/store/hooks';
import { toast } from 'react-toastify';

export const Cart = ({ cart }: { cart: LastAdvertsTypes }) => {
    const {
        price,
        title,
        id,
        images,
        category,
        date_create: dateCreate,
    } = cart;
    const { data } = useGetFavoritesQuery('');
    const [addFavorite] = useAddFavoriteMutation();
    const [deleteFromFavorites] = useDeleteFromFavoritesMutation();
    const isAuth = useAppSelector((state) => state.setIsAuth.isAuth);
    
    const [addToFav, setAddToFav] = useState(false);

    useEffect(() => {
        const target = data?.find((el) => el.id === id);
        isAuth && setAddToFav(!!target);
    }, [data, id, isAuth]);

    const style = {
        color: addToFav && isAuth ? '#FF3F25' : '#f9f9f9',
        strokeColor: addToFav && isAuth ? '#FF3F25' : '#8F8F8F',
    };

    const handleAddToFavorite = () => {
        if (isAuth) {
            setAddToFav(!addToFav);

            !addToFav
                ? addFavorite({ id })
                : deleteFromFavorites({ id });
        } else {
            toast.error(
                'Пожалуйста, авторизуйтесь для возможности добавления объявлений в избранное'
            );
        }  
    };

    return (
        <NavLink
            className="announcement-cart"
            to={`/${category}/${id}/`}
        >
            <img
                src={
                    images[0] === undefined
                        ? '../../../src/entities/lastAdverts/ui/image-not-found.jpg'
                        : images[0].image
                }
                alt="img"
            />
            <div className="description">
                <div className="price">
                    <p>{price ? `₹${price}` : 'Договорная'}</p>
                    <span>
                        <Favorite
                            color={style.color}
                            strokeColor={style.strokeColor}
                            addToFavorite={handleAddToFavorite}
                        />
                    </span>
                </div>
                <p>{title}</p>
                <div className='user-main'>
                    Константин
                    <span className="rating-number">4.5</span>
                </div>
                <span>{getDateOfCreating(dateCreate)}</span>
            </div>
        </NavLink>
    );
};
