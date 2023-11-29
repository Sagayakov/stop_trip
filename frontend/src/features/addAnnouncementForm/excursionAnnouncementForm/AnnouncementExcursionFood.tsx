import { UseFormRegister } from 'react-hook-form';
import { FormAddAnn } from '../../../pages/addAnnouncement/libr/AnnouncementFormTypes';

interface Props {
    register: UseFormRegister<FormAddAnn>;
}

export const AnnouncementExcursionFood = ({ register }: Props) => {
    return (
        <div className="ann-field">
            <h3>Включена еда:</h3>
            <label>
                <input
                    type="checkbox"
                    {...register('announcementExcursion.food')}
                    style={{ display: 'none' }}
                />
                <span>Включена еда</span>
            </label>
            <div className="ann-field-err"></div>
        </div>
    );
};
