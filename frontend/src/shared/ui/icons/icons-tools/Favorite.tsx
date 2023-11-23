interface Props {
    addToFavorite?: () => void;
    color?: string;
    strokeColor?: string;
}

export const Favorite = ({ strokeColor, color, addToFavorite }: Props) => {
    const handleClick = (event:  React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        event.stopPropagation();
        addToFavorite && addToFavorite();
    };

    return (
        <svg
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill={color}
            xmlns="http://www.w3.org/2000/svg"
            onClick={handleClick}
        >
            <path
                d="M10 17C10 17 1 11.9875 1 5.97234C1 -0.0427764 8 -0.544034 10 4.16221C12 -0.544034 19 -0.0427764 19 5.97234C19 11.9875 10 17 10 17Z"
                stroke={strokeColor}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};
