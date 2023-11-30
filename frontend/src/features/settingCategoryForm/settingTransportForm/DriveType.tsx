import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { TypeSettingTransport } from '../../../widgets/settingForm/settingTransport/libr/TypeSettingTransport';
import { valuesOfTransportForm } from '../../../widgets/settingForm/settingTransport/libr/valuesOfTransportForm';

interface Props {
    register: UseFormRegister<TypeSettingTransport>;
    setValue: UseFormSetValue<TypeSettingTransport>;
}

export const DriveType = ({ register }: Props) => {
    const driveValue = valuesOfTransportForm.transport_drive_type;

    return (
        <div className="drive">
            <h3>Привод</h3>
            <div className='select-drive'>
                {driveValue.map((el) => (
                    <label className='form-checkbox' key={el.label}>
                        <input
                            type="checkbox"
                            value={el.value}
                            {...register('transport_drive_type')}
                        />
                        <span>{el.label}</span>
                    </label>
                ))}
            </div>
        </div>
    );
};
