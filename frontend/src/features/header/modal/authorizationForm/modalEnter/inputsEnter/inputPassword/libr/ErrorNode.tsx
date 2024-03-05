export const ErrorNode = ({ text }: { text: string }) => {
    const active = 'активной';
    const arr = text.split(' ');

    if (arr.includes(active)) {
        return (
            <p
                style={{
                    color: '#FF3F25',
                    fontSize: '13px',
                    marginBottom: '1rem',
                }}
            >
                {`${arr.slice(0, arr.indexOf(active)).join(' ')} `}
                <span
                    style={{
                        fontSize: '13px',
                        fontWeight: '600',
                    }}
                >
                    {active}
                </span>
                {` ${arr.slice(arr.indexOf(active) + 1).join(' ')}`}
            </p>
        );
    }

    return <p style={{ color: '#FF3F25', fontSize: '13px' }}>{text}</p>;
};
