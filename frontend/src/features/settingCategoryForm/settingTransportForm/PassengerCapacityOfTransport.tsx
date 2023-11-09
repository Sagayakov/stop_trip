import { UseFormRegister, UseFormWatch } from 'react-hook-form';
import { TypeSettingTransport } from '../../../widgets/settingForm/settingTransport/libr/TypeSettingTransport';

interface Props {
    register: UseFormRegister<TypeSettingTransport>;
    watch: UseFormWatch<TypeSettingTransport>;
}

export const PassengerCapacityOfTransport = ({ register, watch }: Props) => {
    const num = watch('passengerCapacity');
    const err = (num && num < 1) || (num && num > 12);

    return (
        <div className="passengerCapacity">
            <h3>Количество пассажиров</h3>
            <div className="select-passengerCapacity">
                <input
                    id="input-select-passengerCapacity"
                    type="number"
                    min="1"
                    max="12"
                    placeholder="От 1 до 12"
                    {...register('passengerCapacity')}
                    style={err ? { border: '1px solid #ff3f25' } : {}}
                />
                {err ? <p>Введите число в диапазоне от 1 до 12</p> : <p></p>}
            </div>
        </div>
    );
};
