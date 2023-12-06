import { useNavigate } from 'react-router-dom';
import './pageNotFound.scss';
import { categories } from '../../shared/const/categories';

export const PageNotFound = () => {
    const navigate = useNavigate();

    return (
        <div className='not-found-wrapper'>
            <div className="numbers">404</div>
            <div className='text-info'>
                <h1 className='info-header'>{`Такой страницы нет :(`}</h1>
                <p>Возможно, она была перенесена, или вы просто неверно указали адрес страницы</p>
            </div>
            <button className='button-to-main' onClick={() => navigate('/')}>На главную</button>
            <section className='categories_not-found'>
                {Object.entries(categories)
                    .slice(0, 5)
                    .map((el) => {
                        const { icon: Icon } = el[1];
                        return (
                            <div
                                key={el[0]}
                                className={`category ${el[0]}`}
                                onClick={() => navigate(`/${el[0]}/`)}
                            >
                                <Icon />
                                <span>{el[1].description}</span>
                            </div>
                        );
                    })}
            </section>
        </div>
    ) 
}