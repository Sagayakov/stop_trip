import { UseFormRegister } from 'react-hook-form';
import { TypeSettingTaxi } from '../../../widgets/settingForm/settingTaxi/libr/TypeSettingTaxi';

interface Props {
    register: UseFormRegister<TypeSettingTaxi>;
}

export const SettingTaxiPrice = ({ register }: Props) => {
    return (
        <div className="taxiPrice">
            <h3>Цена</h3>
            <div className="setting-taxiPrice">
                <input
                    // id="setting-price-input-min"
                    type="number"
                    min="0"
                    placeholder="От"
                    {...register('price.min')}
                />
                <input
                    // id="setting-price-input-max"
                    type="number"
                    placeholder="До"
                    {...register('price.max')}
                />
            </div>
        </div>
    );
};
