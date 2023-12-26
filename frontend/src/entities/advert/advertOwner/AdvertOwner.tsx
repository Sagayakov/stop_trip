import { useState } from 'react';
import { Rating } from 'shared/ui/Rating';
import styles from './libr/advertOwner.module.scss';
import { useGradeSpelling } from './libr/utils/getGradeSpelling.ts';
import { Owner } from 'app/api/types/lastAdvertsTypes.ts';
import { getDate } from 'shared/utils/getDate.ts';
import { getUserIcon } from 'shared/utils/userIcon/getUserIcon.ts';
import { useTranslation } from 'react-i18next';

interface Props {
    owner: Owner;
    className: string;
}

export const AdvertOwner = ({ owner, className }: Props) => {
    const [grades, setGrades] = useState(0); //изменить 0 на значение, которое будет отдавать бэк по юзеру
    const { t } = useTranslation();

    const { firstLetters, lettersColor, bgColor } = getUserIcon(
        owner.full_name
    );

    const spelling = useGradeSpelling(grades);

    return (
        <div className={`${styles.owner} ${className}`}>
            <span
                className={styles.user_icon}
                style={{ color: lettersColor, backgroundColor: bgColor }}
            >
                {firstLetters}
            </span>
            <div className={styles.owner_characteristics}>
                <div>
                    <p>{`${owner.full_name[0].toUpperCase()}${owner.full_name.slice(
                        1
                    )}`}</p>
                    <div className={styles.rating_number}>4.5</div>
                </div>
                <div className={styles.rating_block}>
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
