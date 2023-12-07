import { Like } from '../../shared/ui/Like';
import { Rating } from '../../shared/ui/Rating';
import { useNavigate } from 'react-router-dom';
import { useGetAdvertsQuery } from '../../app/api/fetchAdverts';
import { LastAdvertsTypes } from '../../app/api/types/lastAdvertsTypes';
import { useMatchMedia } from '../../app/hooks/useMatchMedia';
import { getDate } from '../../shared/utils/getDate';

const AnyCategory = () => {
    const category = location.pathname.split('/')[1];
    const filterQuery = location.search;
    const navigate = useNavigate();
    const { data = [] } = useGetAdvertsQuery(filterQuery);
    const { isMobile } = useMatchMedia();
    const filteredData = JSON.parse(JSON.stringify(data))
        .filter((el: LastAdvertsTypes) => el.category === category);

    return (
        <section className="adverts">
            {filteredData.length ? (
                filteredData.map((el: LastAdvertsTypes) => {
                    return (
                        <div
                            className="card"
                            key={el.id}
                            onClick={() => navigate(`/${category}/${el.id}/`)}
                        >
                            <span onClick={(event) => event.stopPropagation()}>
                                <Like id={el.id}/>
                            </span>
                            <div className="image">
                                {isMobile ? (
                                    <>
                                        {!el.images[0]
                                            ? <img src='../../../src/entities/lastAdverts/ui/image-not-found.jpg' />
                                            : el.images.map((item) => <img src={item.image} key={item.image} />)
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
                                    {el.price ? `₹${el.price}` : 'Договорная'}
                                </h3>
                                <p className="card-description">
                                    {el.description}
                                </p>
                                <div className="author">
                                    Константин
                                    <span className="rating-number">4.5</span>
                                    <Rating rating={4.5} />
                                </div>
                                <p
                                    className="time">
                                    {`
                                        ${getDate(el.date_create).dayToDisplay},
                                        ${getDate(el.date_create).hours}:${getDate(el.date_create).minutes}
                                    `}
                                </p>
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

export default AnyCategory;