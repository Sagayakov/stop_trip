import styles from 'pages/myAnnouncements/libr/myAnnouncements.module.scss';
import { GetDateOfCreating } from 'entity/lastAdverts/libr/getDateOfCreating.ts';
import { useTranslation } from 'react-i18next';
import { prettifyPrice } from 'shared/utils/prettifyPrice';
import { prettifyRate } from 'shared/utils/prettifyRate';

interface Props {
    category: string | undefined;
    title: string;
    price: number;
    exchange_rate: number;
    date_create?: string;
    proposed_currency?: string;
    exchange_for?: string;
}

export const MyAnnouncementDescription = ({
    category,
    exchange_rate,
    title,
    price,
    date_create,
    proposed_currency,
    exchange_for,
}: Props) => {
    const { t } = useTranslation();

    return (
        <div className={styles.description}>
            <div className={styles.price}>
                <p>
                    {category === 'exchange_rate' &&
                        proposed_currency &&
                        exchange_for &&
                        exchange_rate && (
                            <span
                                className={styles.currency_rate}
                            >{`${proposed_currency}/${exchange_for}: `}</span>
                        )}
                    {category === 'exchange_rate' && exchange_rate
                        ? prettifyRate(exchange_rate)
                        : price
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
