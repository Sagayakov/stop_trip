import { Like } from '../../shared/ui/Like';
import { Rating } from '../../shared/ui/Rating';
import { useNavigate } from 'react-router-dom';
import { useGetAdvertsQuery } from '../../app/api/fetchAdverts';
import { LastAdvertsTypes } from '../../app/api/types/lastAdvertsTypes';
import { useMatchMedia } from '../../app/hooks/useMatchMedia';

export const AnyCategory = () => {
    const category = location.pathname.slice(1);
    const navigate = useNavigate();
    const { data = [] } = useGetAdvertsQuery('');
    const { isMobile } = useMatchMedia();
    const reverseData = JSON.parse(JSON.stringify(data))
        .reverse()
        .filter((el: LastAdvertsTypes) => el.category === category);

    return (
        <section className="adverts">
            {reverseData.length ? (
                reverseData.map((el: LastAdvertsTypes) => {
                    return (
                        <div
                            className="card"
                            key={el.id}
                            onClick={() => navigate(`/${category}/${el.id}/`)}
                        >
                            <span onClick={(event) => event.stopPropagation()}>
                                <Like />
                            </span>
                            <div className="image">
                                {isMobile ? (
                                    <>
                                        {!el.images[0]
                                            ? <img src='../../../src/entities/lastAdverts/ui/image-not-found.jpg' />
                                            : el.images.map((item) => <img src={item.image} />)
                                        }
                                    </>
                                ) : (
                                    <img
                                        src={
                                            !el.images[0]
                                                ? '../../../src/entities/lastAdverts/ui/image-not-found.jpg'
                                                : el.images[0].image
                                        }
                                    />
                                )}
                            </div>
                            <div className="description">
                                <h2>{el.title}</h2>
                                <p className="description-location">
                                    г. Тбилиси, ул. Зеленая, 10
                                </p>
                                <h3>
                                    {el.price ? `$${el.price}` : 'Договорная'}
                                </h3>
                                <p className="card-description">
                                    {el.description}
                                </p>
                                <span className="author">
                                    Константин
                                    <Rating rating={4.5} />
                                </span>
                                <p className="time">Сегодня, 22:30</p>
                            </div>
                        </div>
                    );
                })
            ) : (
                <p className="adverts-not-found">
                    В этой категории объявлений не найдено
                </p>
            )}
        </section>
    );
};
