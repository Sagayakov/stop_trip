import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

interface Props<T extends FieldValues> {
    register: UseFormRegister<T>;
    radioValues: Values[];
    name: Path<T>;
    className?: string
}
interface Values{
    label: string | number
    value: string | number
}

export const UniversalRadioGroup = <T extends FieldValues>({
    radioValues,
    register,
    name,
    className
}: Props<T>) => {
    return (
        <div className={`radio_group ${className}`}>
            {radioValues.map((el) => (
                <label className="form_checkbox" key={el.label}>
                    <input type="radio" value={el.value} {...register(name)} />
                    <span>{el.label}</span>
                </label>
            ))}
        </div>
    );
};
