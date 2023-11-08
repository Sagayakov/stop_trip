import { useState } from 'react';
import { ProductType } from '../../pages/advertPage/libr/types';
import { BreadCrumbs } from '../../widgets/breadCrumbs/BreadCrumbs';
import './libr/advert.scss';

export const Advert = ({ data }: { data: ProductType }) => {
    console.log(data);
    const [activeImage, setActiveImage] = useState(0);

    return (
        <div className="advert-wrapper">
            <BreadCrumbs title={data.title} />
            <h1 className="advert-header">{data.title}</h1>
            <p>
                {data.property_city
                    ? `${data.property_city}, ${data.property_district ?? ''}`
                    : 'Адрес не указан'}
            </p>
            <div className="advert-info">
                <section className="product-info">
                    <div className="image-wrapper">
                        <div className="active-image">
                            <img
                                src={
                                    //data.images[activeImage].image ||
                                    '../../../src/entities/lastAdverts/ui/image-not-found.jpg'
                                }
                            />
                        </div>
                        <div className="image-list">
                            {data.images.map((el, i) => (
                                <img
                                    className={
                                        activeImage !== i ? 'blurred-image' : ''
                                    }
                                    src={
                                        /* el.image || */ '../../../src/entities/lastAdverts/ui/image-not-found.jpg'
                                    }
                                    onClick={() => setActiveImage(i)}
                                    key={el.image}
                                />
                            ))}
                        </div>
                    </div>
                </section>
                <section className="owner-info"></section>
            </div>
        </div>
    );
};
