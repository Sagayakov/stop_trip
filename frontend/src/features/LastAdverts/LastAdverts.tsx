import { Pagination } from '../pagination';
// import data from '../../../db.json';
import { LoadingWithBackground } from '../../entities/loading/LoadingWithBackground';
import { Cart } from '../../entities/LastAdverts';
import { useGetLastAdvertsQuery } from './api/lastAdvertsQuery';
import { LastAdvertsTypes } from './libr/lastAdvertsTypes';
import './libr/lastAdverts.scss';

export const LastAdverts = () => {
    const { data = [], isLoading } = useGetLastAdvertsQuery('');

    return (
        <div className="last-adverts">
            <div className="last-adverts-wrapper">
                <h3>Последние объявления</h3>
                <div className="adverts-list">
                    {isLoading && <LoadingWithBackground />}
                    {data.map((elem: LastAdvertsTypes) => (
                        <Cart
                            title={elem.title}
                            id={elem.id}
                            images={elem.images}
                            price={elem.price}
                            // time={elem.time}
                            key={elem.id}
                        />
                    ))}
                </div>
                <Pagination />
            </div>
        </div>
    );
};
