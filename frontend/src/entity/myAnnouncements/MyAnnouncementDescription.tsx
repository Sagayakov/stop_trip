import styles from 'pages/myAnnouncements/libr/myAnnouncements.module.scss';
import { GetDateOfCreating } from 'entity/lastAdverts/libr/getDateOfCreating.ts';
import { useTranslation } from 'react-i18next';
import { prettifyPrice } from 'shared/utils/prettifyPrice';

interface Props {
    title: string;
    price: number;
    date_create?: string;
}
export const MyAnnouncementDescription = ({
    title,
    price,
    date_create,
}: Props) => {
    const { t } = useTranslation();

    return (
        <div className={styles.description}>
            <div className={styles.price}>
                <p>
                    {price
                        ? prettifyPrice(price)
                        : `${t('advert-page.negotiated')}`}
                </p>
            </div>
            <p>{title}</p>
            <div className={styles.date_and_likes}>
                {/*<div className={styles.likes}>*/}
                {/*    <Favorite color="white" strokeColor="#1C1C1E" />*/}
                {/*    1000*/}
                {/*</div>*/}
                <span>{GetDateOfCreating(date_create!)}</span>
            </div>
        </div>
    );
};
