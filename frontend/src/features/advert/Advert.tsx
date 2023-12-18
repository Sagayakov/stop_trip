import { BreadCrumbs } from 'widgets/breadCrumbs/BreadCrumbs.tsx';
import './libr/advert.scss';
import { PhotoSlider } from 'entities/photoSlider/PhotoSlider.tsx';
import { useGetAdvertByIdQuery } from 'app/api/fetchAdverts.ts';
import { Link, useParams } from 'react-router-dom';
import { AdvertCharacteristics } from 'entities/advertCharacteristics/AdvertCharacterictics.tsx';
import { AdvertLocation } from 'entities/location/AdvertLocation.tsx';
import { getDate } from 'shared/utils/getDate.ts';
import { useEffect, useState } from 'react';
import { Date } from './libr/types';
import { AdvertOwner } from 'entities/advertOwner/AdvertOwner.tsx';
import { useMatchMedia } from 'app/hooks/useMatchMedia.ts';
import { toast } from 'react-toastify';
import { Tooltip } from 'react-tooltip';
import { useTranslation } from 'react-i18next';

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
            {data && !isMobile && (
                <div className="announcement-wrapper">
                    <BreadCrumbs data={data} />
                    <h1 className="announcement-header">{data.title}</h1>
                    <p>
                        {data.property_city
                            ? `${data.property_city.name}, ${
                                  data.property_district ??
                                  `${t('advert-page.no-district')}`
                              }`
                            : `${t('advert-page.no-address')}`}
                    </p>
                    <div className="announcement-info">
                        <section className="product-info">
                            <PhotoSlider />
                            <AdvertCharacteristics data={data} />
                            {data.description && (
                                <div className="description">
                                    <div className="description-header">
                                        {t('advert-page.description')}
                                    </div>
                                    <p>{data.description}</p>
                                </div>
                            )}
                            {data.coordinates && <AdvertLocation data={data} />}
                        </section>
                        <section className="owner-info">
                            <div className="price-block">
                                {t('advert-page.day')}{' '}
                                <span className="price">
                                    {data.price
                                        ? `₹${data.price}`
                                        : `${t('advert-page.negotiated')}`}
                                </span>
                            </div>
                            <AdvertOwner owner={data.owner} />
                            {isTablet ? (
                                <Link
                                    className="call-button"
                                    to={`tel:${data.owner.phone}`}
                                >
                                    {t('advert-page.call')}
                                </Link>
                            ) : (
                                <button
                                    className="call-button"
                                    onClick={handleClickShowNumber}
                                    data-tooltip-id="my-tooltip"
                                    data-tooltip-content={`${data.owner.phone}`}
                                >
                                    {t('advert-page.show-number')}
                                </button>
                            )}
                            <button className="write-button">
                                {t('advert-page.write')}
                            </button>
                            {date && (
                                <p className="public-date">
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
                </div>
            )}
            {data && isMobile && (
                <div className="announcement-wrapper">
                    <BreadCrumbs data={data} />
                    {/* <h1 className="announcement-header">{data.title}</h1> */}
                    <PhotoSlider />
                    {/* <p>
                        {data.property_city
                            ? `${data.property_city}, ${
                                  data.property_district ?? ''
                              }`
                            : 'Адрес не указан'}
                    </p> */}
                    <div className="announcement-info">
                        <section className="owner-info">
                            <div className="price-block">
                                {data.price ? `${t('advert-page.day')}` : ''}
                                <span className="price">
                                    {data.price
                                        ? `₹${data.price}`
                                        : `${t(
                                              'advert-page.price-negotiated'
                                          )}`}
                                </span>
                            </div>
                            <h1 className="full-title">{data.title}</h1>
                            <AdvertOwner owner={data.owner} />
                            <Link
                                className="call-button"
                                to={`tel:${data.owner.phone}`}
                            >
                                {t('advert-page.call')}
                            </Link>
                            <button className="write-button">
                                {t('advert-page.write')}
                            </button>
                            {date && (
                                <p className="public-date">
                                    {t('advert-page.published')}{' '}
                                    <span>{`${date.dayToDisplay}, ${date.hours}:${date.minutes}`}</span>
                                </p>
                            )}
                        </section>
                        <section className="product-info">
                            <AdvertCharacteristics data={data} />
                            {data.description && (
                                <div className="description">
                                    <div className="description-header">
                                        {t('advert-page.description')}
                                    </div>
                                    <p>{data.description}</p>
                                </div>
                            )}
                            {data.coordinates && <AdvertLocation data={data} />}
                        </section>
                    </div>
                </div>
            )}
        </>
    );
};

export default Advert;
