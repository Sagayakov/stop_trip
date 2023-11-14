import { useState } from 'react';
import { Star } from '../icons/icons-tools/Star';
import { toast } from 'react-toastify';

type RatingProps = {
    rating: number;
    grades: number;
    setGrades: React.Dispatch<React.SetStateAction<number>>;
};

export const Rating = ({ rating, grades, setGrades }: RatingProps) => {
    const [activeStar, setActiveStar] = useState(0);
    const [prepareStar, setPrepareStar] = useState(0);

    const starsAmount = 5;
    const starArray = new Array(starsAmount).fill(1).map((el, i) => el + i);

    const handleClick = () => {
        setGrades(grades + 1);
        toast.success('Спасибо! Ваша оценка добавлена!');
    };

    return (
        <p
            aria-label={`Rating is ${rating} out of ${starsAmount}`}
            onClick={handleClick}
        >
            {starArray.map((item, i) => {
                return (
                    <Star
                        key={item}
                        id={i + 1}
                        prepareStar={prepareStar}
                        setPrepareStar={setPrepareStar}
                        activeStar={activeStar}
                        setActiveStar={setActiveStar}
                    />
                );
            })}
        </p>
    );
};
