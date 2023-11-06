import { UseFormRegister } from 'react-hook-form';
import { TypeSettingTransport } from '../../../widgets/settingForm/settingTransport/TypeSettingTransport';

interface Props {
    register: UseFormRegister<TypeSettingTransport>;
}

export const ModelOfTransport = ({}:Props) => {
    return (
        <div className="model">
            <h3>Модель</h3>
        </div>
    );
};
