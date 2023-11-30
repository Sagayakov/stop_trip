import { UseFormRegister } from 'react-hook-form';
import { TypeSettingRealty } from '../../../widgets/settingForm/settingRealty/libr/TypeSettingRealty';

interface Props {
    register: UseFormRegister<TypeSettingRealty>;
}

export const Floor = ({ register }: Props) => {
    return (
        <div className="floor">
            <h3>Этаж</h3>
            <div className="setting-floor">
                    <input
                        type="number"
                        placeholder='Этаж'
                        min={0}
                        {...register('property_floor')}
                    />
            </div>
        </div>
    );
};
