import { PhotoSlider } from 'entities/photoSlider/PhotoSlider.tsx';
import styles from 'widgets/advert/libr/advert.module.scss';
import { PriceBlock } from 'entities/advert';
import { AdvertOwner } from 'entities/advert/advertOwner/AdvertOwner.tsx';
import { Link } from 'react-router-dom';
import { ProductInfo } from 'features/advert/ProductInfo.tsx';
import { ProductType } from 'pages/advertPage/libr/types.ts';
import { useTranslation } from 'react-i18next';
import { Date } from 'widgets/advert/libr/types.ts';

interface Props {
    data: ProductType,
    date: Date | null
}
export const MobileAdvert = ({ data, date }: Props) => {
    const { t } = useTranslation()
    return (
        <>
            <PhotoSlider />
            <div className={styles.announcement_info}>
                <section className={styles.owner_info}>
                    <PriceBlock data={data} />
                    <h1 className={styles.full_title}>
                        {data.title}
                    </h1>
                    <AdvertOwner
                        owner={data.owner}
                        className={styles.owner}
                    />
                    <Link
                        className={styles.call_button}
                        to={`tel:${data.owner.phone}`}
                    >
                        {t('advert-page.call')}
                    </Link>
                    <button className={styles.write_button}>
                        {t('advert-page.write')}
                    </button>
                    {date && (
                        <p className={styles.public_date}>
                            {t('advert-page.published')}{' '}
                            <span>{`${date.dayToDisplay}, ${date.hours}:${date.minutes}`}</span>
                        </p>
                    )}
                </section>
                <ProductInfo data={data} />
            </div>
        </>
    );
};