import { useMatchMedia } from 'app/hooks/useMatchMedia.ts';
import styles from './portal.module.scss';
import { LastAdvertsImages } from 'app/api/types/lastAdvertsTypes.ts';
import { Close } from 'shared/ui/icons/icons-tools/Close.tsx';
import { useEffect, useRef, useState } from 'react';
import { ArrowLeft10x24 } from 'shared/ui/icons/icons-tools/ArrowLeft10x24.tsx';
import { ArrowRight } from 'shared/ui/icons/icons-tools/ArrowRight.tsx';

type PortalProps = {
    image: string;
    setIsPortalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    images: LastAdvertsImages[];
    active: number;
    handleClickPortalPrev: () => void;
    handleClickPortalNext: () => void;
};

export const Portal = ({
    image,
    setIsPortalOpen,
    images,
    active,
    handleClickPortalPrev,
    handleClickPortalNext,
}: PortalProps) => {
    const { isMobile } = useMatchMedia();
    const [touchStart, setTouchStart] = useState<{identifier: number, screenX: number} | null>(null);
    const [imageWidth, setImageWidth] = useState<number>(0);
    const [imageHeight, setImageHeight] = useState<number>(0);
    const imageRef = useRef<null | HTMLImageElement>(null);

    const handleClick = () => {
        setIsPortalOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            setIsPortalOpen(false);
        }
    };

    const handleOnLoad = () => {
        setImageWidth(imageRef.current!.naturalWidth);
        setImageHeight(imageRef.current!.naturalHeight);
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
            if ( touchStart?.identifier === event.changedTouches[0].identifier) {
                if (event.changedTouches[0].screenX < touchStart.screenX) {
                    handleClickPortalNext();
                }
                if (event.changedTouches[0].screenX > touchStart.screenX) {
                    handleClickPortalPrev();
                }
            }
        }
        return;
    }

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);
    
    return (
        <div className={styles.portal}>
            <img
                src={image}
                alt="Photo"
                ref={imageRef}
                onLoad={handleOnLoad}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                className={
                    imageWidth > imageHeight
                        ? `${styles.horizontal}`
                        : `${styles.vertical}`
                }
            />
            <div className={styles.close_portal} onClick={handleClick}>
                <Close color="white" />
            </div>
            <div className={styles.prev}>
                <ArrowLeft10x24
                    color="white"
                    handleClickPrev={handleClickPortalPrev}
                />
            </div>
            <div className={styles.next}>
                <ArrowRight
                    color="white"
                    handleClickNext={handleClickPortalNext}
                />
            </div>
            <div className={styles.pages} onClick={handleClick}>
                <span>{`${active}/`}</span>
                <span>{`${images.length}`}</span>
            </div>
        </div>
    );
};