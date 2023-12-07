import { useNavigate } from 'react-router-dom';
import { categories } from '../../shared/const/categories';
import './notFoundCategories.scss';

const NotFoundCategories = () => {
    const navigate = useNavigate();
    
    return (
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
    );
};

export default NotFoundCategories;