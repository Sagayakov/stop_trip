import { useState } from 'react';
import { Rating } from 'shared/ui/Rating';
import styles from './libr/advertOwner.module.scss';
import { useGradeSpelling } from './libr/utils/getGradeSpelling.ts';
import { getDate } from 'shared/utils/getDate.ts';
import { getUserIcon } from 'shared/utils/userIcon/getUserIcon.ts';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'app/store/hooks.ts';
import { Owner } from 'pages/advertPage/libr/types.ts';

interface Props {
    owner: Owner;
    className: string;
}

export const AdvertOwner = ({ owner, className }: Props) => {
    const [grades, setGrades] = useState(owner.rating_num);
    const { t } = useTranslation();
    const lang = useAppSelector((state) => state.setLang.lang);

    const { firstLetters } = getUserIcon(owner.full_name);

    const spelling = useGradeSpelling(grades);

    const date = getDate(owner.date_joined);
    const { dayToDisplay } = date;
    let day = dayToDisplay;

    if (dayToDisplay === 'Сегодня') {
        day = lang === 'ru' ? 'Сегодня' : 'Today';
    }
    if (dayToDisplay === 'Вчера') {
        day = lang === 'ru' ? 'Вчера' : 'Yesterday';
    }

    return (
        <div className={`${styles.owner} ${className}`}>
            <span className={styles.user_icon}>{firstLetters}</span>
            <div className={styles.owner_characteristics}>
                <div>
                    <p>{`${owner.full_name[0].toUpperCase()}${owner.full_name.slice(
                        1
                    )}`}</p>
                    <span className={styles.rating_number}>
                        {owner.avg_rating}
                    </span>
                </div>
                <div className={styles.rating_block}>
                    <Rating
                        id={owner.id}
                        rating={owner.avg_rating}
                        grades={grades}
                        setGrades={setGrades}
                        myRating={owner.my_rating}
                    />
                    <span>{`${grades} ${spelling}`}</span>
                </div>
                <p>{`${t('advert-page.registration-date')} ${day}`}</p>
            </div>
        </div>
    );
};
