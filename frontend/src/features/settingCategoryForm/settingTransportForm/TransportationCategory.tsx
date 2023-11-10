import { Control, Controller, UseFormSetValue } from 'react-hook-form';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { TypeSettingTransport } from '../../../widgets/settingForm/settingTransport/libr/TypeSettingTransport';
import { valuesOfTransportForm } from '../../../widgets/settingForm/settingTransport/libr/valuesOfTransportForm';

interface Props {
    setValue: UseFormSetValue<TypeSettingTransport>;
    control: Control<TypeSettingTransport, string>;
}

export const TransportationCategory = ({ /*setValue,*/ control, }: Props) => {
    const transportationCategory = valuesOfTransportForm.transportationCategory;
    const animated = makeAnimated();

    return (
        <div className="transportationCategory">
            <h3>Категория транспорта</h3>
            <Controller
                name="transportationCategory"
                control={control}
                defaultValue={null}
                render={({ field }) => (
                    <Select
                        {...field}
                        classNamePrefix="filterTransporForm"
                        id="transportationCategory"
                        components={animated}
                        placeholder="Выберите категорию"
                        isMulti={true}
                        options={transportationCategory.map((el) => ({
                                value: el.value,
                                label: el.label
                            })
                        )}
                    />
                )}
            />
        </div>

    );
};
