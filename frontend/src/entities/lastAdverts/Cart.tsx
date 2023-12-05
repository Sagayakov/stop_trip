import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LastAdvertsTypes } from '../../app/api/types/lastAdvertsTypes';
import { Favorite } from '../../shared/ui/icons/icons-tools/Favorite';
import { getDateOfCreating } from './libr/getDateOfCreating';
import {
    useAddFavoriteMutation,
    useDeleteFromFavoritesMutation,
    useGetFavoritesQuery,
 } from '../../app/api/fetchFavorites';

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
    
    const [addToFav, setAddToFav] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const target = data?.find((el) => el.id === id);
        setAddToFav(!!target);
    }, [data, id]);

    const style = {
        color: addToFav ? '#FF3F25' : '#f9f9f9',
        strokeColor: addToFav ? '#FF3F25' : '#8F8F8F',
    };

    const handleAddToFavorite = () => {
        setAddToFav(!addToFav);
        !addToFav
            ? addFavorite({ id })
            : deleteFromFavorites({ id });
    };

    return (
        <div
            className="adverts-cart"
            onClick={() => navigate(`/${category}/${id}/`)}
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
        </div>
    );
};
