import { UseFormRegister } from 'react-hook-form';
import { FormAddAnn } from '../../../pages/addAnnouncement/libr/AnnouncementFormTypes';

interface Props {
    register: UseFormRegister<FormAddAnn>;
}

export const AnnouncementDocType = ({ register }: Props) => {
    return (
        <div className="ann-field">
            <h3>Тип документа:</h3>
            <input
                type="text"
                minLength={1}
                maxLength={50}
                placeholder="Тип документа"
                {...register('announcementDoc.docType', { required: true })}
            />
            <div className="ann-field-err"></div>
        </div>
    );
};
