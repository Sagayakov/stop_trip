import { NumberFour } from './NumberFour';
import { NumberZero } from './NumberZero';
import styles from './notFoundNumbers.module.scss';

const NotFoundNumbers = () => {
    return (
        <div className={styles.numbers}>
            <NumberFour />
            <NumberZero />
            <NumberFour />
        </div>
    );
};

export default NotFoundNumbers;