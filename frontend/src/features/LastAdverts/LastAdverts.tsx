import { useGetAdvertsQuery } from '../../app/api/fetchAdverts';
import { LastAdvertsTypes } from '../../app/api/types/lastAdvertsTypes';
import { Cart } from '../../entities/lastAdverts';
import { LoadingWithBackground } from '../../entities/loading/LoadingWithBackground';
import { Pagination } from '../pagination';
import './libr/lastAdverts.scss';

export const LastAdverts = () => {
    const { data = [], isLoading } = useGetAdvertsQuery('');
    const reverseData = JSON.parse(JSON.stringify(data));//наверное стоит делать reverse массива на бэке и сразу получать в обратном порядке

    return (
        <div className="last-adverts">
            <div className="last-adverts-wrapper">
                <h3>Последние объявления</h3>
                <div className="adverts-list">
                    {isLoading && <LoadingWithBackground />}
                    {reverseData.reverse().map((elem: LastAdvertsTypes) => (
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
