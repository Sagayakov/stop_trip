import styles from 'widgets/advert/libr/advert.module.scss';
import { ProductType } from 'pages/advertPage/libr/types.ts';
import { useTranslation } from 'react-i18next';
import { prettifyPrice } from 'shared/utils/prettifyPrice';

interface Props {
    data: ProductType;
}
export const PriceBlock = ({ data }: Props) => {
    const { t } = useTranslation();

    return (
        <>
            <div className={styles.price_block}>
                <span className={styles.price}>
                    {data.price
                        ? prettifyPrice(data.price)
                        : `${t('advert-page.price-negotiated')}`}
                </span>
            </div>
        </>
    );
};
