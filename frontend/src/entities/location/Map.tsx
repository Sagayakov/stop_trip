type MapProps = {
    text: string;
    lat: number;
    lng: number;
};

export const Map = ({ text }: MapProps) => {
    return <div>{text}</div>;
};
