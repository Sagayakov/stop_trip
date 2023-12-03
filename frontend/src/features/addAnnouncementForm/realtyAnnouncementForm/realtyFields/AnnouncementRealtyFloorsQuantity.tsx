import { UseFormRegister } from 'react-hook-form';
import { FormAddAnn } from '../../../../pages/addAnnouncement/libr/AnnouncementFormTypes';

interface Props {
    register: UseFormRegister<FormAddAnn>;
}
export const AnnouncementRealtyFloorsQuantity = ({ register }: Props) => {
    return (
        <div className="ann-field">
            <h3>Количество этажей в доме</h3>
            <div className="inputNumber-group">
                <input
                    type="text"
                    pattern="[0-9]*[.,]?[0-9]+"
                    autoComplete="off"
                    min={0}
                    placeholder="Количество этажей"
                    {...register('property_building_max_floor')}
                />
            </div>
            <div className="ann-field-err"></div>
        </div>
    );
};
