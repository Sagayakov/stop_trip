import { BreadCrumbs } from '../../widgets/breadCrumbs/BreadCrumbs';
import './libr/advert.scss';
import { PhotoSlider } from '../../entities/photoSlider/PhotoSlider';
import { useGetAdvertByIdQuery } from '../../app/api/fetchAdverts';
import { Link, useParams } from 'react-router-dom';
import { AdvertCharacteristics } from '../../entities/advertCharacteristics/AdvertCharacterictics';
import { AdvertLocation } from '../../entities/location/AdvertLocation';
import { getDate } from '../../shared/utils/getDate';
import { useEffect, useState } from 'react';
import { Date } from './libr/types';
import { AdvertOwner } from '../../entities/advertOwner/AdvertOwner';
import { useMatchMedia } from '../../app/hooks/useMatchMedia';
import { toast } from 'react-toastify';
import { Tooltip } from 'react-tooltip';

const Advert = () => {
    const { id } = useParams();
    const { data } = useGetAdvertByIdQuery(id!);
    const [date, setDate] = useState<Date | null>(null);
    console.log(data);
    const { isMobile, isTablet, isDesktop } = useMatchMedia();

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
                                  data.property_district ?? 'район не указан'
                              }`
                            : 'Адрес не указан'}
                    </p>
                    <div className="announcement-info">
                        <section className="product-info">
                            <PhotoSlider />
                            <AdvertCharacteristics data={data} />
                            {data.description && (
                                <div className="description">
                                    <div className="description-header">
                                        Описание
                                    </div>
                                    <p>{data.description}</p>
                                </div>
                            )}
                            {data.coordinates && <AdvertLocation data={data} />}
                        </section>
                        <section className="owner-info">
                            <div className="price-block">
                                Сутки{' '}
                                <span className="price">
                                    {data.price
                                        ? `₹${data.price}`
                                        : 'Договорная'}
                                </span>
                            </div>
                            <AdvertOwner owner={data.owner} />
                            {isTablet ? (
                                <Link
                                    className="call-button"
                                    to={`tel:${data.owner.phone}`}
                                >
                                    Позвонить
                                </Link>
                            ) : (
                                <button
                                    className="call-button"
                                    onClick={handleClickShowNumber}
                                    data-tooltip-id="my-tooltip"
                                    data-tooltip-content={`${data.owner.phone}`}
                                >
                                    Показать телефон
                                </button>
                            )}
                            <button className="write-button">Написать</button>
                            {date && (
                                <p className="public-date">
                                    Опубликовано:{' '}
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
                                {data.price ? 'Сутки' : ''}
                                <span className="price">
                                    {data.price
                                        ? `₹${data.price}`
                                        : 'Цена договорная'}
                                </span>
                            </div>
                            <h1 className="full-title">{data.title}</h1>
                            <AdvertOwner owner={data.owner} />
                            <Link
                                className="call-button"
                                to={`tel:${data.owner.phone}`}
                            >
                                Позвонить
                            </Link>
                            <button className="write-button">Написать</button>
                            {date && (
                                <p className="public-date">
                                    Опубликовано:{' '}
                                    <span>{`${date.dayToDisplay}, ${date.hours}:${date.minutes}`}</span>
                                </p>
                            )}
                        </section>
                        <section className="product-info">
                            <AdvertCharacteristics data={data} />
                            {data.description && (
                                <div className="description">
                                    <div className="description-header">
                                        Описание
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
