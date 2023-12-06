import './portal.scss';

type ShadowProps = {
    setIsPortalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Shadow = ({ setIsPortalOpen }: ShadowProps) => {
    const handleClick = () => {
        setIsPortalOpen(false);
    };

    return (
            <div className="shadow" onClick={handleClick}>
                {/* {!isTablet && !isMobile && (
                    <>
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
                )} */}
            </div>   
        );
};