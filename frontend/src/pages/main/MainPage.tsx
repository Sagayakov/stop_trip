import { Controls } from '../../features/controls';
import { PopularAdverts } from '../../features/popularAdverts/PopularAdverts';
import { PopularCategories } from '../../features/popularCategories';

export const MainPage = () => {
    return (
        <>
            <Controls />
            <PopularCategories />
            <PopularAdverts />
        </>
    );
};
