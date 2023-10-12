interface Props {
  style?: Style;
  color?: string
}
interface Style {
  cursor: string;
}

export const Facebook = ({style, color}: Props) => {
  return (
    <svg
    style={style}
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <rect x="0.5" width="20" height="20" rx="10" fill={color} />
      <path
        d="M14.3926 12.8906L14.8359 10H12.0625V8.125C12.0625 7.33398 12.4492 6.5625 13.6914 6.5625H14.9531V4.10156C14.9531 4.10156 13.8086 3.90625 12.7148 3.90625C10.4297 3.90625 8.9375 5.29102 8.9375 7.79688V10H6.39844V12.8906H8.9375V19.8789C9.44727 19.959 9.96875 20 10.5 20C11.0312 20 11.5527 19.959 12.0625 19.8789V12.8906H14.3926Z"
        fill="white"
      />
    </svg>
  );
};
