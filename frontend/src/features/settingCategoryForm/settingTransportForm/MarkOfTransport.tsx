import {
    Control,
    Controller,
    UseFormRegister,
    UseFormSetValue,
} from 'react-hook-form';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import {
    SelectOption,
    TypeSettingTransport,
} from '../../../widgets/settingForm/settingTransport/libr/TypeSettingTransport';
import { valuesOfTransportForm } from '../../../widgets/settingForm/settingTransport/libr/valuesOfTransportForm';

interface Props {
    register: UseFormRegister<TypeSettingTransport>;
    setValue: UseFormSetValue<TypeSettingTransport>;
    control: Control<TypeSettingTransport, string>;
}

export const MarkOfTransport = ({ setValue, control }: Props) => {
    const arrOfValues = valuesOfTransportForm.mark;
    const animated = makeAnimated();

    const handleChange = ( selectedOptions: SelectOption | null) => {
        selectedOptions && setValue('mark', selectedOptions.value)
    };

    return (
        <div className="mark">
            <h3>Марка</h3>
            <Controller
                name="mark"
                defaultValue=''
                control={control}
                render={({ field }) => (
                    <Select
                        {...field}
                        classNamePrefix="filterTransporForm"
                        id="mark"
                        components={animated}
                        placeholder="Выберите марку"
                        isMulti={false}
                        options={arrOfValues}
                        onChange={(selectedOptions) => {
                            handleChange(
                                selectedOptions as
                                    SelectOption
                                    | null
                            );
                        }}
                    />
                )}
            />
        </div>
    );
};
