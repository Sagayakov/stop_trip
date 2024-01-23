import { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface Props<T extends FieldValues> {
    register: UseFormRegister<T>;
    radioValues: Values[];
    name: Path<T>;
    className?: string;
    defaultValue?: Values;
    requiredField?: boolean;
}
interface Values {
    label: string | number;
    value: string | number;
}

export const UniversalRadioGroup = <T extends FieldValues>({
    radioValues,
    register,
    name,
    className,
    defaultValue,
    requiredField,
}: Props<T>) => {
    const { t } = useTranslation();
    return (
        <div className={`radio_group ${className}`}>
            {radioValues.map((el) => (
                <label className="form_checkbox" key={el.label}>
                    <input
                        type="radio"
                        value={el.value}
                        {...register(name, {
                            required: {
                                value: requiredField || false,
                                message: t('add-page.required')
                            },
                        })}
                        checked={defaultValue?.value === el.value || undefined}
                    />
                    <span>{el.label}</span>
                </label>
            ))}
        </div>
    );
};
