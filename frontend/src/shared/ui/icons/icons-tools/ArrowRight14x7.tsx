interface Props {
    color: string
    style?: Style
}
interface Style {
    marginLeft: string
    cursor: string
}

export const ArrowRight14x7 = ({color, style}: Props) => {
    return (
      <svg
      style={style}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M9 5L16 12L9 19"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );

}