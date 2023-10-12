interface Props {
    color: string
    stroke: string
}

export const Message = ({ color, stroke }: Props) => {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M7 12H17M7 8H13"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M3 20.29V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7.961C7.66123 17 7.36531 17.0675 7.09511 17.1973C6.82491 17.3271 6.58735 17.516 6.4 17.75L4.069 20.664C3.99143 20.7612 3.88556 20.8319 3.76604 20.8664C3.64652 20.9008 3.51926 20.8972 3.40186 20.8561C3.28446 20.815 3.18273 20.7385 3.11073 20.6371C3.03874 20.5357 3.00005 20.4144 3 20.29Z"
                stroke={stroke}
                strokeWidth="2"
            />
        </svg>
    )
}
