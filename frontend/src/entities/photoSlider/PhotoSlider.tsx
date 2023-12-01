import { useRef, useState } from 'react';
import { ArrowLeft10x24 } from '../../shared/ui/icons/icons-tools/ArrowLeft10x24';
import { ArrowRight } from '../../shared/ui/icons/icons-tools/ArrowRight';
import './libr/photoSlider.scss';
import { useParams } from 'react-router-dom';
import { useGetAdvertByIdQuery } from '../../app/api/fetchAdverts';
import { Like } from '../../shared/ui/Like';
import { ShareIcon } from '../../shared/ui/shareIcon';
import { useMatchMedia } from '../../app/hooks/useMatchMedia';
import { createPortal } from 'react-dom';
import { Portal } from '../../entities/portal/Portal';
import { Shadow } from '../../entities/portal/Shadow';

export const PhotoSlider = () => {
    const { id } = useParams();
    const { data } = useGetAdvertByIdQuery(id!);
    const [activeImage, setActiveImage] = useState(0);
    const [imageWidth, setImageWidth] = useState<number>(0);
    const [imageHeight, setImageHeight] = useState<number>(0);
    const imageRef = useRef<null | HTMLImageElement>(null);
    const { isMobile } = useMatchMedia();
    const [isPortalOpen, setIsPortalOpen] = useState(false);
    const [activePortalImage, setActivePortalImage] = useState(activeImage + 1);
    const [touchStart, setTouchStart] = useState<{identifier: number, screenX: number} | null>(null);

    const handleClickPrev = () => {
        if (data) {
            activeImage > 0
                ? setActiveImage(activeImage - 1)
                : setActiveImage(data.images.length - 1);
        }
    };

    const handleClickNext = () => {
        if (data) {
            activeImage < data.images.length - 1
                ? setActiveImage(activeImage + 1)
                : setActiveImage(0);
        }
    };

    const image =
        !data || !data.images[activeImage]
            ? '../../../src/entities/lastAdverts/ui/image-not-found.jpg'
            : data.images[activeImage].image;

    const handleOnLoad = () => {
        setImageWidth(imageRef.current!.naturalWidth);
        setImageHeight(imageRef.current!.naturalHeight);
    };

    const openPhoto = () => setIsPortalOpen(true);

    const handleClickPortalPrev = () => {
        if (data) {
            activePortalImage > 1
                ? setActivePortalImage(activePortalImage - 1)
                : setActivePortalImage(data.images.length);
        }
    };

    const handleClickPortalNext = () => {
        if (data) {
            activePortalImage < data.images.length
                ? setActivePortalImage(activePortalImage + 1)
                : setActivePortalImage(1);
        }
        
    };

    const handleTouchStart = (event: React.TouchEvent<HTMLImageElement>) => {
        if (isMobile) {
            setTouchStart({
                identifier: event.changedTouches[0].identifier,
                screenX: event.changedTouches[0].screenX,
            });
        }
        return;
    };

    const handleTouchEnd = (event: React.TouchEvent<HTMLImageElement>) => {
        if (isMobile) {
            if ( data && touchStart?.identifier === event.changedTouches[0].identifier) {
                if (event.changedTouches[0].screenX < touchStart.screenX) {
                    handleClickNext();
                }
                if (event.changedTouches[0].screenX > touchStart.screenX) {
                    handleClickPrev();
                }
            }
        }
        return;
    }

    return (
        <>
            <div className="image-wrapper">
                <div
                    className="active-image"
                    onClick={openPhoto}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                >
                    <div className='arrow-container'>
                        <ArrowLeft10x24
                            color="white"
                            handleClickPrev={handleClickPrev}
                        />
                    </div>
                    <img
                        src={image}
                        alt="Main image"
                        ref={imageRef}
                        onLoad={handleOnLoad}
                        className={imageWidth > imageHeight ? 'horizontal' : 'vertical'}
                    />
                    <div className='arrow-container'>
                        <ArrowRight color="white" handleClickNext={handleClickNext} />
                    </div>
                    <ShareIcon />
                    <Like color="#ff3f25" strokeColor="#1C1C1E" />
                    {imageHeight > imageWidth && (
                        <>
                            <img
                                className="blur-left"
                                src={image}
                                alt="Main image"
                            />
                            <img
                                className="blur-right"
                                src={image}
                                alt="Main image"
                            />
                        </>
                    )}
                </div>
                <div className="image-list">
                    {data &&
                        data.images.map((el, i) => (
                            <img
                                className={activeImage !== i ? 'blurred-image' : ''}
                                src={
                                    el.image ??
                                    '../../../src/entities/lastAdverts/ui/image-not-found.jpg'
                                }
                                onClick={() => setActiveImage(i)}
                                key={el.image}
                                alt={`image #${i + 1}`}
                            />
                        ))}
                </div>
            </div>
            {isPortalOpen && data && data.images &&
                createPortal(
                    <>
                        <Portal
                            image={data.images[activePortalImage - 1].image}
                            setIsPortalOpen={setIsPortalOpen}
                            images={data.images}
                            active={activePortalImage}
                            handleClickPortalPrev={handleClickPortalPrev}
                            handleClickPortalNext={handleClickPortalNext}
                        />
                        <Shadow setIsPortalOpen={setIsPortalOpen} />
                    </>,
                    document.body
                )
            }
        </>
    );
};
