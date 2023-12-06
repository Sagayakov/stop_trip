import { FormAddAnn } from '../../../pages/addAnnouncement/libr/AnnouncementFormTypes';
import { UseFormRegister } from 'react-hook-form';

interface Props {
    register: UseFormRegister<FormAddAnn>;
}

export const AnnouncementEventEnd = ({ register }: Props) => {
    return (
        <div className="ann-field">
            <h3>Дата начала:</h3>
            <input
                type="date"
                {...register('end_date', { required: true })}
            />
            <div className="ann-field-err"></div>
        </div>
    );
};
