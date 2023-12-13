import { useGetAdvertsQuery } from '../../app/api/fetchAdverts';
import { LastAdvertsTypes } from '../../app/api/types/lastAdvertsTypes';
import { Cart } from '../../entities/lastAdverts';
import { LoadingWithBackground } from '../../entities/loading/LoadingWithBackground';
import { Pagination } from '../pagination';
import './libr/LastAdverts.scss';
import { useTranslation } from 'react-i18next';

const LastAdverts = () => {
    const { data = [], isLoading } = useGetAdvertsQuery('');
    const { t } = useTranslation();

    return (
        <div className="last-announcement">
            <div className="last-announcement-wrapper">
                <h3>{t('main-page.last-adverts')}</h3>
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
