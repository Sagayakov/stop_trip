import { Controls } from '../../features/controls';
import { useParams } from 'react-router-dom';
import { useGetAdvertByIdQuery } from '../../app/api/fetchAdverts';
import { LoadingWithBackground } from '../../entities/loading/LoadingWithBackground';
import { Advert } from '../../features/advert/Advert';
import { ToastContainer } from 'react-toastify';

export const AdvertPage = () => {
    const { id } = useParams();
    const { data } = useGetAdvertByIdQuery(id!);

    return (
        <>
            <Controls />
            {!data ? <LoadingWithBackground /> : <Advert />}
            <ToastContainer />
        </>
    );
};
