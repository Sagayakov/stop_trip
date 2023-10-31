import { Pagination } from '../pagination';
import { LoadingWithBackground } from '../../entities/loading/LoadingWithBackground';
import { useGetLastAdvertsQuery } from './api/lastAdvertsQuery';
import './libr/lastAdverts.scss';
import { LastAdvertsTypes } from './libr/lastAdvertsTypes';
import { Cart } from '../../entities/lastAdverts';

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
