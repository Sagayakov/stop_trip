import { UseFormRegister } from 'react-hook-form';
import { TypeOfEventFilter } from '../../../widgets/settingForm/settingEvent/libr/TypeOfEventFilter';

interface Props {
    register: UseFormRegister<TypeOfEventFilter>;
}

export const IsOnlineEvent = ({ register }: Props) => {
    return (
        <div className="isOnline">
            {/* <h3>Онлайн</h3> */}
            <div className="setting-isOnline">
                <label className="form-checkbox">
                    <input type="checkbox" {...register('isOnline')} />
                    <span>
                        <b>Онлайн</b>
                    </span>
                </label>
            </div>
        </div>
    );
};
