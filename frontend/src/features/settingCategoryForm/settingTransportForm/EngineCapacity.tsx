import { UseFormRegister } from 'react-hook-form';
import { TypeSettingTransport } from '../../../widgets/settingForm/settingTransport/libr/TypeSettingTransport';

interface Props {
    register: UseFormRegister<TypeSettingTransport>;
}

export const EngineCapacity = ({ register }: Props) => {
    return (
        <div className="engineСapacity">
            <h3>Объем двигателя</h3>
            <div className="setting-engineCapacity">
                <input
                    type="text"
                    pattern="[0-9]*[.,]?[0-9]+"
                    autoComplete="off"
                    {...register('transport_engine_volume.min')}
                    min="0"
                    placeholder="От"
                />
                <input
                    type="text"
                    pattern="[0-9]*[.,]?[0-9]+"
                    autoComplete="off"
                    {...register('transport_engine_volume.max')}
                    min="0.5"
                    placeholder="До"
                />
            </div>
        </div>
    );
};
