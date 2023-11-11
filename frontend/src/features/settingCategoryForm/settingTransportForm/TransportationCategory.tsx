import { Control, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import {
    SelectOption,
    TypeSettingTransport,
} from '../../../widgets/settingForm/settingTransport/libr/TypeSettingTransport';
import { valuesOfTransportForm } from '../../../widgets/settingForm/settingTransport/libr/valuesOfTransportForm';

interface Props {
    setValue: UseFormSetValue<TypeSettingTransport>;
    control: Control<TypeSettingTransport, string[]>;
    register: UseFormRegister<TypeSettingTransport>;
}

export const TransportationCategory = ({ setValue, register }: Props) => {
    const transportationCategory = valuesOfTransportForm.transportationCategory;
    const animated = makeAnimated();
    const handleChange = (
        selectedOptions: SelectOption | SelectOption[] | null
    ) => {
        if (selectedOptions) {
            const optionsArray = Array.isArray(selectedOptions)
                ? selectedOptions
                : [selectedOptions];
            const selectedValues = optionsArray
                .map((option) => option?.value)
                .filter(Boolean);
            setValue('transportationCategory', selectedValues);
        } else {
            setValue('transportationCategory', []);
        }
    };

    return (
        <div className="transportationCategory">
            <h3>Категория транспорта</h3>
            <Select
                {...register('transportationCategory')}
                defaultInputValue=""
                classNamePrefix="filterTransporForm"
                id="transportationCategory"
                components={animated}
                closeMenuOnSelect={false}
                placeholder="Выберите категорию"
                isMulti={true}
                options={transportationCategory}
                onChange={(selectedOptions) => {
                    handleChange(
                        selectedOptions as SelectOption | SelectOption[] | null
                    );
                }}
            />
        </div>
    );
};
