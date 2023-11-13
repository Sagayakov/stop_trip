import { Rating } from '../../shared/ui/Rating';
import './advertOwner.scss';

export const AdvertOwner = () => {
    return (
        <div className="owner">
            <img src="../../../src/shared/ui/images/owner.png" />
            <div className="owner-characteristics">
                <p>Константин</p>
                <div className="rating-block">
                    <div className="rating-number">4.5</div>
                    <Rating rating={5} />
                </div>
                <p>Дата регистрации: 10.02.2023</p>
            </div>
        </div>
    );
};
