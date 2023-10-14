import { useState } from 'react';
import { Favorite } from '../icons/icons-tools/Favorite';

export const Like = () => {
    const [isLike, setIsLike] = useState(false);

    const addToFavorite = () => {
        setIsLike(!isLike);
    };

    return (
        <div className="add-to-favorite" onClick={addToFavorite}>
            <Favorite
                color={isLike ? '#ff3f25' : 'transparent'}
                strokeColor={isLike ? 'transparent' : '#8F8F8F'}
            />
        </div>
    );
};
