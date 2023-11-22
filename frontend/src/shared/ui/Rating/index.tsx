import { useState } from 'react';
import { Star } from '../icons/icons-tools/Star';

type RatingProps = {
    rating: number;
    grades?: number;
    setGrades?: React.Dispatch<React.SetStateAction<number>>;
};

export const Rating = ({ rating, grades, setGrades }: RatingProps) => {
    const [activeStar, setActiveStar] = useState(0);
    const [prepareStar, setPrepareStar] = useState(0);

    const starsAmount = 5;
    const starArray = new Array(starsAmount).fill(1).map((el, i) => el + i);

    return (
        <p aria-label={`Rating is ${rating} out of ${starsAmount}`}>
            {starArray.map((item, i) => {
                return (
                    <Star
                        key={item}
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
