import { UseFormRegister } from 'react-hook-form';
import { TypeSettingAdverts } from '../../widgets/settingForm/TypeSettingAdverts';

interface Props {
    register: UseFormRegister<TypeSettingAdverts>;
}

export const RoomsQuantity = ({ register }: Props) => {
    return (
        <div className="rooms-quantity">
            <h3>Количество комнат</h3>
            <div className="setting-rooms-quantity">
                <label className="form-checkbox">
                    <input
                        type="checkbox"
                        id="setting-rooms-quantity-1"
                        value="1"
                        {...register('roomsQuantity')}
                    />
                    <span>1</span>
                </label>
                <label className="form-checkbox">
                    <input
                        type="checkbox"
                        id="setting-rooms-quantity-2"
                        value="2"
                        {...register('roomsQuantity')}
                    />
                    <span>2</span>
                </label>
                <label className="form-checkbox">
                    <input
                        type="checkbox"
                        id="setting-rooms-quantity-3"
                        value="3"
                        {...register('roomsQuantity')}
                    />
                    <span>3</span>
                </label>
                <label className="form-checkbox">
                    <input
                        type="checkbox"
                        id="setting-rooms-quantity-4"
                        value="4"
                        {...register('roomsQuantity')}
                    />
                    <span>4</span>
                </label>
            </div>
        </div>
    );
};
