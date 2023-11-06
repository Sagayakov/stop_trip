import { UseFormRegister } from 'react-hook-form';
import { TypeSettingTransport } from '../../../widgets/settingForm/settingTransport/TypeSettingTransport';

interface Props {
    register: UseFormRegister<TypeSettingTransport>;
}

export const DriveType = ({}:Props) => {
    return (
        <div className="drive">
            <h3>Привод</h3>
        </div>
    );
};
