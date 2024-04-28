import { Rating } from "shared/ui/Rating";
import styles from './libr/userInfo.module.scss';
import { useGradeSpelling } from "entity/advert/advertOwner/libr/utils/getGradeSpelling";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "app/store/hooks";
import { getUserIcon } from "shared/utils/userIcon/getUserIcon";
import { getDate } from "shared/utils/getDate";
import { UserInfoProps } from "./libr/proprType";

export const UserInfo = ({ user, className, refetch, handleNavigate }: UserInfoProps) => {
    const { t } = useTranslation();
    const lang = useAppSelector((state) => state.setLang.lang);

    const { firstLetters } = getUserIcon(user.full_name);
    
    const spelling = `${t('advert-page.grade')}${useGradeSpelling(
        user.rating_num,
        lang
    )}`;

    const date = getDate(user.date_joined);
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
            <span
                className={styles.user_icon}
                onClick={handleNavigate}
                style={!className ? { cursor: 'default' } : {}}
            >{firstLetters}</span>
            <div className={styles.owner_characteristics}>
                <div className={styles.name_rating}>
                    <p onClick={handleNavigate}  style={!className ? { cursor: 'default' } : {}}>
                        {`${user.full_name[0].toUpperCase()}${user.full_name.slice(1)}`}
                    </p>
                    <span className={styles.rating_number}>
                        {user.avg_rating.toFixed(2)}
                    </span>
                </div>
                <div className={styles.rating_block}>
                    <Rating
                        id={user.id}
                        rating={user.avg_rating}
                        myRating={user.my_rating}
                        refetch={refetch}
                    />
                    <span>{`${user.rating_num} ${spelling}`}</span>
                </div>
                <p>{`${t('advert-page.registration-date')} ${day}`}</p>
            </div>
       </div> 
    )
};
