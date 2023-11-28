import { UseFormRegister } from 'react-hook-form';
import { FormAddAnn } from '../../../pages/addAnnouncement/libr/AnnouncementFormTypes';

interface Props {
    register: UseFormRegister<FormAddAnn>;
}

export const AnnouncementNameField = ({ register }: Props) => {
    return (
        <div className="ann-field">
            <h3>
                Название объявления<span>*</span>:
            </h3>
            <input
                type="text"
                maxLength={100}
                placeholder="Название"
                {...register('announcementName')}
            />
            <div className="ann-field-err"></div>
        </div>
    );
};
