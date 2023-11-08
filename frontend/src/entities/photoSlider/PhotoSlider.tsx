import { useState } from 'react';
import { ArrowLeft10x24 } from '../../shared/ui/icons/icons-tools/ArrowLeft10x24';
import { ArrowRight } from '../../shared/ui/icons/icons-tools/ArrowRight';
import './photoSlider.scss';
import { useParams } from 'react-router-dom';
import { useGetAdvertByIdQuery } from '../../app/api/fetchAdverts';
import { Like } from '../../shared/ui/Like';
import { ShareIcon } from '../../shared/ui/shareIcon';

export const PhotoSlider = () => {
    const { id } = useParams();
    const { data } = useGetAdvertByIdQuery(id!);
    const [activeImage, setActiveImage] = useState(0);

    const handleClickPrev = () => {
        activeImage > 0 && setActiveImage(activeImage - 1);
    };

    const handleClickNext = () => {
        data &&
            activeImage < data.images.length - 1 &&
            setActiveImage(activeImage + 1);
    };

    return (
        <div className="image-wrapper">
            <div className="active-image">
                <ArrowLeft10x24 handleClickPrev={handleClickPrev} />
                <img
                    src={
                        //data.images[activeImage].image ||
                        '../../../src/entities/lastAdverts/ui/image-not-found.jpg'
                    }
                    alt="Main image"
                />
                <ArrowRight color="black" handleClickNext={handleClickNext} />
                <ShareIcon />
                <Like color="#ff3f25" strokeColor="#1C1C1E" />
            </div>
            <div className="image-list">
                {data &&
                    data.images.map((el, i) => (
                        <img
                            className={activeImage !== i ? 'blurred-image' : ''}
                            src={
                                /* el.image || */ '../../../src/entities/lastAdverts/ui/image-not-found.jpg'
                            }
                            onClick={() => setActiveImage(i)}
                            key={el.image}
                            alt={`image #${i + 1}`}
                        />
                    ))}
            </div>
        </div>
    );
};
