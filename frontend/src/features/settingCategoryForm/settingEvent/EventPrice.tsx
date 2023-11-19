import { UseFormRegister } from 'react-hook-form';
import { TypeOfEventFilter } from '../../../widgets/settingForm/settingEvent/libr/TypeOfEventFilter';

interface Props {
    register: UseFormRegister<TypeOfEventFilter>;
}
export const EventPrice = ({ register }: Props) => {
    return (
        <div className="eventPrice">
            <h3>Цена</h3>
            <div className="setting-eventPrice">
                <input
                    type="number"
                    min="0"
                    placeholder="От"
                    {...register('price.min')}
                />
                <input
                    type="number"
                    placeholder="До"
                    {...register('price.max')}
                />
            </div>
        </div>
    );
};
