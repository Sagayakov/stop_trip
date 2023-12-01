import { ProductType } from "../../../pages/advertPage/libr/types";

type HandlersType = {
    data?: ProductType | undefined;
    activeImage?: number;
    ref?: React.MutableRefObject<HTMLImageElement | null>;
    setActiveImage?: React.Dispatch<React.SetStateAction<number>>;
    setImageWidth?: React.Dispatch<React.SetStateAction<number>>;
    setImageHeight?: React.Dispatch<React.SetStateAction<number>>;
    setIsPortalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
    activePortalImage?: number;
    setActivePortalImage?: React.Dispatch<React.SetStateAction<number>>;
}

export const handleClickPrev = ({ data, activeImage, setActiveImage }: HandlersType) => {
    if (data) {
        activeImage! > 0
            ? setActiveImage!(activeImage! - 1)
            : setActiveImage!(data.images.length - 1);
    }
};

export const handleClickNext = ({ data, activeImage, setActiveImage }: HandlersType) => {
    if (data) {
        activeImage! < data.images.length - 1
            ? setActiveImage!(activeImage! + 1)
            : setActiveImage!(0);
    }
};

export const handleOnLoad = ({ setImageWidth, setImageHeight, ref }: HandlersType) => {
    setImageWidth!(ref!.current!.naturalWidth);
    setImageHeight!(ref!.current!.naturalHeight);
};

export const openPhoto = ({setIsPortalOpen}: HandlersType) => {
    setIsPortalOpen!(true);
};

export const handleClickPortalPrev = ({ data, activePortalImage, setActivePortalImage }: HandlersType) => {
    if (data) {
        activePortalImage! > 1
            ? setActivePortalImage!(activePortalImage! - 1)
            : setActivePortalImage!(data.images.length);
    }
};

export const handleClickPortalNext = ({ data, activePortalImage, setActivePortalImage }: HandlersType) => {
    if (data) {
        activePortalImage! < data.images.length
            ? setActivePortalImage!(activePortalImage! + 1)
            : setActivePortalImage!(1);
    }
    
};