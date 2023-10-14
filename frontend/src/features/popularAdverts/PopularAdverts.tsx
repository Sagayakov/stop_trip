import { Pagination } from '../../features/pagination';
import data from '../../../db.json';
import { Cart } from '../../entities/popularAdverts';
import './popularAdverts.scss';

export const PopularAdverts = () => {
    return (
        <div className="popular-adverts">
            <div className="popular-adverts-wrapper">
                <h3>Последние объявления</h3>
                <div className="adverts-list">
                    {data.map((elem) => (
                        <Cart
                            description={elem.description}
                            id={elem.id}
                            image={elem.image}
                            price={elem.price}
                            time={elem.time}
                            key={elem.id}
                        />
                    ))}
                </div>
                <Pagination />
            </div>
        </div>
    );
};
