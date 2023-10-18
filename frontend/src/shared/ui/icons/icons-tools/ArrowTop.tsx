interface Props {
    color?: string;
    onclick?: () => void;
}

export const ArrowTop = ({color}: Props) => {
    return (
        <>
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M7 15L11.1069 10.722C11.4896 10.3233 12.1231 10.3107 12.5214 10.6937L17 15"
                    stroke={color}
                    strokeWidth="2"
                    strokeLinecap="round"
                />
            </svg>
        </>
    );
};
