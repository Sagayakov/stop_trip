import { ArrowLeft10x24 } from '../../shared/ui/icons/icons-tools/ArrowLeft10x24';
import { useMatchMedia } from '../../app/hooks/useMatchMedia';
import './portal.scss';
import { ArrowRight } from '../../shared/ui/icons/icons-tools/ArrowRight';
import { LastAdvertsImages } from '../../app/api/types/lastAdvertsTypes';
import { Close } from '../../shared/ui/icons/icons-tools/Close';

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

    const handleClick = () => {
        setIsPortalOpen(false);
    };
    
    return (
        <div className="portal">
            {isTablet || isMobile ? (
                <>
                    <img src={image} alt="Photo" />
                    <div className="close-portal" onClick={handleClick}>
                        <Close color='white' />
                    </div>
                    <div className="prev">
                        <ArrowLeft10x24 color='white' handleClickPrev={handleClickPortalPrev} />
                    </div>
                    <div className="next">
                        <ArrowRight color='white' handleClickNext={handleClickPortalNext} />
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