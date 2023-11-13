import { useState } from 'react';
//import { HalfStar } from '../icons/icons-tools/HalfStar';
import { Star } from '../icons/icons-tools/Star';

type RatingProps = {
    rating: number;
};

export const Rating = ({ rating }: RatingProps) => {
    const [activeStar, setActiveStar] = useState(5);

    const starsAmount = 5;
    const starArray = new Array(starsAmount).fill(1).map((el, i) => el + i);

    return (
        <p aria-label={`Rating is ${rating} out of ${starsAmount}`}>
            {starArray.map((item, i) => {
                /* rating < item ? (
                    <HalfStar 
                        key={item}
                        id={i + 1}
                        activeStar={activeStar}
                        setActiveStar={setActiveStar} //нужно будет при необходимости отрисовки частичной звезды
                    />
                ) : ( */
                return (
                    <Star
                        key={item}
                        id={i + 1}
                        activeStar={activeStar}
                        setActiveStar={setActiveStar}
                    />
                );
            })}
        </p>
    );
};
