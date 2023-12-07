import { NumberFour } from './NumberFour';
import { NumberZero } from './NumberZero';
import './notFoundNumbers.scss';

export const NotFoundNumbers = () => {
    return (
        <div className="numbers">
            <NumberFour />
            <NumberZero />
            <NumberFour />
        </div>
    );
}