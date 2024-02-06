import { useEffect, useState } from 'react';
import { Favorite } from '../icons/icons-tools/Favorite';
import {
    useAddFavoriteMutation,
    useDeleteFromFavoritesMutation,
    useGetFavoritesQuery,
} from 'app/api/fetchFavorites.ts';
import { useAppSelector } from 'app/store/hooks.ts';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import styles from 'entity/photoSlider/libr/photoSlider.module.scss';

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
    const { t } = useTranslation();

    const [isLike, setIsLike] = useState(false);

    useEffect(() => {
        const target = data?.find((el) => el === id);
        isAuth && setIsLike(!!target);
    }, [data, id, isAuth]);

    const addToFavorite = () => {
        if (isAuth) {
            setIsLike(!isLike);

            isLike === false
                ? addFavorite({ id })
                : deleteFromFavorites({ id });
        } else {
            toast.error(`${t('main-page.toast-favs')}`);
        }
    };

    return (
        <div className={styles.add_to_favorite}>
            <Favorite
                color={isLike && isAuth ? color : 'transparent'}
                strokeColor={isLike && isAuth ? 'transparent' : strokeColor}
                addToFavorite={addToFavorite}
            />
        </div>
    );
};
