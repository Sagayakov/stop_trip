import { UseFormRegister } from 'react-hook-form';
import { TypeSettingTransport } from '../../../widgets/settingForm/settingTransport/libr/TypeSettingTransport';

interface Props {
    register: UseFormRegister<TypeSettingTransport>;
    // watch: UseFormWatch<TypeSettingTransport>;
}
export const TransportComission = ({ register }: Props) => {
    // const num = watch('passengerCapacity');

    return (
        <div className="transportComission">
            <h3>Комиссия</h3>
            <div className="select-transportComission">
                <input
                    id="input-select-transportComission"
                    placeholder='1-100?'
                    type="number"
                    {...register('commission')}
                />
            </div>
        </div>
    );
};
