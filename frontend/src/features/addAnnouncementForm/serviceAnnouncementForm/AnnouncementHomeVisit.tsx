import { FormAddAnn } from '../../../pages/addAnnouncement/libr/AnnouncementFormTypes';
import { UseFormRegister } from 'react-hook-form';

interface Props {
    register: UseFormRegister<FormAddAnn>;
}

export const AnnouncementHomeVisit = ({ register }: Props) => {
    return (
        <div className="ann-field">
            <h3>Выезд на дом:</h3>
            <label>
                <input
                    type="checkbox"
                    {...register('service_home_visit')}
                    style={{display: 'none'}}
                />
                <span>Выезд на дом</span>
            </label>
            <div className="ann-field-err"></div>
        </div>
    );
};
