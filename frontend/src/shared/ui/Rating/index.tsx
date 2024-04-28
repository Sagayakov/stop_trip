import { useState } from 'react';
import { Star } from '../icons/icons-tools/Star';
import { RatingProps } from './propType';

export const Rating = ({ id, rating, myRating, refetch }: RatingProps) => {
    const [activeStar, setActiveStar] = useState(myRating);
    const [prepareStar, setPrepareStar] = useState(0);
    const [isDisabled, setIsDisabled] = useState(false);

    const starsAmount = 5;
    const starArray = new Array(starsAmount).fill(1).map((el, i) => el + i);

    return (
        <p aria-label={`Rating is ${rating} out of ${starsAmount}`}>
            {starArray.map((item, i) => {
                return (
                    <Star
                        key={item}
                        userId={id}
                        id={i + 1}
                        prepareStar={prepareStar}
                        setPrepareStar={setPrepareStar}
                        activeStar={activeStar}
                        setActiveStar={setActiveStar}
                        refetch={refetch}
                        isDisabled={isDisabled}
                        setIsDisabled={setIsDisabled}
                    />
                );
            })}
        </p>
    );
};
