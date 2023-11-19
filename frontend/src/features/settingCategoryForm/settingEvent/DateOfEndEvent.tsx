import { UseFormRegister } from 'react-hook-form';
import { TypeOfEventFilter } from '../../../widgets/settingForm/settingEvent/libr/TypeOfEventFilter';

interface Props {
    register: UseFormRegister<TypeOfEventFilter>;
}
export const DateOfEndEvent = ({ register }: Props) => {
    return (
        <div className="dateOfEndEvent">
            <h3>Окончание</h3>
            <div className="setting-dateOfEndEvent">
                <span>Дата:</span>
                <input
                    type="date"
                    placeholder="Дата окончания"
                    {...register('end.date')}
                />
                <span>Время:</span>
                <input
                    type="time"
                    placeholder="Время окончания"
                    {...register('end.time')}
                />
            </div>
        </div>
    );
};
