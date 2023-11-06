import { UseFormRegister } from 'react-hook-form';
import { TypeSettingTransport } from '../../../widgets/settingForm/settingTransport/TypeSettingTransport';

interface Props {
    register: UseFormRegister<TypeSettingTransport>;
}

export const ConditionOfTransport = ({}:Props) => {
    return (
        <div className="condition">
            <h3>Состояние</h3>
        </div>
    );
};
