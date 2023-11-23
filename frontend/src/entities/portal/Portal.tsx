import './portal.scss';

type PortalProps = {
    image: string;
};

export const Portal = ({image}: PortalProps) => {
    return (
        <div className="portal">
            <img src={image} alt="Photo" />
        </div>
    );
};