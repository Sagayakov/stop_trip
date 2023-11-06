import { UseFormRegister } from 'react-hook-form';
import { TypeSettingTransport } from '../../../widgets/settingForm/settingTransport/TypeSettingTransport';

interface Props {
    register: UseFormRegister<TypeSettingTransport>;
}

export const EngineType = ({}:Props) => {
    return (
        <div className="engineType">
            <h3>Тип двигателя</h3>
        </div>
    );
};
