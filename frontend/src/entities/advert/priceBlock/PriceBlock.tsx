import styles from 'widgets/advert/libr/advert.module.scss';
import { ProductType } from 'pages/advertPage/libr/types.ts';
import { useTranslation } from 'react-i18next';
import { useMatchMedia } from 'app/hooks/useMatchMedia.ts';
import { prettifyPrice } from 'shared/utils/prettifyPrice';

interface Props {
    data: ProductType;
}
export const PriceBlock = ({ data }: Props) => {
    const { t } = useTranslation();
    const { isMobile } = useMatchMedia();

    return (
        <>
            <div className={styles.price_block}>
                {t('advert-page.day')}
                <span className={styles.price}>
                    {data.price
                        ? prettifyPrice(data.price)
                        : `${t(
                              `advert-page.${
                                  !isMobile ? 'negotiated' : 'price-negotiated'
                              }`
                          )}`}
                </span>
            </div>
        </>
    );
};
