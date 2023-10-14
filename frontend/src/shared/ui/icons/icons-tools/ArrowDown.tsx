interface Props {
    color?: string;
    onclick?: () => void
}

export const ArrowDown = ({ color, onclick }: Props) => {
    return (
        <svg
            onClick={onclick}
            id="arrow-down"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M17 9L12.8931 13.278C12.5104 13.6767 11.8769 13.6893 11.4786 13.3063L7 9"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    );
};
