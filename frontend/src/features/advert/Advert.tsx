import { BreadCrumbs } from '../../widgets/breadCrumbs/BreadCrumbs';
import './libr/advert.scss';
import { PhotoSlider } from '../../entities/photoSlider/PhotoSlider';
import { useGetAdvertByIdQuery } from '../../app/api/fetchAdverts';
import { useParams } from 'react-router-dom';
import { AdvertCharacteristics } from '../../entities/advertCharacteristics/AdvertCharacterictics';
import { AdvertLocation } from '../../entities/location/AdvertLocation';
import { getDate } from '../../shared/utils/getDate';
import { useEffect, useState } from 'react';
import { Date } from './libr/types';
import { AdvertOwner } from '../../entities/advertOwner/AdvertOwner';
import { useMatchMedia } from '../../app/hooks/useMatchMedia';

export const Advert = () => {
    const { id } = useParams();
    const { data } = useGetAdvertByIdQuery(id!);
    const [date, setDate] = useState<Date | null>(null);
    console.log(data);
    const { isMobile } = useMatchMedia()

    useEffect(() => {
        if (data) {
            const dateCreate = getDate(data.date_create);
            setDate(dateCreate);
        }
    }, [data]);

    return (
        <>
            {data && !isMobile && (
                <div className="announcement-wrapper">
                    <BreadCrumbs data={data} />
                    <h1 className="announcement-header">{data.title}</h1>
                    <p>
                        {data.property_city
                            ? `${data.property_city}, ${
                                  data.property_district ?? ''
                              }`
                            : 'Адрес не указан'}
                    </p>
                    <div className="announcement-info">
                        <section className="product-info">
                            <PhotoSlider />
                            <AdvertCharacteristics data={data} />
                            <div className="description">
                                <div className="description-header">
                                    Описание
                                </div>
                                <p>{data.description}</p>
                            </div>
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
                            <AdvertOwner />
                            <button className="call-button">Позвонить</button>
                            <button className="write-button">Написать</button>
                            {date && (
                                <p className="public-date">
                                    Опубликовано:{' '}
                                    <span>{`${date.dayToDisplay}, ${date.hours}:${date.minutes}`}</span>
                                </p>
                            )}
                        </section>
                    </div>
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
                            <h1 className='full-title'>{data.title}</h1>
                            <AdvertOwner />
                            <button className="call-button">Позвонить</button>
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
                            <div className="description">
                                <div className="description-header">
                                    Описание
                                </div>
                                <p>{data.description}</p>
                            </div>
                            {data.coordinates && <AdvertLocation data={data} />}
                        </section>
                    </div>
                </div>
            )}
        </>
    );
};

