import {
    Control,
    Controller,
    UseFormRegister,
    UseFormSetValue,
    UseFormWatch,
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
    watch: UseFormWatch<TypeSettingTransport>;
    setValue: UseFormSetValue<TypeSettingTransport>;
    control: Control<TypeSettingTransport, string>;
}

export const ModelOfTransport = ({ watch, setValue, control }: Props) => {
    const markOfTrasport = watch('mark');
    console.log(markOfTrasport);
    const animated = makeAnimated();
    const arrOfValues = valuesOfTransportForm.model;
    const disabled = markOfTrasport ? false : true;

    const handleChange = (selectedOptions: SelectOption | null) => {
        selectedOptions && setValue('model', selectedOptions.value)
    };

    return (
        <div className="model">
            <h3>Модель</h3>
            <Controller
                name="model"
                control={control}
                defaultValue=''
                render={({ field }) => (
                    <Select
                        {...field}
                        classNamePrefix="filterTransporForm"
                        id="model"
                        isDisabled={disabled}
                        components={animated}
                        placeholder="Выберите модель"
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
