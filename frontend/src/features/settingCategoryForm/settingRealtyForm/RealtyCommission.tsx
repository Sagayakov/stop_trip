import { UseFormRegister } from 'react-hook-form';
import { TypeSettingRealty } from '../../../widgets/settingForm/settingRealty/libr/TypeSettingRealty';

interface Props {
    register: UseFormRegister<TypeSettingRealty>;
}
export const RealtyCommission = ({ register }: Props) => {
    return (
        <div className="realtyComission">
            <h3>Комиссия</h3>
            <div className="select-realtyComission">
                <input
                    type="number"
                    min="0"
                    placeholder="От"
                    {...register('property_commission.min')}
                />
                <input
                    id="setting-price-input-max"
                    min="0"
                    type="number"
                    placeholder="До"
                    {...register('property_commission.max')}
                />
            </div>
        </div>
    );
};
