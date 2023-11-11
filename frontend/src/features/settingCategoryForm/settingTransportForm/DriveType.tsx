import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { TypeSettingTransport } from '../../../widgets/settingForm/settingTransport/libr/TypeSettingTransport';
import { valuesOfTransportForm } from '../../../widgets/settingForm/settingTransport/libr/valuesOfTransportForm';

interface Props {
    register: UseFormRegister<TypeSettingTransport>;
    setValue: UseFormSetValue<TypeSettingTransport>;
}

export const DriveType = ({ register }: Props) => {
    const driveValue = valuesOfTransportForm.drive;

    return (
        <div className="drive">
            <h3>Привод</h3>
            <div className='select-drive'>
                {driveValue.map((el) => (
                    <label className='form-checkbox' key={el}>
                        <input
                            type="checkbox"
                            value={el}
                            {...register('drive')}
                        />
                        <span>{el}</span>
                    </label>
                ))}
            </div>
        </div>
    );
};
