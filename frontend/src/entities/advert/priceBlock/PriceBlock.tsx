import styles from 'widgets/advert/libr/advert.module.scss';
import { ProductType } from 'pages/advertPage/libr/types.ts';
import { useTranslation } from 'react-i18next';
import { prettifyPrice } from 'shared/utils/prettifyPrice';

interface Props {
    data: ProductType;
}
export const PriceBlock = ({ data }: Props) => {
    const { t } = useTranslation();
    const { category, proposed_currency, exchange_for, exchange_rate, price } =
        data;

    return (
        <>
            <div className={styles.price_block}>
                {category === 'exchange_rate' && (
                    <span>{`${proposed_currency}/${exchange_for}`}</span>
                )}
                <span className={styles.price}>
                    {category === 'exchange_rate' && exchange_rate
                        ? exchange_rate
                        : price
                          ? prettifyPrice(price)
                          : `${t('advert-page.price-negotiated')}`}
                </span>
            </div>
        </>
    );
};
