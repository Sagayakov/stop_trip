import {
    FieldValues,
    Path,
    UseFormRegister,
} from 'react-hook-form';

interface Props<T extends FieldValues> {
    register: UseFormRegister<T>;
    checkboxValues: string[] | number[];
    name: Path<T>;
}


export const UniversalCheckboxGroup = <T extends FieldValues>({ checkboxValues, register, name }: Props<T>) => {

    return (
        <div className="checkbox-group">
            {checkboxValues.map((el) => (
                <label className="form-checkbox" key={el}>
                    <input
                        type="checkbox"
                        value={el}
                        {...register(name)}
                    />
                    <span>{el}</span>
                </label>
            ))}
        </div>
    );
};