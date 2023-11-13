import { UseFormRegister } from 'react-hook-form';
import { TypeSettingTransport } from '../../../widgets/settingForm/settingTransport/libr/TypeSettingTransport';

interface Props {
    register: UseFormRegister<TypeSettingTransport>;
}
export const TransportComission = ({ register }: Props) => {

    return (
        <div className="transportComission">
            <h3>Комиссия</h3>
            <div className="setting-transportComission">
                <input
                    type="text"
                    pattern="[0-9]*[.,]?[0-9]+"
                    autoComplete="off"
                    {...register('commission.min')}
                    min={1}
                    placeholder="От"
                />
                <input
                    type="text"
                    pattern="[0-9]*[.,]?[0-9]+"
                    autoComplete="off"
                    {...register('commission.max')}
                    min={1}
                    placeholder="До"
                />
            </div>
        </div>
    );
};
