interface Props {
  color: string
}

export const Pencil = ({color}: Props) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4 20H20"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 20H8L19.2929 8.70708C19.6834 8.31655 19.6834 7.68339 19.2929 7.29286L16.7071 4.70708C16.3166 4.31655 15.6834 4.31655 15.2929 4.70708L4 16V20Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
