import { useState } from 'react';
import { Star } from '../icons/icons-tools/Star';

type RatingProps = {
    id: number;
    rating: number;
    grades: number;
    myRating: number;
    setGrades?: React.Dispatch<React.SetStateAction<number>>;
};

export const Rating = ({
    id,
    rating,
    grades,
    setGrades,
    myRating,
}: RatingProps) => {
    const [activeStar, setActiveStar] = useState(myRating);
    const [prepareStar, setPrepareStar] = useState(0);

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
                        grades={grades}
                        setGrades={setGrades}
                    />
                );
            })}
        </p>
    );
};
