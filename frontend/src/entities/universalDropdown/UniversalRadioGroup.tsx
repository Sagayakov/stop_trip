import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

interface Props<T extends FieldValues> {
    register: UseFormRegister<T>;
    radioValues: string[] | number[];
    name: Path<T>;
}

export const UniversalRadioGroup = <T extends FieldValues>({
    radioValues,
    register,
    name,
}: Props<T>) => {
    return (
        <div className="radio-group">
            {radioValues.map((el) => (
                <label className="form-checkbox" key={el}>
                    <input type="radio" value={el} {...register(name)} />
                    <span>{el}</span>
                </label>
            ))}
        </div>
    );
};
