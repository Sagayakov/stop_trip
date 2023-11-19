import { UseFormRegister } from 'react-hook-form';
import { TypeOfEventFilter } from '../../../widgets/settingForm/settingEvent/libr/TypeOfEventFilter';

interface Props {
    register: UseFormRegister<TypeOfEventFilter>;
}
export const DateOfStartEvent = ({ register }: Props) => {
    return (
        <div className="dateOfStartEvent">
            <h3>Начало</h3>
            <div className="setting-dateOfStartEvent">
                <span>Дата:</span>
                <input
                    type="date"
                    placeholder="Дата начала"
                    {...register('start.date')}
                />
                <span>Время:</span>
                <input
                    type="time"
                    placeholder="Время начала"
                    {...register('start.time')}
                />
            </div>
        </div>
    );
};
