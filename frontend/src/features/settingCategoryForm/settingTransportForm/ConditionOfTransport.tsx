import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { TypeSettingTransport } from '../../../widgets/settingForm/settingTransport/libr/TypeSettingTransport';
import { valuesOfTransportForm } from '../../../widgets/settingForm/settingTransport/libr/valuesOfTransportForm';

interface Props {
    register: UseFormRegister<TypeSettingTransport>;
    setValue: UseFormSetValue<TypeSettingTransport>;
}

export const ConditionOfTransport = ({ register }: Props) => {
    const conditionOfTransportValue = valuesOfTransportForm.transport_condition;

    return (
        <div className="condition">
            <h3>Состояние</h3>
            <div className="select-condition">
                {conditionOfTransportValue.map((el) => (
                    <label className="form-checkbox" key={el.label}>
                        <input
                            type="checkbox"
                            value={el.value}
                            {...register('transport_condition')}
                        />
                        <span>{el.label}</span>
                    </label>
                ))}
            </div>
        </div>
    );
};
