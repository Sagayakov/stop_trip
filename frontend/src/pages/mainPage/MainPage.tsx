import { Suspense, lazy } from 'react';
import { useAppSelector } from 'app/store/hooks.ts';
import { LoadingWithBackground } from 'entity/loading/LoadingWithBackground.tsx';
import { LoaidngWithoutBackground } from 'entity/loading/LoaidngWithoutBackground.tsx';
const Controls = lazy(() => import('../../features/controls/Controls'));
const LastAdverts = lazy(() => import('widgets/lastAdverts/LastAdverts'));
const PopularCategories = lazy(
    () => import('../../features/popularCategories/PopularCategories')
);

const MainPage = () => {
    const load = useAppSelector((state) => state.setLoading.loading);

    return (
        <>
            <Controls />
            <PopularCategories />
            <Suspense fallback={<LoaidngWithoutBackground />}>
                <LastAdverts />
            </Suspense>
            {load && <LoadingWithBackground />}
        </>
    );
};

export default MainPage;
