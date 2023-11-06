import { UseFormRegister } from 'react-hook-form';
import { TypeSettingTransport } from '../../../widgets/settingForm/settingTransport/TypeSettingTransport';

interface Props {
    register: UseFormRegister<TypeSettingTransport>;
}

export const TransmissionType = ({}:Props) => {
    return (
        <div className="transmissionType">
            <h3>Тип коробки передач</h3>
        </div>
    );
};
