interface Props {
    color?: string;
}

export const ArrowDown = ({ color = '#1f6fde' }: Props) => {
    return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 9.5L12 14.5L7 9.5" stroke={color} stroke-width="2" stroke-linecap="round"/>
        </svg>
    );
};
