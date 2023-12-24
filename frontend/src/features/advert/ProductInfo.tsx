import { PhotoSlider } from 'entities/photoSlider/PhotoSlider.tsx';
import { AdvertCharacteristics } from 'entities/advertCharacteristics/AdvertCharacterictics.tsx';
import { AdvertLocation } from 'entities/location/AdvertLocation.tsx';
import styles from 'widgets/advert/libr/advert.module.scss';
import { ProductType } from 'pages/advertPage/libr/types.ts';
import { useTranslation } from 'react-i18next';
import { useMatchMedia } from 'app/hooks/useMatchMedia.ts';

interface Props {
    data: ProductType;
}
export const ProductInfo = ({ data }: Props) => {
    const { t } = useTranslation()
    const { isMobile } = useMatchMedia()
    return (
        <section className={styles.product_info}>
            {!isMobile && <PhotoSlider />}
            <AdvertCharacteristics data={data} />
            {data.description && (
                <div className={styles.description}>
                    <div className={styles.description_header}>
                        {t('advert-page.description')}
                    </div>
                    <p>{data.description}</p>
                </div>
            )}
            {data.coordinates && <AdvertLocation data={data} />}
        </section>
    );
};