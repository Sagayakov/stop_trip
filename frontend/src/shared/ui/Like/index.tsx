import { useState } from 'react';
import { Favorite } from '../icons/icons-tools/Favorite';

type LikeProps = {
    color?: string;
    strokeColor?: string;
};

export const Like = ({
    color = '#ff3f25',
    strokeColor = '#8F8F8F',
}: LikeProps) => {
    const [isLike, setIsLike] = useState(false);

    const addToFavorite = () => {
        setIsLike(!isLike);
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
