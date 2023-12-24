import { BreadCrumbs } from 'widgets/breadCrumbs/BreadCrumbs.tsx';
import styles from './libr/advert.module.scss';
import { PhotoSlider } from 'entities/photoSlider/PhotoSlider.tsx';
import { useGetAdvertByIdQuery } from 'app/api/fetchAdverts.ts';
import { Link, useParams } from 'react-router-dom';
import { getDate } from 'shared/utils/getDate.ts';
import { useEffect, useState } from 'react';
import { Date } from './libr/types.ts';
import { AdvertOwner } from 'entities/advertOwner/AdvertOwner.tsx';
import { useMatchMedia } from 'app/hooks/useMatchMedia.ts';
import { toast } from 'react-toastify';
import { Tooltip } from 'react-tooltip';
import { useTranslation } from 'react-i18next';
import { ProductInfo } from 'features/advert/ProductInfo.tsx';

const Advert = () => {
    const { id } = useParams();
    const { data } = useGetAdvertByIdQuery(id!);
    const [date, setDate] = useState<Date | null>(null);

    const { isMobile, isTablet, isDesktop } = useMatchMedia();
    const { t } = useTranslation();

    useEffect(() => {
        if (data) {
            const dateCreate = getDate(data.date_create);
            setDate(dateCreate);
        }
    }, [data]);

    const handleClickShowNumber = () => {
        if (data) {
            toast.success(`${data.owner.phone}`);
        }
    };

    return (
        <>
            {data && (
                <div className={styles.announcement_wrapper}>
                    <BreadCrumbs data={data} />
                    {!isMobile ? (
                        <>
                            <h1 className={styles.announcement_header}>
                                {data.title}
                            </h1>
                            <p>
                                {data.property_city
                                    ? `${data.property_city.name}, ${
                                          data.property_district ??
                                          `${t('advert-page.no-district')}`
                                      }`
                                    : `${t('advert-page.no-address')}`}
                            </p>
                            <div className={styles.announcement_info}>
                                <ProductInfo data={data} />
                                <section className={styles.owner_info}>
                                    <div className={styles.price_block}>
                                        {t('advert-page.day')}{' '}
                                        <span className={styles.price}>
                                            {data.price
                                                ? `₹${data.price}`
                                                : `${t(
                                                      'advert-page.negotiated'
                                                  )}`}
                                        </span>
                                    </div>
                                    <AdvertOwner
                                        owner={data.owner}
                                        className={styles.owner}
                                    />
                                    {isTablet ? (
                                        <Link
                                            className={styles.call_button}
                                            to={`tel:${data.owner.phone}`}
                                        >
                                            {t('advert-page.call')}
                                        </Link>
                                    ) : (
                                        <button
                                            className={styles.call_button}
                                            onClick={handleClickShowNumber}
                                            data-tooltip-id="my-tooltip"
                                            data-tooltip-content={`${data.owner.phone}`}
                                        >
                                            {t('advert-page.show-number')}
                                        </button>
                                    )}
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
                            </div>
                            {isDesktop && (
                                <Tooltip
                                    id="my-tooltip"
                                    variant="success"
                                    place="top"
                                />
                            )}
                        </>
                    ) : (
                        <>
                            <PhotoSlider />
                            <div className={styles.announcement_info}>
                                <section className={styles.owner_info}>
                                    <div className={styles.price_block}>
                                        {data.price
                                            ? `${t('advert-page.day')}`
                                            : ''}
                                        <span className={styles.price}>
                                            {data.price
                                                ? `₹${data.price}`
                                                : `${t(
                                                      'advert-page.price-negotiated'
                                                  )}`}
                                        </span>
                                    </div>
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
                    )}
                </div>
            )}
        </>
    );
};

export default Advert;
