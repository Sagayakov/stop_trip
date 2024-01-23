import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

interface Props<T extends FieldValues> {
    register: UseFormRegister<T>;
    checkboxValues: Options[];
    name: Path<T>;
    className?: string;
    defaultValue?:  Options[];
}
interface Options {
    value: string | number;
    label: string | number;
}

export const UniversalCheckboxGroup = <T extends FieldValues>({
    checkboxValues,
    register,
    name,
    className,
    defaultValue,
}: Props<T>) => {

    return (
        <div className={`checkbox_group ${className}`}>
            {checkboxValues.map((el) => (
                <label className="form_checkbox" key={el.label}>
                    <input
                        type="checkbox"
                        value={el.value}
                        {...register(name)}
                        checked={Boolean(defaultValue?.find((defVal) => defVal.label === el.label)) || undefined}
                        // checked={defaultValue?.forEach((defVal) => defVal.label === el.label) || undefined}
                        // checked={defaultValue?.includes((el.label as string).toLowerCase())}
                    />
                    <span>{el.label}</span>
                </label>
            ))}
        </div>
    );
};
