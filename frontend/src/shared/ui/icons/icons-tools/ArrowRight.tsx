interface Props {
  color: string
}

export const ArrowRight = ({color}: Props) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9 7L13.278 11.1069C13.6767 11.4896 13.6893 12.1231 13.3063 12.5214L9 17"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};
