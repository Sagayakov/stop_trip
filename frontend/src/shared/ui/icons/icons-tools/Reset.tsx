interface Props {
    color: string;
}

export const Reset = ({ color }: Props) => {
    return (
        <>
            <svg
                width="15"
                height="14"
                viewBox="0 0 15 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g clipPath="url(#clip0_1324_2039)">
                    <path
                        d="M13.2683 7.87435C12.846 10.6808 10.4246 12.8327 7.50033 12.8327C4.27858 12.8327 1.66699 10.2211 1.66699 6.99935C1.66699 3.7776 4.27858 1.16602 7.50033 1.16602C9.89199 1.16602 11.9482 2.60568 12.8483 4.66602"
                        stroke={color}
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M10.4166 4.66667H12.9833C13.0292 4.66667 13.0747 4.65761 13.1172 4.64002C13.1597 4.62244 13.1982 4.59665 13.2307 4.56415C13.2633 4.53165 13.289 4.49307 13.3066 4.45061C13.3242 4.40814 13.3333 4.36263 13.3333 4.31667V1.75"
                        stroke={color}
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </g>
                <defs>
                    <clipPath id="clip0_1324_2039">
                        <rect
                            width="14"
                            height="14"
                            fill="white"
                            transform="translate(0.5)"
                        />
                    </clipPath>
                </defs>
            </svg>
        </>
    );
};
