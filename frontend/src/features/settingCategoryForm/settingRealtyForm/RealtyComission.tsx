import { UseFormRegister } from 'react-hook-form';
import { TypeSettingRealty } from '../../../widgets/settingForm/settingRealty/TypeSettingRealty';

interface Props {
    register: UseFormRegister<TypeSettingRealty>;
}
export const RealtyComission = ({ register }: Props) => {

    return (
        <div className="realtyComission">
            <h3>Комиссия</h3>
            <div className="select-realtyComission">
                <input
                    id="input-select-realtyComission"
                    placeholder="1-100?"
                    type="number"
                    {...register('comission')}
                />
            </div>
        </div>
    );
};
