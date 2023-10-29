interface Props {
    isValid: boolean;
}

export const InputSubmit = ({ isValid }: Props) => {
    return (
        <input
            type="submit"
            style={{
                width: '100%',
                height: '43px',
                backgroundColor: '#02C66E',
                border: 'none',
                borderRadius: '8px',
                color: 'white',
                cursor: 'pointer',
            }}
            value="Зарегистрироваться"
            disabled={!isValid}
        />
    );
};
