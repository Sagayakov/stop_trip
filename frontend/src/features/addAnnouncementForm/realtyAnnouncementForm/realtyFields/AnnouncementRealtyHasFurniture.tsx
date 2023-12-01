import { UseFormRegister } from 'react-hook-form';
import { FormAddAnn } from '../../../../pages/addAnnouncement/libr/AnnouncementFormTypes';

interface Props {
    register: UseFormRegister<FormAddAnn>;
}
export const AnnouncementRealtyHasFurniture = ({ register }: Props) => {
    return (
        <div className="ann-field">
            <h3>С мебелью</h3>
            <div className="radio-group">
                <label>
                    <input
                        type="radio"
                        {...register('HasFurniture')}
                        value="true"
                        style={{ display: 'none' }}
                    />
                    <span>Мебель</span>
                </label>
            </div>
            <div className="ann-field-err"></div>
        </div>
    );
};
