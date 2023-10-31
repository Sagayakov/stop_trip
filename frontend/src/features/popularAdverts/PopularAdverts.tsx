import { Pagination } from '../../features/pagination';
// import data from '../../../db.json';
import { Cart } from '../../entities/popularAdverts';
import './libr/popularAdverts.scss';
import { useGetLastAdvertsQuery } from './api/lastAdvertsQuery';
import { LastAdvertsTypes } from './libr/lastAdvertsTypes'
import { LoadingWithBackground } from '../../entities/loading/LoadingWithBackground';
import { NavLink } from 'react-router-dom';

export const PopularAdverts = () => {
    const { data = [], isLoading } = useGetLastAdvertsQuery('')
    console.log(data)
    return (
        <div className="popular-adverts">
            <div className="popular-adverts-wrapper">
                <h3>Последние объявления</h3>
                <div className="adverts-list">
                    {isLoading && <LoadingWithBackground />}
                    {data.map((elem: LastAdvertsTypes) => (
                        <NavLink to={`/api/advertisements/${elem.id}/`} key={elem.id}>
                            <Cart
                                title={elem.title}
                                id={elem.id}
                                images={elem.images}
                                price={elem.price}
                                // time={elem.time}
                                // key={elem.id}
                            />
                        </NavLink>
                    ))}
                </div>
                <Pagination />
            </div>
        </div>
    );
};
