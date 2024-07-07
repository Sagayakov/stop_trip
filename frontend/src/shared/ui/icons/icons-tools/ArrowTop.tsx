interface Props {
    color?: string;
    onclick?: () => void;
}

export const ArrowTop = ({ color = '#1f6fde' }: Props) => {
    return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 14.5L12 9.5L17 14.5" stroke={color} stroke-width="2" stroke-linecap="round"/>
        </svg>
    );
};
