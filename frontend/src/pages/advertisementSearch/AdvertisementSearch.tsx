import Controls from 'features/controls/Controls.tsx';
import { LoaidngWithoutBackground } from 'entity/loading/LoaidngWithoutBackground.tsx';
import { Suspense } from 'react';
import { SearchAdBlock } from 'widgets/advertisementSearch/SearchAdBlock.tsx';

const AdvertisementSearch = () => {
    return (
        <Suspense fallback={<LoaidngWithoutBackground />}>
            <Controls />
            <SearchAdBlock />
        </Suspense>
    );
};

export default AdvertisementSearch;