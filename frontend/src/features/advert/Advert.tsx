import { BreadCrumbs } from '../../widgets/breadCrumbs/BreadCrumbs';
import './libr/advert.scss';
import { PhotoSlider } from '../../entities/photoSlider/PhotoSlider';
import { useGetAdvertByIdQuery } from '../../app/api/fetchAdverts';
import { useParams } from 'react-router-dom';
import { AdvertCharacteristics } from '../../entities/advertCharacteristics/AdvertCharacterictics';

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
                            <AdvertCharacteristics />
                        </section>
                        <section className="owner-info"></section>
                    </div>
                </div>
            )}
        </>
    );
};
