import { UseFormRegister } from 'react-hook-form';
import { TypeSettingTransport } from '../../../widgets/settingForm/settingTransport/TypeSettingTransport';

interface Props {
    register: UseFormRegister<TypeSettingTransport>;
}

export const YearOfProduction = ({}:Props) => {
    return (
        <div className="yearOfProduction">
            <h3>Год производства</h3>
        </div>
    );
};
