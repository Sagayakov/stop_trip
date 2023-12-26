import styles from 'widgets/advert/libr/advert.module.scss';
import { ProductType } from 'pages/advertPage/libr/types.ts';
import { useTranslation } from 'react-i18next';
import { useMatchMedia } from 'app/hooks/useMatchMedia.ts';

interface Props {
    data: ProductType;
}
export const PriceBlock = ({ data }: Props) => {
    const { t } = useTranslation();
    const { isMobile } = useMatchMedia();

    return (
        <>
            {!isMobile ? (
                <div className={styles.price_block}>
                    {t('advert-page.day')}
                    <span className={styles.price}>
                        {data.price
                            ? `₹${data.price}`
                            : `${t('advert-page.negotiated')}`}
                    </span>
                </div>
            ) : (
                <div className={styles.price_block}>
                    {data.price ? `${t('advert-page.day')}` : ''}
                    <span className={styles.price}>
                        {data.price
                            ? `₹${data.price}`
                            : `${t('advert-page.price-negotiated')}`}
                    </span>
                </div>
            )}
        </>
    );
};
