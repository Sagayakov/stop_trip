import { useRef, useState } from 'react';
import { ArrowLeft10x24 } from 'shared/ui/icons/icons-tools/ArrowLeft10x24.tsx';
import { ArrowRight } from 'shared/ui/icons/icons-tools/ArrowRight.tsx';
import styles from './libr/photoSlider.module.scss';
import { useParams } from 'react-router-dom';
import { useGetAdvertBySlugQuery } from 'app/api/fetchAdverts.ts';
import { Like } from 'shared/ui/Like';
import { ShareIcon } from 'shared/ui/shareIcon';
import { useMatchMedia } from 'app/hooks/useMatchMedia.ts';
import { createPortal } from 'react-dom';
import { Portal } from 'entity/portal/Portal.tsx';
import { Shadow } from 'entity/portal/Shadow.tsx';

export const PhotoSlider = () => {
    const { slug } = useParams();
    const { data } = useGetAdvertBySlugQuery(slug!);
    const [activeImage, setActiveImage] = useState(0);
    const [imageWidth, setImageWidth] = useState<number>(0);
    const [imageHeight, setImageHeight] = useState<number>(0);
    const imageRef = useRef<null | HTMLImageElement>(null);
    const { isMobile } = useMatchMedia();
    const [isPortalOpen, setIsPortalOpen] = useState(false);
    const [activePortalImage, setActivePortalImage] = useState(activeImage + 1);
    const [touchStart, setTouchStart] = useState<{
        identifier: number;
        screenX: number;
    } | null>(null);

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
            ? '../../../src/entity/lastAdverts/ui/image-not-found.jpg'
            : data?.images[activeImage].image;

    const handleOnLoad = () => {
        setImageWidth(imageRef.current!.naturalWidth);
        setImageHeight(imageRef.current!.naturalHeight);
    };

    const openPhoto = () => {
        if (data && data.images.length) {
            setIsPortalOpen(true);
        }
    };

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
            if (
                data &&
                touchStart?.identifier === event.changedTouches[0].identifier
            ) {
                if (event.changedTouches[0].screenX < touchStart.screenX) {
                    handleClickNext();
                }
                if (event.changedTouches[0].screenX > touchStart.screenX) {
                    handleClickPrev();
                }
            }
        }
        return;
    };

    return (
        <>
            {data && (
                <div className={styles.image_wrapper}>
                    <div
                        className={
                            !data.images.length
                                ? styles.active_no_image
                                : styles.active_image
                        }
                        onClick={openPhoto}
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
                    >
                        {!!data.images.length && (
                            <div className={styles.arrow_container}>
                                <ArrowLeft10x24
                                    color="white"
                                    handleClickPrev={handleClickPrev}
                                />
                            </div>
                        )}
                        <img
                            src={image}
                            alt="Main image"
                            ref={imageRef}
                            onLoad={handleOnLoad}
                            className={
                                !data.images.length
                                    ? styles.no_image
                                    : imageWidth > imageHeight
                                      ? `${styles.horizontal}`
                                      : `${styles.vertical}`
                            }
                        />
                        {!!data.images.length && (
                            <div className={styles.arrow_container}>
                                <ArrowRight
                                    color="white"
                                    handleClickNext={handleClickNext}
                                />
                            </div>
                        )}
                        <ShareIcon />
                        <Like
                            id={Number(data.id)}
                            color="#ff3f25"
                            strokeColor="#1C1C1E"
                        />
                        {!!data.images.length && imageHeight > imageWidth && (
                            <>
                                <img
                                    className={styles.blur_left}
                                    src={data.images[activeImage].image}
                                    alt="Main image"
                                />
                                <img
                                    className={styles.blur_right}
                                    src={data.images[activeImage].image}
                                    alt="Main image"
                                />
                            </>
                        )}
                    </div>
                    <div className={styles.image_list}>
                        {data &&
                            data.images.map((el, i) => (
                                <img
                                    className={
                                        activeImage !== i
                                            ? `${styles.blurred_image}`
                                            : ''
                                    }
                                    src={el.image}
                                    onClick={() => setActiveImage(i)}
                                    key={el.image}
                                    alt={`image #${i + 1}`}
                                />
                            ))}
                    </div>
                </div>
            )}
            {isPortalOpen &&
                data &&
                data.images &&
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
                )}
        </>
    );
};
