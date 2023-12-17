import styles from 'pages/myAnnouncements/libr/myAnnouncements.module.scss';
import { GetDateOfCreating } from 'entities/lastAdverts/libr/getDateOfCreating.ts';
import { Eye } from 'shared/ui/icons/icons-tools/Eye.tsx';
import { Favorite } from 'shared/ui/icons/icons-tools/Favorite.tsx';
import { useTranslation } from 'react-i18next';

interface Props{
    title: string;
    price: number;
    date_create?: string;
}
export const MyAnnouncementDescription = ({ title, price, date_create }: Props) => {
    const { t } = useTranslation()

    return (
        <div className={styles.description}>
            <div className={styles.price}>
                <p>
                    {price
                        ? `₹${price}`
                        : `${t('advert-page.negotiated')}`}
                </p>
            </div>
            <p>{title}</p>
            <span>{GetDateOfCreating(date_create!)}</span>
            <div className={styles.views_and_likes}>
                <div className={styles.views}>
                    <Eye />
                    1000
                </div>
                <div className={styles.likes}>
                    <Favorite color="white" strokeColor="#1C1C1E" />
                    1000
                </div>
            </div>
        </div>
    )

}