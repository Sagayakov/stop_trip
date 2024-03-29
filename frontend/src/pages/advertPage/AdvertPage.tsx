import { Suspense, lazy } from 'react';
const Controls = lazy(() => import('../../features/controls/Controls'));
import { useParams } from 'react-router-dom';
import { LoadingWithBackground } from 'entity/loading/LoadingWithBackground.tsx';
const Advert = lazy(() => import('widgets/advert/Advert'));
import { useMatchMedia } from 'app/hooks/useMatchMedia.ts';
import { useGetAdvertBySlugQuery } from 'app/api/authFetchAdverts.ts';

const AdvertPage = () => {
    const { slug } = useParams();
    const { data } = useGetAdvertBySlugQuery(slug!);
    const { isMobile } = useMatchMedia();

    return (
        <Suspense fallback={<LoadingWithBackground />}>
            {!isMobile && <Controls />}
            {!data ? <LoadingWithBackground /> : <Advert />}
        </Suspense>
    );
};

export default AdvertPage;
