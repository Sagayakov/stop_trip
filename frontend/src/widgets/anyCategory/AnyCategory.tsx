import data from '../../../db.json';
import { Like } from '../../shared/ui/Like';
import { Rating } from '../../shared/ui/Rating';

export const AnyCategory = () => {
    return (
        <section className="adverts">
            {data.map((el) => {
                return (
                    <div className="card" key={el.id}>
                        <Like />
                        <div className="image">
                            <img src={el.image} />
                        </div>
                        <div className="description">
                            <h2>{el.description}</h2>
                            <p className="description-location">
                                {el.location}
                            </p>
                            <h3>{el.price}</h3>
                            <p className="card-description">{el.text}</p>
                            <span className="author">
                                {el.author}
                                <Rating rating={el.rating} />
                            </span>
                            <p className="time">{el.time}</p>
                        </div>
                    </div>
                );
            })}
        </section>
    );
};
