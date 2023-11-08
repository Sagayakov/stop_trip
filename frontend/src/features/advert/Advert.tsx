import { useState } from 'react';
import { ProductType } from '../../pages/advertPage/libr/types';
import { BreadCrumbs } from '../../widgets/breadCrumbs/BreadCrumbs';
import './libr/advert.scss';
import { ArrowRight } from '../../shared/ui/icons/icons-tools/ArrowRight';
import { ArrowLeft10x24 } from '../../shared/ui/icons/icons-tools/ArrowLeft10x24';

export const Advert = ({ data }: { data: ProductType }) => {
    console.log(data);
    const [activeImage, setActiveImage] = useState(0);

    const handleClickPrev = () => {
        activeImage > 0 && setActiveImage(activeImage - 1);
    };

    const handleClickNext = () => {
        activeImage < data.images.length - 1 && setActiveImage(activeImage + 1);
    };

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
                            <ArrowLeft10x24 handleClickPrev={handleClickPrev} />
                            <img
                                src={
                                    //data.images[activeImage].image ||
                                    '../../../src/entities/lastAdverts/ui/image-not-found.jpg'
                                }
                            />
                            <ArrowRight
                                color="black"
                                handleClickNext={handleClickNext}
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
