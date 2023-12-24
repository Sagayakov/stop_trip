import { Suspense, lazy } from 'react';
const Controls = lazy(() => import('../../features/controls/Controls'));
import { useParams } from 'react-router-dom';
import { useGetAdvertByIdQuery } from 'app/api/fetchAdverts.ts';
import { LoadingWithBackground } from 'entities/loading/LoadingWithBackground.tsx';
const Advert = lazy(() => import('widgets/advert/Advert'));
import { useMatchMedia } from 'app/hooks/useMatchMedia.ts';

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
