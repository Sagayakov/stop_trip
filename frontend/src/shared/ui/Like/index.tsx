import { useEffect, useState } from 'react';
import { Favorite } from '../icons/icons-tools/Favorite';
import {
    useAddFavoriteMutation,
    useDeleteFromFavoritesMutation,
    useGetFavoritesQuery,
 } from '../../../app/api/fetchFavorites';
import { useAppSelector } from '../../../app/store/hooks';
import { toast } from 'react-toastify';

type LikeProps = {
    id: number;
    color?: string;
    strokeColor?: string;
};

export const Like = ({
    id,
    color = '#ff3f25',
    strokeColor = '#8F8F8F',
}: LikeProps) => {
    const { data } = useGetFavoritesQuery('');
    const [addFavorite] = useAddFavoriteMutation();
    const [deleteFromFavorites] = useDeleteFromFavoritesMutation();
    const isAuth = useAppSelector((state) => state.setIsAuth.isAuth);

    const [isLike, setIsLike] = useState(false);

    useEffect(() => {
        const target = data?.find((el) => el.id === id);
        setIsLike(!!target);
    }, [data, id]);

    const addToFavorite = () => {
        if (isAuth) {
            setIsLike(!isLike);

            !isLike
                ? addFavorite({ id })
                : deleteFromFavorites({ id });
        } else {
            toast.error(
                'Пожалуйста, авторизуйтесь для возможности добавления объявлений в избранное'
            );
        }  
    };

    return (
        <div className="add-to-favorite">
            <Favorite
                color={isLike ? color : 'transparent'}
                strokeColor={isLike ? 'transparent' : strokeColor}
                addToFavorite={addToFavorite}
            />
        </div>
    );
};
