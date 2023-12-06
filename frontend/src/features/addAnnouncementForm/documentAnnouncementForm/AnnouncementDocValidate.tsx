import { UseFormRegister } from 'react-hook-form';
import { FormAddAnn } from '../../../pages/addAnnouncement/libr/AnnouncementFormTypes';

interface Props {
    register: UseFormRegister<FormAddAnn>;
}

export const AnnouncementDocValidityPeriod = ({ register }: Props) => {
    return (
        <div className="ann-field">
            <h3>Срок действия:</h3>
            <input
                type="text"
                minLength={1}
                maxLength={50}
                placeholder="Срок"
                {...register('document_duration')}
            />
            <div className="ann-field-err"></div>
        </div>
    );
};
