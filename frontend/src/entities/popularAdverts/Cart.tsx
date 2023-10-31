import { LastAdvertsTypes } from 'features/popularAdverts/libr/lastAdvertsTypes'
import { Favorite } from '../../shared/ui/icons/icons-tools/Favorite'

export const Cart = (props: LastAdvertsTypes) => {
    const { images, price, title} = props
    return (
        <div className="adverts-cart">
            <img src={images[0].image} alt="img" />
            <div className="description">
                <div className="price">
                    {price}$
                    <Favorite color="#FF3F25" strokeColor="#FF3F25" />
                </div>
                <p>{title}</p>
                <span>пока нет времени публикации</span>
            </div>
        </div>
    )
}
