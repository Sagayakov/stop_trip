import { UseFormRegister } from 'react-hook-form';
import { TypeSettingTransport } from '../../../widgets/settingForm/settingTransport/TypeSettingTransport';

interface Props {
    register: UseFormRegister<TypeSettingTransport>;
}

export const EngineСapacity = ({}:Props) => {
    return (
        <div className="engineСapacity">
            <h3>Объем двигателя</h3>
        </div>
    );
};
