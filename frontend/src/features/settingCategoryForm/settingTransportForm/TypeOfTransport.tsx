import { UseFormRegister, UseFormWatch } from 'react-hook-form';
import { TypeSettingTransport } from '../../../widgets/settingForm/settingTransport/libr/TypeSettingTransport';

interface Props {
    register: UseFormRegister<TypeSettingTransport>;
    watch: UseFormWatch<TypeSettingTransport>;
}
export const TypeOfTransport = ({ register }: Props) => {

    return (
        <div className="typeOfTransport">
            <h3>Тип транспорта</h3>
            <div className="setting-typeOfTransport">
                <label className="form-checkbox">
                    <input
                        type="checkbox"
                        {...register('typeOfTransport')}
                        value="Наземный"
                    />
                    <span>Наземный</span>
                </label>
                <label className="form-checkbox">
                    <input
                        type="checkbox"
                        {...register('typeOfTransport')}
                        value="Водный"
                    />
                    <span>Водный</span>
                </label>
            </div>
        </div>
    );
};
