import { useEffect, useState } from 'react';
import { Favorite } from '../icons/icons-tools/Favorite';
import {
    useAddFavoriteMutation,
    useDeleteFavoriteMutation,
    useGetFavoritesQuery,
} from 'app/api/fetchFavorites.ts';
import { useAppSelector } from 'app/store/hooks.ts';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import styles from 'entity/photoSlider/libr/photoSlider.module.scss';
import { AdvertsTypes } from 'app/api/types/lastAdvertsTypes';

type LikeProps = {
    slug: string;
    color?: string;
    strokeColor?: string;
};

export const Like = ({
    slug,
    color = '#ff3f25',
    strokeColor = '#8F8F8F',
}: LikeProps) => {
    const { data } = useGetFavoritesQuery('');
    const [addFavorite] = useAddFavoriteMutation();
    const [deleteFavorite] = useDeleteFavoriteMutation();
    const isAuth = useAppSelector((state) => state.setIsAuth.isAuth);
    const { t } = useTranslation();

    const [isLike, setIsLike] = useState(false);
    const [targetLike, setTargetLike] = useState<{id: number, advertisement: AdvertsTypes}>();

    useEffect(() => {
        const target = data?.find((el) => el.advertisement.slug === slug);
        setTargetLike(target);
        isAuth && setIsLike(!!target);
    }, [data, slug, isAuth]);

    const addToFavorite = () => {
        if (isAuth) {
            setIsLike(!isLike);

            isLike === false
                ? addFavorite({ advertisement: slug })
                : targetLike && deleteFavorite({ id: targetLike.id });
        } else {
            const toastId = 'product add to fav toast';
            toast.error(`${t('main-page.toast-favs')}`, { toastId });
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
