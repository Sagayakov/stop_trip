import { UseFormRegister } from 'react-hook-form';
import { FormAddAnn } from '../../../pages/addAnnouncement/libr/AnnouncementFormTypes';
import { jobValues } from './libr/jobValues';

interface Props {
    register: UseFormRegister<FormAddAnn>;
}

export const AnnouncementJobDuration = ({ register }: Props) => {
    const durationValues = jobValues.duration;

    return (
        <div className="ann-field">
            <h3>Продолжительность работы:</h3>
            <div className="radio-group">
                {durationValues.map((el) => (
                    <label className="form-checkbox" key={el}>
                        <input
                            type="radio"
                            value={el}
                            {...register('announcementJob.duration')}
                        />
                        <span>{el}</span>
                    </label>
                ))}
            </div>
            <div className="ann-field-err"></div>
        </div>
    );
};
