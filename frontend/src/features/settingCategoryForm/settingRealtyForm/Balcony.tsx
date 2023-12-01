import { UseFormRegister } from 'react-hook-form';
import { TypeSettingRealty } from '../../../widgets/settingForm/settingRealty/libr/TypeSettingRealty';

interface Props {
    register: UseFormRegister<TypeSettingRealty>;
}

export const Balcony = ({ register }: Props) => {
    return (
        <div className="balcony">
            <h3>Балкон</h3>
            <div className="balcony-setting">
                <label className="form-checkbox">
                    <input
                        type="checkbox"
                        id="balcony-setting-1"
                        value="yes"
                        {...register('property_balcony')}
                    />
                    <span>Есть</span>
                </label>
                <label className="form-checkbox">
                    <input
                        type="checkbox"
                        id="balcony-setting-2"
                        value="no"
                        {...register('property_balcony')}
                    />
                    <span>Нет</span>
                </label>
                <label className="form-checkbox">
                    <input
                        type="checkbox"
                        id="balcony-setting-3"
                        value="loggia"
                        {...register('property_balcony')}
                    />
                    <span>Лоджия</span>
                </label>
            </div>
        </div>
    );
};
