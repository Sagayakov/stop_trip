import { UseFormRegister } from 'react-hook-form';
import { FormAddAnn } from '../../../pages/addAnnouncement/libr/AnnouncementFormTypes';

interface Props {
    register: UseFormRegister<FormAddAnn>;
}

export const AnnouncementDescriptionField = ({ register }: Props) => {
    return (
        <div className="ann-field">
            <h3>Описание:</h3>
            <textarea placeholder="Описание" maxLength={1000} />
            <div className="ann-field-err"></div>
        </div>
    );
};
