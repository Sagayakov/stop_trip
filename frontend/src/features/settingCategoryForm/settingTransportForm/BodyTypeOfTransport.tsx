import { UseFormRegister } from 'react-hook-form';
import { TypeSettingTransport } from '../../../widgets/settingForm/settingTransport/TypeSettingTransport';

interface Props {
    register: UseFormRegister<TypeSettingTransport>;
}

export const BodyTypeOfTransport = ({}:Props) => {
    return (
        <div className="bodyType">
            <h3>Тип кузова</h3>
        </div>
    );
};
