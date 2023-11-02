import { useAppSelector } from '../../app/store/hooks';
import { LoadingWithBackground } from '../../entities/loading/LoadingWithBackground';
import { Controls } from '../../features/controls';
import { LastAdverts } from '../../features/lastAdverts/LastAdverts';
import { PopularCategories } from '../../features/popularCategories';

export const MainPage = () => {
    const load = useAppSelector((state) => state.setLoading.loading);

    return (
        <>
            <Controls />
            <PopularCategories />
            <LastAdverts />
            {load && <LoadingWithBackground />}
        </>
    );
};
