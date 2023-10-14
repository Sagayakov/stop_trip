import { HalfStar } from '../icons/icons-tools/HalfStar';
import { Star } from '../icons/icons-tools/Star';

type RatingProps = {
    rating: number;
};

export const Rating = ({ rating }: RatingProps) => {
    const starsAmount = 5;
    const starArray = new Array(starsAmount).fill(1).map((el, i) => el + i);

    return (
        <p aria-label={`Rating is ${rating} out of ${starsAmount}`}>
            {starArray.map((item) => {
                return rating <= item ? (
                    <HalfStar key={item} />
                ) : (
                    <Star key={item} />
                );
            })}
        </p>
    );
};
