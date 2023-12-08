import { Suspense, lazy } from 'react';
const Controls = lazy(() => import('../../features/controls/Controls'));
import { useParams } from 'react-router-dom';
import { useGetAdvertByIdQuery } from '../../app/api/fetchAdverts';
import { LoadingWithBackground } from '../../entities/loading/LoadingWithBackground';
const Advert = lazy(() => import('../../features/advert/Advert'));
import { useMatchMedia } from '../../app/hooks/useMatchMedia';

export const AdvertPage = () => {
    const { id } = useParams();
    const { data } = useGetAdvertByIdQuery(id!);
    const {isMobile} = useMatchMedia();

    return (
        <Suspense fallback={<LoadingWithBackground />}>
            {!isMobile && <Controls />}
            {!data
                ? <LoadingWithBackground />
                : <Advert />}
        </Suspense>
    );
};
