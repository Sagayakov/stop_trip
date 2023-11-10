import { Rating } from '../../shared/ui/Rating';
import './advertOwner.scss';

export const AdvertOwner = () => {
    return (
        <div className="owner">
            <img src="../../../src/shared/ui/images/owner.png" />
            <div>
                <p>Вадим</p>
                <Rating rating={5} />
                <p>
                    Дата регистрации
                    <br />
                    10.02.2023
                </p>
            </div>
        </div>
    );
};
