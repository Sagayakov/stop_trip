interface Props {
  onclick?: () => void;
}

export const Close = ({ onclick }: Props) => {
  return (
    <svg
      style={{ cursor: 'pointer' }}
      onClick={onclick}
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1.12524 1.125L17.1473 16.922"
        stroke="#1C1C1E"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.147 1.125L1.12495 16.922"
        stroke="#1C1C1E"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
