import { Favorite } from '../../shared/ui/icons/icons-tools/Favorite'

interface Props {
    image: string
    price: string
    description: string
    time: string
    id?: number
}

export const Cart = ({ description, image, price, time }: Props) => {
    return (
        <div className="adverts-cart">
            <img src={image} alt="img" />
            <div className="description">
                <div className="price">
                    {price}
                    <Favorite color="#FF3F25" strokeColor="#FF3F25" />
                </div>
                <p>{description}</p>
                <span>{time}</span>
            </div>
        </div>
    )
}
