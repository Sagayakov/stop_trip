import { UseFormRegister } from 'react-hook-form';
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
                    {...register('amenities')}
                    placeholder="Пожалуйста, через запятую перечислите желаемые удобства"
                ></textarea>
            </div>
        </div>
    );
};
