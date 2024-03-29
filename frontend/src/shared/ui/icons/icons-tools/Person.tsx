import { useMatchMedia } from 'app/hooks/useMatchMedia.ts';

interface Props {
    handleClick?: () => void;
    stroke: string
}

export const Person = ({ handleClick, stroke }: Props) => {
    const { isMobile } = useMatchMedia();
    return (
        <svg
            onClick={handleClick}
            width={isMobile ? "40%" : "80%"}//чтобы в сафари на телефоне не съезжало
            // width="80%"
            height="80%"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M5.5 20.5V19.5C5.5 17.6435 6.2375 15.863 7.55025 14.5503C8.86301 13.2375 10.6435 12.5 12.5 12.5M12.5 12.5C14.3565 12.5 16.137 13.2375 17.4497 14.5503C18.7625 15.863 19.5 17.6435 19.5 19.5V20.5M12.5 12.5C13.5609 12.5 14.5783 12.0786 15.3284 11.3284C16.0786 10.5783 16.5 9.56087 16.5 8.5C16.5 7.43913 16.0786 6.42172 15.3284 5.67157C14.5783 4.92143 13.5609 4.5 12.5 4.5C11.4391 4.5 10.4217 4.92143 9.67157 5.67157C8.92143 6.42172 8.5 7.43913 8.5 8.5C8.5 9.56087 8.92143 10.5783 9.67157 11.3284C10.4217 12.0786 11.4391 12.5 12.5 12.5Z"
                stroke={stroke}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};
