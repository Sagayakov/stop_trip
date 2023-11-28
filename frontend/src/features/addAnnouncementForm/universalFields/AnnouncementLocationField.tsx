import { UseFormRegister } from 'react-hook-form';
import { FormAddAnn } from '../../../pages/addAnnouncement/libr/AnnouncementFormTypes';

interface Props {
    register: UseFormRegister<FormAddAnn>;
}

export const AnnouncementLocationField = ({ register }: Props) => {
    return (
        <div className="ann-field">
            <h3>
                Локация<span>*</span>:
            </h3>
            <div className="ann-field-err"></div>
        </div>
    );
};
