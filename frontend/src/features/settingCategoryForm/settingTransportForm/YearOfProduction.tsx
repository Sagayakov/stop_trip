import { UseFormRegister } from 'react-hook-form';
import { TypeSettingTransport } from '../../../widgets/settingForm/settingTransport/libr/TypeSettingTransport';

interface Props {
    register: UseFormRegister<TypeSettingTransport>;
}

export const YearOfProduction = ({ register }: Props) => {
    return (
        <div className="yearOfProduction">
            <h3>Год производства</h3>
            <div className="setting-yearOfProduction">
                <input
                    type="number"
                    {...register('transport_year_of_production.min')}
                    placeholder="От"
                />
                <input
                    type="number"
                    {...register('transport_year_of_production.max')}
                    placeholder="До"
                />
            </div>
        </div>
    );
};
