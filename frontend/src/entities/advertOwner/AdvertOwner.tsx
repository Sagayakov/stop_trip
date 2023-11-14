import { useState } from 'react';
import { Rating } from '../../shared/ui/Rating';
import './libr/advertOwner.scss';
import { getGradeSpelling } from './libr/utils/getGradeSpelling';

export const AdvertOwner = () => {
    const [grades, setGrades] = useState(0); //изменить 0 на значение, которое будет отдавать бэк по юзеру

    return (
        <div className="owner">
            <img src="../../../src/shared/ui/images/owner.png" />
            <div className="owner-characteristics">
                <div>
                    <p>Константин</p>
                    <div className="rating-number">4.5</div>
                </div>
                <div className="rating-block">
                    <Rating rating={5} grades={grades} setGrades={setGrades} />
                    <span>{`${grades} ${getGradeSpelling(grades)}`}</span>
                </div>
                <p>Дата регистрации: 10.02.2023</p>
            </div>
        </div>
    );
};
