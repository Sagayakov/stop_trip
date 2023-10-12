interface Props {
    color: string
    style?: Style
}
interface Style{
  marginRight: string
  cursor: string
}

export const ArrowLeft14x7 = ({color, style}: Props) => {
  return (
    <svg
    style={style}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15 19L8 12L15 5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
