import { UseFormRegister } from 'react-hook-form';
import { TypeOfServicesForm } from '../../../widgets/settingForm/settingServices/libr/TypeOfServicesForm';

interface Props {
    register: UseFormRegister<TypeOfServicesForm>;
}

export const SettingServicePrice = ({ register }: Props) => {
    return (
        <div className="servicePrice">
            <h3>Цена</h3>
            <div className="setting-servicePrice">
                <input
                    type="number"
                    min="0"
                    placeholder="От"
                    {...register('price.min')}
                />
                <input
                    type="number"
                    placeholder="До"
                    {...register('price.max')}
                />
            </div>
        </div>
    );
};
