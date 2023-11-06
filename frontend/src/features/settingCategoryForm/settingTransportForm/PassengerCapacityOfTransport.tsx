import { UseFormRegister } from 'react-hook-form';
import { TypeSettingTransport } from '../../../widgets/settingForm/settingTransport/TypeSettingTransport';

interface Props {
    register: UseFormRegister<TypeSettingTransport>;
}

export const PassengerCapacityOfTransport = ({}:Props) => {
    return (
        <div className="passengerCapacity">
            <h3>Количество пассажиров</h3>
        </div>
    );
};
