import { UseFormRegister } from 'react-hook-form';
import { FormAddAnn } from '../../../../pages/addAnnouncement/libr/AnnouncementFormTypes';

interface Props {
    register: UseFormRegister<FormAddAnn>;
}
export const AnnouncementTransportEngineCapacity = ({ register }: Props) => {
    return (
        <div className="ann-field">
            <h3>Объем двигателя</h3>
            <div className="inputNumber-group">
                <input
                    type="text"
                    pattern="[0-9]*[.,]?[0-9]+"
                    autoComplete="off"
                    {...register('transportEngineСapacity.min')}
                    min="0"
                    placeholder="От"
                />
                <input
                    type="text"
                    pattern="[0-9]*[.,]?[0-9]+"
                    autoComplete="off"
                    {...register('transportEngineСapacity.max')}
                    min="0.5"
                    placeholder="До"
                />
            </div>
            <div className="ann-field-err"></div>
        </div>
    );
};