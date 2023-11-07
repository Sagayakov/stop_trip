import { BreadCrumbs } from '../../widgets/breadCrumbs/BreadCrumbs';
import { Controls } from '../../features/controls';
import { useGetAdvertsQuery } from '../../app/api/fetchAdverts';
import { LastAdvertsTypes } from 'app/api/types/lastAdvertsTypes';
import { useParams } from 'react-router-dom';

export const AdvertPage = () => {
    const { id } = useParams();
    const { data = [] } = useGetAdvertsQuery('');
    const advert = data.filter((el: LastAdvertsTypes) => el.id === Number(id));

    return (
        <>
            <Controls />
            <BreadCrumbs title={advert[0].title} />
        </>
    );
};
