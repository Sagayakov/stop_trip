import styles from 'widgets/advert/libr/advert.module.scss';
import { ProductType } from 'pages/advertPage/libr/types.ts';
import { useTranslation } from 'react-i18next';
import { prettifyPrice } from 'shared/utils/prettifyPrice';

interface Props {
    data: ProductType;
}
export const PriceBlock = ({ data }: Props) => {
    const { t } = useTranslation();
<<<<<<< HEAD
    const { category, proposed_currency, exchange_for, exchange_rate, price, taxi_unit } =
        data;

    const valuesOfTaxiUnit = [
        { label: 'Маршрут', value: 'route' },
        { label: 'Час', value: 'hour' },
        { label: 'Км', value: 'km' },
    ];
    const viewPrice = () => {
        const currencyPrice = price
            ? prettifyPrice(price)
            : `${t('advert-page.price-negotiated')}`

        if(category === 'exchange_rate' && exchange_rate){
            return exchange_rate
        }
        if(category === 'taxi' && taxi_unit){
            const value = valuesOfTaxiUnit.find((elem) => elem.value === taxi_unit);
            switch (value?.value) {
                case "route":
                    return `${currencyPrice}/${t('advert-page.taxi-route')}`
                case "hour":
                    return `${currencyPrice}/${t('advert-page.taxi-hour')}`
                case "km":
                    return `${currencyPrice}/${t('advert-page.taxi-km')}`
            }
        }
        return currencyPrice
    }


=======
    const { category, proposed_currency, exchange_for, exchange_rate, price } =
        data;

>>>>>>> f31783f (feat: add test environment & 1st test)
    return (
        <>
            <div className={styles.price_block}>
                {category === 'exchange_rate' && (
                    <span>{`${proposed_currency}/${exchange_for}`}</span>
                )}
                <span className={styles.price}>
<<<<<<< HEAD
                    {/*{category === 'exchange_rate' && exchange_rate*/}
                    {/*    ? exchange_rate*/}
                    {/*    : price*/}
                    {/*      ? prettifyPrice(price)*/}
                    {/*      : `${t('advert-page.price-negotiated')}`}*/}
                    {viewPrice()}
=======
                    {category === 'exchange_rate' && exchange_rate
                        ? exchange_rate
                        : price
                          ? prettifyPrice(price)
                          : `${t('advert-page.price-negotiated')}`}
>>>>>>> f31783f (feat: add test environment & 1st test)
                </span>
            </div>
        </>
    );
};
