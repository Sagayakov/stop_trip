import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LastAdvertsTypes } from '../../features/LastAdverts/libr/lastAdvertsTypes';
import { Favorite } from '../../shared/ui/icons/icons-tools/Favorite';

export const Cart = (props: LastAdvertsTypes) => {
    const { images, price, title, id } = props;
    const [addToFav, setAddToFav] = useState(false);

    const style = {
        color: addToFav ? '#FF3F25' : '#f9f9f9',
        strokeColor: addToFav ? '#FF3F25' : '#8F8F8F',
    };

    const handleAddToFavourite = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        event.preventDefault();
        setAddToFav(!addToFav); //потом редьюсер
    };

    return (
        <div
            className="adverts-cart"
            onClick={(event) => event.stopPropagation}
        >
            <NavLink to={`/api/advertisements/${id}/`}>
                <img src={images[0].image} alt="img" />
                <div className="description">
                    <div className="price">
                        {price}$
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
            </NavLink>
        </div>
    );
};
