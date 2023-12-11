import { useGetAdvertsQuery } from '../../app/api/fetchAdverts';
import { LastAdvertsTypes } from '../../app/api/types/lastAdvertsTypes';
import { Cart } from '../../entities/lastAdverts';
import { LoadingWithBackground } from '../../entities/loading/LoadingWithBackground';
import { Pagination } from '../pagination';
import './libr/LastAdverts.scss';

const LastAdverts = () => {
    const { data = [], isLoading } = useGetAdvertsQuery('');
    console.log(data)

    return (
        <div className="last-announcement">
            <div className="last-announcement-wrapper">
                <h3>Последние объявления</h3>
                <div className="announcement-list">
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