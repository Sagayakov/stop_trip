import { useGetAdvertsQuery } from '../../app/api/fetchAdverts';
import { LastAdvertsTypes } from '../../app/api/types/lastAdvertsTypes';
import { Cart } from '../../entities/lastAdverts';
import { LoadingWithBackground } from '../../entities/loading/LoadingWithBackground';
import { Pagination } from '../pagination';
import './libr/LastAdverts.scss';

const LastAdverts = () => {
    const { data = [], isLoading } = useGetAdvertsQuery('');

    return (
        <div className="last-adverts">
            <div className="last-adverts-wrapper">
                <h3>Последние объявления</h3>
                <div className="adverts-list">
                    {isLoading && <LoadingWithBackground />}
                    {data.map((elem: LastAdvertsTypes) => (
                        <Cart cart={elem} key={elem.id} />
                    ))}
                </div>
                <Pagination />
            </div>
        </div>
    );
};

export default LastAdverts;