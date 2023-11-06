import { UseFormRegister } from 'react-hook-form';
import { TypeSettingTransport } from '../../../widgets/settingForm/settingTransport/TypeSettingTransport';

interface Props {
    register: UseFormRegister<TypeSettingTransport>;
}

export const TypeOfService = ({ register }: Props) => {
    return (
        <div className="typeOfService">
            <h3>Тип услуги</h3>
            <div className="select-typeOfService"></div>
        </div>
    );
};
