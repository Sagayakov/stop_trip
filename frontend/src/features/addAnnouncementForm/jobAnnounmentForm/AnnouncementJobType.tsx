import { UseFormRegister } from 'react-hook-form';
import { FormAddAnn } from '../../../pages/addAnnouncement/libr/AnnouncementFormTypes';
import { jobValues } from './libr/jobValues';

interface Props {
    register: UseFormRegister<FormAddAnn>;
}

export const AnnouncementJobType = ({ register }: Props) => {
    const jobTypeValues = jobValues.jobType;

    return (
        <div className="ann-field">
            <h3>Тип работы:</h3>
            <div className="radio-group">
                {jobTypeValues.map((el) => (
                    <label className="form-checkbox" key={el}>
                        <input type="radio" value={el} {...register('announcementJob.jobType')} />
                        <span>{el}</span>
                    </label>
                ))}
            </div>
            <div className="ann-field-err"></div>
        </div>
    );
};
