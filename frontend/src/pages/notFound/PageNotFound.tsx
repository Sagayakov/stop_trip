import { useNavigate } from 'react-router-dom';
import './pageNotFound.scss';
import { NotFoundNumbers } from '../../entities/notFoundNumbers/NotFoundNumbers';
import { NotFoundCategories } from '../../features/notFoundCategories/NotFoundCategories';

export const PageNotFound = () => {
    const navigate = useNavigate();

    return (
        <div className='not-found-wrapper'>
            <NotFoundNumbers />
            <div className='text-info'>
                <h1 className='info-header'>{`Такой страницы нет :(`}</h1>
                <p>Возможно, она была перенесена, или вы просто неверно указали адрес страницы</p>
            </div>
            <button className='button-to-main' onClick={() => navigate('/')}>На главную</button>
            <NotFoundCategories />
        </div>
    );
};