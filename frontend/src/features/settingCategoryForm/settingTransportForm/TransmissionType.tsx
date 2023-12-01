import { UseFormRegister } from 'react-hook-form';
import { TypeSettingTransport } from '../../../widgets/settingForm/settingTransport/libr/TypeSettingTransport';
import { valuesOfTransportForm } from '../../../widgets/settingForm/settingTransport/libr/valuesOfTransportForm';

interface Props {
    register: UseFormRegister<TypeSettingTransport>;
}

export const TransmissionType = ({ register }: Props) => {
    const transmissionTypeValues = valuesOfTransportForm.transport_transmission_type;

    return (
        <div className="transmissionType">
            <h3>Тип коробки передач</h3>
            <div className="select-transmissionType">
                {transmissionTypeValues.map((el) => (
                    <label className="form-checkbox" key={el.label}>
                        <input
                            type="checkbox"
                            value={el.value}
                            {...register('transport_transmission_type')}
                        />
                        <span>{el.label}</span>
                    </label>
                ))}
            </div>
        </div>
    );
};
