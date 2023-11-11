import { UseFormRegister } from 'react-hook-form';
import { TypeSettingTransport } from '../../../widgets/settingForm/settingTransport/libr/TypeSettingTransport';
import { valuesOfTransportForm } from '../../../widgets/settingForm/settingTransport/libr/valuesOfTransportForm';

interface Props {
    register: UseFormRegister<TypeSettingTransport>;
}

export const TransmissionType = ({ register }: Props) => {
    const transmissionTypeValues = valuesOfTransportForm.transmissionType;

    return (
        <div className="transmissionType">
            <h3>Тип коробки передач</h3>
            <div className="select-transmissionType">
                {transmissionTypeValues.map((el) => (
                    <label className="form-checkbox" key={el}>
                        <input
                            type="checkbox"
                            value={el}
                            {...register('transmissionType')}
                        />
                        <span>{el}</span>
                    </label>
                ))}
            </div>
        </div>
    );
};
