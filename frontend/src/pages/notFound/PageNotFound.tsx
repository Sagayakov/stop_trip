import { Suspense, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import './pageNotFound.scss';
import { LoadingWithBackground } from '../../entities/loading/LoadingWithBackground';
const NotFoundNumbers = lazy(() => import('../../entities/notFoundNumbers/NotFoundNumbers'));
const NotFoundCategories = lazy(() => import('../../features/notFoundCategories/NotFoundCategories'));

export const PageNotFound = () => {
    const navigate = useNavigate();

    return (
        <div className='not-found-wrapper'>
            <Suspense fallback={<LoadingWithBackground />}>
                <NotFoundNumbers />
                <div className='text-info'>
                    <h1 className='info-header'>{`Такой страницы нет :(`}</h1>
                    <p>Возможно, она была перенесена, или вы просто неверно указали адрес страницы</p>
                </div>
                <button className='button-to-main' onClick={() => navigate('/')}>На главную</button>
                <NotFoundCategories />
            </Suspense>
        </div>
    );
};
