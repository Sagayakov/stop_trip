import { Rating } from 'shared/ui/Rating';
import styles from './libr/advertOwner.module.scss';
import { useGradeSpelling } from './libr/utils/getGradeSpelling.ts';
import { getDate } from 'shared/utils/getDate.ts';
import { getUserIcon } from 'shared/utils/userIcon/getUserIcon.ts';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'app/store/hooks.ts';
import { useParams } from 'react-router-dom';
import { useGetAdvertBySlugQuery } from 'app/api/fetchAdverts.ts';

interface Props {
    className: string;
}

export const AdvertOwner = ({ className }: Props) => {
    const { t } = useTranslation();
    const lang = useAppSelector((state) => state.setLang.lang);
    const isAuth = useAppSelector((state) => state.setIsAuth.isAuth);
    const { slug } = useParams();
    const { data, refetch } = useGetAdvertBySlugQuery({ slug: slug!, isAuth });

    const { firstLetters } = getUserIcon(data?.owner.full_name);

    const spelling = `${t('advert-page.grade')}${useGradeSpelling(
        data?.owner.rating_num,
        lang
    )}`;

    const date = getDate(data?.owner.date_joined);
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
            {data && (
                <>
                    <span className={styles.user_icon}>{firstLetters}</span>
                    <div className={styles.owner_characteristics}>
                        <div>
                            <p>{`${data.owner.full_name[0].toUpperCase()}${data.owner.full_name.slice(
                                1
                            )}`}</p>
                            <span className={styles.rating_number}>
                                {data.owner.avg_rating.toFixed(2)}
                            </span>
                        </div>
                        <div className={styles.rating_block}>
                            <Rating
                                id={data.owner.id}
                                rating={data.owner.avg_rating}
                                myRating={data.owner.my_rating}
                                refetch={refetch}
                            />
                            <span>{`${data.owner.rating_num} ${spelling}`}</span>
                        </div>
                        <p>{`${t('advert-page.registration-date')} ${day}`}</p>
                    </div>
                </>
            )}
        </div>
    );
};
