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
import { Rating } from '../../shared/ui/Rating';

export const Advert = () => {
    const { id } = useParams();
    const { data } = useGetAdvertByIdQuery(id!);
    const [date, setDate] = useState<Date | null>(null);

    useEffect(() => {
        if (data) {
            const date = getDate(data.date_create);
            setDate(date);
        }
    }, [data]);

    return (
        <>
            {data && (
                <div className="advert-wrapper">
                    <BreadCrumbs title={data.title} />
                    <h1 className="advert-header">{data.title}</h1>
                    <p>
                        {data.property_city
                            ? `${data.property_city}, ${
                                  data.property_district ?? ''
                              }`
                            : 'Адрес не указан'}
                    </p>
                    <div className="advert-info">
                        <section className="product-info">
                            <PhotoSlider />
                            <AdvertCharacteristics />
                            <div className="description">
                                <div className="description-header">
                                    Описание
                                </div>
                                <p>{data.description}</p>
                            </div>
                            <AdvertLocation data={data} />
                        </section>
                        <section className="owner-info">
                            <div className="price-block">
                                Сутки{' '}
                                <span className="price">
                                    {data.price
                                        ? `$${data.price}`
                                        : 'Договорная'}
                                </span>
                            </div>
                            {date && (
                                <p className="public-date">
                                    Опубликовано:{' '}
                                    <span>{`${date.dayToDisplay}, ${date.hours}:${date.minutes}`}</span>
                                </p>
                            )}
                            <div className="owner">
                                <img src="../../../src/shared/ui/images/owner.png" />
                                <div>
                                    <p>Вадим</p>
                                    <Rating rating={5} />
                                    <p>
                                        Дата регистрации
                                        <br />
                                        10.02.2023
                                    </p>
                                </div>
                            </div>
                            <button className="call-button">Позвонить</button>
                            <button className="write-button">Написать</button>
                        </section>
                    </div>
                </div>
            )}
        </>
    );
};
