import { UseFormRegister } from 'react-hook-form';
import { TypeSettingRealty } from '../../../widgets/settingForm/settingRealty/libr/TypeSettingRealty';

interface Props {
    register: UseFormRegister<TypeSettingRealty>;
}

export const Bathroom = ({ register }: Props) => {
    return (
        <div className="bathroom">
            <h3>Санузел</h3>
            <div className="bathroom-setting">
                <label className="form-checkbox">
                    <input
                        type="checkbox"
                        id="bathroom-setting-1"
                        value="separate"
                        {...register('property_bathroom_type')}
                    />
                    <span>Раздельный</span>
                </label>
                <label className="form-checkbox">
                    <input
                        type="checkbox"
                        id="bathroom-setting-2"
                        value="combined"
                        {...register('property_bathroom_type')}
                    />
                    <span>Совмещенный</span>
                </label>
            </div>
        </div>
    );
};
