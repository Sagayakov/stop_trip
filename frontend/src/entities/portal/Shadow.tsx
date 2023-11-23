import { ArrowLeft10x24 } from '../../shared/ui/icons/icons-tools/ArrowLeft10x24';
import { Close } from '../../shared/ui/icons/icons-tools/Close';
import './portal.scss';
import { ArrowRight } from '../../shared/ui/icons/icons-tools/ArrowRight';
import { LastAdvertsImages } from '../../app/api/types/lastAdvertsTypes';
import { useMatchMedia } from '../../app/hooks/useMatchMedia';

type ShadowProps = {
    setIsPortalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    images: LastAdvertsImages[];
    active: number;
    handleClickPortalPrev: () => void;
    handleClickPortalNext: () => void;
};

export const Shadow = ({
        setIsPortalOpen,
        images,
        active,
        handleClickPortalPrev,
        handleClickPortalNext,
    }: ShadowProps) => {
    const { isTablet } = useMatchMedia();

    const handleClick = () => {
        setIsPortalOpen(false);
    };

    return (
            <div className="shadow" onClick={handleClick}>
                {!isTablet && (
                    <div className="shadow" onClick={handleClick}>
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
                    </div>
                )}
            </div>   
        );
};