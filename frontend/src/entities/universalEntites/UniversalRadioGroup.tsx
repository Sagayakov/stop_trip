import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

interface Props<T extends FieldValues> {
    register: UseFormRegister<T>;
    radioValues: Values[];
    name: Path<T>;
}
interface Values{
    label: string | number
    value: string | number
}

export const UniversalRadioGroup = <T extends FieldValues>({
    radioValues,
    register,
    name,
}: Props<T>) => {
    return (
        <div className="radio-group">
            {radioValues.map((el) => (
                <label className="form-checkbox" key={el.label}>
                    <input type="radio" value={el.value} {...register(name)} />
                    <span>{el.label}</span>
                </label>
            ))}
        </div>
    );
};