import { UseFormRegister } from 'react-hook-form';
import { TypeSettingTransport } from '../../../widgets/settingForm/settingTransport/libr/TypeSettingTransport';

interface Props {
    register: UseFormRegister<TypeSettingTransport>;
}

export const EngineСapacity = ({ register }: Props) => {
    return (
        <div className="engineСapacity">
            <h3>Объем двигателя</h3>
            <div className="setting-engineCapacity">
                <input
                    type="text"
                    pattern="[0-9]*[.,]?[0-9]+"
                    autoComplete="off"
                    {...register('engineСapacity.min')}
                    min={1}
                    max={10}
                    placeholder="От 1"
                />
                <input
                    type="text"
                    pattern="[0-9]*[.,]?[0-9]+"
                    autoComplete="off"
                    {...register('engineСapacity.max')}
                    min={1}
                    max={10}
                    placeholder="До 10"
                />
            </div>
        </div>
    );
};
