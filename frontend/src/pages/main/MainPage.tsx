import { Suspense, lazy } from 'react';
import { useAppSelector } from '../../app/store/hooks';
import { LoadingWithBackground } from '../../entities/loading/LoadingWithBackground';
const Controls = lazy(() => import('../../features/controls/Controls'));
const LastAdverts = lazy(() => import('../../features/lastAdverts/LastAdverts'));
const PopularCategories = lazy(() => import('../../features/popularCategories/PopularCategories'));

export const MainPage = () => {
    const load = useAppSelector((state) => state.setLoading.loading);

    return (
        <>
            <Suspense fallback={<LoadingWithBackground />}>
                <Controls />
                <PopularCategories />
                <LastAdverts />
            </Suspense>
            {load && <LoadingWithBackground />}
        </>
    );
};
