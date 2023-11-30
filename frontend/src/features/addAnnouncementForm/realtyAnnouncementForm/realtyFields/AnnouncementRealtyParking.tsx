import { UseFormRegister } from 'react-hook-form';
import { FormAddAnn } from '../../../../pages/addAnnouncement/libr/AnnouncementFormTypes';

interface Props {
    register: UseFormRegister<FormAddAnn>;
}
export const AnnouncementRealtyParking = ({ register }: Props) => {
    return (
        <div className="ann-field">
            <h3>С парковкой</h3>
            <div className="radio-group">
                <label>
                    <input
                        type="radio"
                        {...register('Parking')}
                        value="true"
                        style={{ display: 'none' }}
                    />
                    <span>Парковка</span>
                </label>
            </div>
            <div className="ann-field-err"></div>
        </div>
    );
};
