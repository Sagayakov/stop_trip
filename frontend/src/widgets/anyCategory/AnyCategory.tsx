import { useEffect, useState } from 'react';
import data from '../../../db.json';
import { Like } from '../../shared/ui/Like';
import { Rating } from '../../shared/ui/Rating';
// import { NavLink } from 'react-router-dom';
// import { useGetAdvertsQuery } from '../../app/api/fetchAdverts';

export const AnyCategory = () => {
    const [width, setWidth] = useState<number>(window.innerWidth);
    // const { data = [] } = useGetAdvertsQuery('')

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
    }, [window.innerWidth]);

    return (
        <section className="adverts">
            {data.map((el) => {
                return (
                    <div className="card" key={el.id}>
                        <span onClick={(event) => event.preventDefault()}>
                            <Like />
                        </span>
                        <div className="image">
                            {width <= 767 ? (
                                <>
                                    {/* {el.images.map((img) => (
                                    <img src={img.image}/>
                                ))} */}
                                    <img src={el.image} />
                                    <img src={el.image} />
                                    <img src={el.image} />
                                    <img src={el.image} />
                                    <img src={el.image} />
                                    <img src={el.image} />
                                    <img src={el.image} />
                                    <img src={el.image} />
                                </>
                            ) : (
                                <img src={el.image} />
                                // <img src={el.images[0].image} />
                            )}
                        </div>
                        <div className="description">
                            <h2>{el.description}</h2>
                            {/* <h2>{el.title}</h2> */}
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
