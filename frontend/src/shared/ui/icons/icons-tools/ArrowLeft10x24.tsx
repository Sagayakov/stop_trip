interface Props {
    color?: string;
    style?: Style;
}
interface Style {
    marginRight: string;
    cursor: string;
}

export const ArrowLeft10x24 = ({ style }: Props) => {
    return (
        <>
            <svg
                style={style}
                width="10"
                height="24"
                viewBox="0 0 10 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M8 17L3.72196 12.8931C3.32333 12.5104 3.31065 11.8769 3.69366 11.4786L8 7"
                    stroke="#1C1C1E"
                    strokeWidth="2"
                    strokeLinecap="round"
                />
            </svg>
        </>
    );
};
