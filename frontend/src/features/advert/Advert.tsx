import { BreadCrumbs } from '../../widgets/breadCrumbs/BreadCrumbs';
import './libr/advert.scss';
import { PhotoSlider } from '../../entities/photoSlider/PhotoSlider';
import { useGetAdvertByIdQuery } from '../../app/api/fetchAdverts';
import { useParams } from 'react-router-dom';

export const Advert = () => {
    const { id } = useParams();
    const { data } = useGetAdvertByIdQuery(id!);
    console.log(data);

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
                            <div className="description">
                                <h2 className="characteristics-header">
                                    Характеристики
                                </h2>
                                <div className="characteristics-wrapper">
                                    <span className="characteristics-key">
                                        <p>
                                            Общая площадь
                                            <span className="dashes"></span>
                                        </p>
                                        <p>
                                            Жилая площадь
                                            <span className="dashes"></span>
                                        </p>
                                        <p>
                                            Площадь кухни
                                            <span className="dashes"></span>
                                        </p>
                                        <p>
                                            Количество комнат
                                            <span className="dashes"></span>
                                        </p>
                                        <p>
                                            Санузел
                                            <span className="dashes"></span>
                                        </p>
                                        <p>
                                            Балкон
                                            <span className="dashes"></span>
                                        </p>
                                        <p>
                                            Ремонт
                                            <span className="dashes"></span>
                                        </p>
                                        <p>
                                            Этаж
                                            <span className="dashes"></span>
                                        </p>
                                        <p>
                                            Окна выходят
                                            <span className="dashes"></span>
                                        </p>
                                        <p>
                                            Материал стен
                                            <span className="dashes"></span>
                                        </p>
                                    </span>
                                    <span className="characteristics-value">
                                        <p></p>
                                        <p>46</p>
                                        <p>20</p>
                                        <p>8</p>
                                        <p>2</p>
                                        <p>Раздельный</p>
                                        <p>Лоджия</p>
                                        <p>Косметический</p>
                                        <p>2</p>
                                        <p>Во двор</p>
                                        <p>Кирпич</p>
                                    </span>
                                </div>
                            </div>
                        </section>
                        <section className="owner-info"></section>
                    </div>
                </div>
            )}
        </>
    );
};
