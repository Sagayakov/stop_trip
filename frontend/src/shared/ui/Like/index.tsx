import { useEffect, useState } from 'react';
import { Favorite } from '../icons/icons-tools/Favorite';
import {
    useAddFavoriteMutation,
    useDeleteFromFavoritesMutation,
    useGetFavoritesQuery,
 } from '../../../app/api/fetchFavorites';

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

    const [isLike, setIsLike] = useState(false);

    useEffect(() => {
        const target = data?.find((el) => el.id === id);
        setIsLike(!!target);
    }, [data, id]);

    const addToFavorite = () => {
        setIsLike(!isLike);
        !isLike
            ? addFavorite({ id })
            : deleteFromFavorites({ id });
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
