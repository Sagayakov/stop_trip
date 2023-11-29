import { UseFormRegister } from 'react-hook-form';
import { FormAddAnn } from '../../../pages/addAnnouncement/libr/AnnouncementFormTypes';

interface Props {
    register: UseFormRegister<FormAddAnn>;
}

export const AnnouncementEventOnline = ({ register }: Props) => {
    return (
        <div className="ann-field">
            <h3>Онлайн:</h3>
            <label>
                <input
                    type="checkbox"
                    {...register('announcementEvent.isOnline', {
                        required: true,
                    })}
                />
                <span>Онлайн</span>
            </label>
            <div className="ann-field-err"></div>
        </div>
    );
};
