import { UseFormRegister } from 'react-hook-form';
import { TypeSettingRealty } from '../../../widgets/settingForm/settingRealty/libr/TypeSettingRealty';

interface Props {
    register: UseFormRegister<TypeSettingRealty>;
}

export const HasFurniture = ({ register }: Props) => {
    return (
        <div className="hasFurniture">
            <h3>Мебель</h3>
            <div className="setting-hasFurniture">
                <label className="form-checkbox">
                    <input
                        type="checkbox"
                        {...register('property_has_furniture')}
                    />
                    <span>С мебелью</span>
                </label>
            </div>
        </div>
    );
};
