import { FormAddAnn } from '../../../pages/addAnnouncement/libr/AnnouncementFormTypes';
import { UseFormRegister } from 'react-hook-form';

interface Props {
    register: UseFormRegister<FormAddAnn>;
}

export const AnnouncementFoodEsteblishment = ({ register }: Props) => {
    return (
        <div className="ann-field ann-food">
            <h3>Ресторан/кафе:</h3>
            <label className="form-checkbox">
                <input type="checkbox" {...register('food_establishment')} />
                <span>Ресторан/кафе</span>
            </label>
            <div className="ann-field-err"></div>
        </div>
    );
};
