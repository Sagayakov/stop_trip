import { UseFormRegister } from 'react-hook-form';
import { TypeSettingTransport } from 'widgets/settingForm/settingTransport/libr/TypeSettingTransport';


interface Props {
    register: UseFormRegister<TypeSettingTransport>;
}

export const SettingTransportPrice = ({ register }: Props) => {
    return (
        <div className="transportPrice">
            <h3>Цена</h3>
            <div className="setting-transportPrice">
                <input
                    type="number"
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
