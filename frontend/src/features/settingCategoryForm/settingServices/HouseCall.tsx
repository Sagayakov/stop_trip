import { UseFormRegister } from 'react-hook-form';
import { TypeOfServicesForm } from '../../../widgets/settingForm/settingServices/libr/TypeOfServicesForm';

interface Props {
    register: UseFormRegister<TypeOfServicesForm>;
}

export const HouseCall = ({ register }: Props) => {
    return (
        <div className="houseCall">
            <h3>Выезд на дом</h3>
            <div className="setting-houseCall">
                <label className="form-checkbox">
                    <input
                        type="checkbox"
                        // value=""
                        {...register('houseCall')}
                    />
                    <span>Выезд на дом</span>
                </label>
            </div>
        </div>
    );
};
