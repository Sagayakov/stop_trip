import { UseFormRegister } from 'react-hook-form';
import { TypeSettingTaxi } from '../../../widgets/settingForm/settingTaxi/libr/TypeSettingTaxi';

interface Props {
    register: UseFormRegister<TypeSettingTaxi>;
}

export const SettingTaxiPrice = ({ register }: Props) => {
    return (
        <div className="settingTaxiPrice">
            <h3>Цена</h3>
            <div className="setting-TaxiPrice-inputs">
                <input
                    // id="setting-price-input-min"
                    type="number"
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
