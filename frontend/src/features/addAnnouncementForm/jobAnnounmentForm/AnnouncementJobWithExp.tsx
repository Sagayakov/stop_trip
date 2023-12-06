import { UseFormRegister } from 'react-hook-form';
import { FormAddAnn } from '../../../pages/addAnnouncement/libr/AnnouncementFormTypes';

interface Props {
    register: UseFormRegister<FormAddAnn>;
}

export const AnnouncementJobWithExp = ({ register }: Props) => {
    return (
        <div className="ann-field">
            <h3>С опытом:</h3>
            <label>
                <input
                    type="checkbox"
                    {...register('job_experience')}
                    style={{display: 'none'}}
                />
                <span>С опытом</span>
            </label>
            <div className="ann-field-err"></div>
        </div>
    );
};
