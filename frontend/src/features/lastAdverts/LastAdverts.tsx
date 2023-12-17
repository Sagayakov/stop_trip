import { useGetAdvertsQuery } from 'app/api/fetchAdverts.ts';
import { AdvertsTypes } from 'app/api/types/lastAdvertsTypes.ts';
import { Cart } from 'entities/lastAdverts';
import { LoadingWithBackground } from 'entities/loading/LoadingWithBackground.tsx';
import { Pagination } from '../pagination';
import './libr/LastAdverts.scss';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'app/store/hooks';

const LastAdverts = () => {
    const pageMain = useAppSelector((state) => state.setPageMain.pageMain);
    const { data, isLoading } = useGetAdvertsQuery(`?page=${pageMain}`);
    const { t } = useTranslation();

    return (
        <div className="last-announcement">
            <div className="last-announcement-wrapper">
                <h3>{t('main-page.last-adverts')}</h3>
                <div className="announcement-list">
                    {isLoading && <LoadingWithBackground />}
                    {data &&
                        data.results.map((elem: AdvertsTypes) => (
                            <Cart cart={elem} key={elem.id} />
                        ))}
                </div>
                <Pagination data={data} />
            </div>
        </div>
    );
};

export default LastAdverts;
