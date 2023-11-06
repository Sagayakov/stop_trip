import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LastAdvertsTypes } from '../../app/api/types/lastAdvertsTypes';
import { Favorite } from '../../shared/ui/icons/icons-tools/Favorite';

export const Cart = (props: LastAdvertsTypes) => {
    const { price, title, id, images } = props;
    const [addToFav, setAddToFav] = useState(false);
    const navigate = useNavigate();

    const style = {
        color: addToFav ? '#FF3F25' : '#f9f9f9',
        strokeColor: addToFav ? '#FF3F25' : '#8F8F8F',
    };

    const handleAddToFavourite = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        event.preventDefault();
        event.stopPropagation();
        setAddToFav(!addToFav); //потом редьюсер
    };

    return (
        <div
            className="adverts-cart"
            onClick={() => navigate(`/api/advertisements/${id}/`)}
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
                    <p>{price ? `$${price}` : 'Договорная'}</p>
                    <span onClick={handleAddToFavourite}>
                        <Favorite
                            color={style.color}
                            strokeColor={style.strokeColor}
                            // color="#FF3F25"
                            // strokeColor="#FF3F25"
                        />
                    </span>
                </div>
                <p>{title}</p>
                <span>пока нет времени публикации</span>
            </div>
        </div>
    );
};
