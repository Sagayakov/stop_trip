import { UseFormRegister } from 'react-hook-form';
import { UniversalRadioGroup } from '../../../entities/universalDropdown/UniversalRadioGroup';
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
            <UniversalRadioGroup
                name="announcementJob.duration"
                radioValues={durationValues}
                register={register}
            />
            <div className="ann-field-err"></div>
        </div>
    );
};
