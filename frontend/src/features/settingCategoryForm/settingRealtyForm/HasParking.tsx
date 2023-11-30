import { UseFormRegister } from 'react-hook-form';
import { TypeSettingRealty } from '../../../widgets/settingForm/settingRealty/libr/TypeSettingRealty';

interface Props {
    register: UseFormRegister<TypeSettingRealty>;
}

export const HasParking = ({ register }: Props) => {
    return (
        <div className="hasParking">
            <h3>Парковка</h3>
            <div className="setting-hasParking">
                <label className="form-checkbox">
                    <input
                        type="checkbox"
                        {...register('property_has_parking')}
                    />
                    <span>С парковкой</span>
                </label>
            </div>
        </div>
    );
};
