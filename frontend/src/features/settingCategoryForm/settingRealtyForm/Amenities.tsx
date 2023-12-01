import { UseFormRegister } from 'react-hook-form';
import { valuesOfPropertyForm } from '../../../widgets/settingForm/settingRealty/libr/valuesOfPropertyForm';
import { TypeSettingRealty } from '../../../widgets/settingForm/settingRealty/libr/TypeSettingRealty';

interface Props {
    register: UseFormRegister<TypeSettingRealty>;
}

export const Amenities = ({ register }: Props) => {
    const amenitiesTypeValues = valuesOfPropertyForm.property_amenities;

    return (
        <div className="amenities">
            <h3>Удобства</h3>
            <div className="amenities-setting">
                {amenitiesTypeValues.map((el) => (
                    <label className="form-checkbox" key={el.label}>
                        <input
                            type="checkbox"
                            value={el.value}
                            {...register('property_amenities')}
                        />
                        <span>{el.label}</span>
                    </label>
                ))}
            </div>
        </div>
    );
};

/* import { UseFormRegister } from 'react-hook-form';
import { TypeSettingRealty } from '../../../widgets/settingForm/settingRealty/libr/TypeSettingRealty';

interface Props {
    register: UseFormRegister<TypeSettingRealty>;
}

export const Amenities = ({ register }: Props) => {
    return (
        <div className="amenities">
            <h3>Удобства</h3>
            <div className="amenities-setting">
                <textarea
                    {...register('property_amenities')}
                    placeholder="Пожалуйста, через запятую перечислите желаемые удобства"
                ></textarea>
            </div>
        </div>
    );
}; */
