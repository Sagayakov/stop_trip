interface Props {
    value?: string;
    className?: string;
    disabled?: boolean;
    style?: Style;
}
interface Style{
    backgroundColor?: string;
}

export const InputTypeSubmit = ({ value, className, disabled, style }: Props) => {
    return (
        <input
            type="submit"
            value={value}
            className={className}
            disabled={disabled}
            style={style}
        />
    );
};
