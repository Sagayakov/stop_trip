import { UseFormRegister } from 'react-hook-form';
import { UniversalRadioGroup } from '../../../entities/universalDropdown/UniversalRadioGroup';
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
            <UniversalRadioGroup
                name="announcementJob.jobType"
                radioValues={jobTypeValues}
                register={register}
            />
            <div className="ann-field-err"></div>
        </div>
    );
};
