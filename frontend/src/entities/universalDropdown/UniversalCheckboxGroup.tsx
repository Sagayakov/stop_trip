import {
    FieldValues,
    Path,
    UseFormRegister,
} from 'react-hook-form';

interface Props<T extends FieldValues> {
    register: UseFormRegister<T>;
    checkboxValues: Options[];
    name: Path<T>;
}
interface Options{
    value: string | number
    label: string | number
}


export const UniversalCheckboxGroup = <T extends FieldValues>({ checkboxValues, register, name }: Props<T>) => {

    return (
        <div className="checkbox-group">
            {checkboxValues.map((el) => (
                <label className="form-checkbox" key={el.label}>
                    <input
                        type="checkbox"
                        value={el.value}
                        {...register(name)}
                    />
                    <span>{el.label}</span>
                </label>
            ))}
        </div>
    );
};