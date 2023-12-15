import { useState } from 'react';
import { Rating } from '../../shared/ui/Rating';
import './libr/advertOwner.scss';
import { useGradeSpelling } from './libr/utils/getGradeSpelling';
import { Owner } from '../../app/api/types/lastAdvertsTypes';
import { getDate } from '../../shared/utils/getDate';
import { getUserIcon } from '../../shared/utils/userIcon/getUserIcon';
import { useTranslation } from 'react-i18next';

export const AdvertOwner = ({ owner }: { owner: Owner }) => {
    const [grades, setGrades] = useState(0); //изменить 0 на значение, которое будет отдавать бэк по юзеру
    const { t } = useTranslation();

    const { firstLetters, lettersColor, bgColor } = getUserIcon(
        owner.full_name
    );

    const spelling = useGradeSpelling(grades);

    return (
        <div className="owner">
            {/* <img src="../../../src/shared/ui/images/owner.png" /> */}
            <span
                className="user-icon"
                style={{ color: lettersColor, backgroundColor: bgColor }}
            >
                {firstLetters}
            </span>
            <div className="owner-characteristics">
                <div>
                    <p>{`${owner.full_name[0].toUpperCase()}${owner.full_name.slice(
                        1
                    )}`}</p>
                    <div className="rating-number">4.5</div>
                </div>
                <div className="rating-block">
                    <Rating rating={5} grades={grades} setGrades={setGrades} />
                    <span>{`${grades} ${spelling}`}</span>
                </div>
                <p>{`${t('advert-page.registration-date')} ${
                    getDate(owner.date_joined).dayToDisplay
                }`}</p>
            </div>
        </div>
    );
};
