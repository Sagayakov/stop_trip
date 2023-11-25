import { useMatchMedia } from '../../app/hooks/useMatchMedia';
import './portal.scss';
import { LastAdvertsImages } from '../../app/api/types/lastAdvertsTypes';
import { Close } from '../../shared/ui/icons/icons-tools/Close';
import { useState } from 'react';

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
    const { isTablet, isMobile } = useMatchMedia();
    const [touchStart, setTouchStart] = useState<{identifier: number, screenX: number} | null>(null);

    const handleClick = () => {
        setIsPortalOpen(false);
    };

    const handleTouchStart = (event: React.TouchEvent<HTMLImageElement>) => {
        if (isMobile) {
            setTouchStart({
                identifier: event.changedTouches[0].identifier,
                screenX: event.changedTouches[0].screenX,
            });
        } else {
            return;
        }
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
                return;
            }
        } else {
            return;
        }
    }
    
    return (
        <div className="portal">
            {isTablet || isMobile ? (
                <>
                    <img
                        src={image}
                        alt="Photo"
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
                    />
                    <div className="close-portal" onClick={handleClick}>
                        <Close color='white' />
                    </div>
                    <div className="pages" onClick={handleClick}>
                        <span>{`${active}/`}</span>
                        <span>{`${images.length}`}</span>
                    </div>
                </>
            ) : (
                <img src={image} alt="Photo" />
            )}
        </div>
    );
};