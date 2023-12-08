import { NumberFour } from './NumberFour';
import { NumberZero } from './NumberZero';
import './notFoundNumbers.scss';

const NotFoundNumbers = () => {
    return (
        <div className="numbers">
            <NumberFour />
            <NumberZero />
            <NumberFour />
        </div>
    );
};

export default NotFoundNumbers;