import { UseFormRegister } from 'react-hook-form';
import { UniversalRadioGroup } from '../../../entities/universalDropdown/UniversalRadioGroup';
import { FormAddAnn } from '../../../pages/addAnnouncement/libr/AnnouncementFormTypes';

interface Props {
    register: UseFormRegister<FormAddAnn>;
}

export const AnnouncementJobType = ({ register }: Props) => {
    const jobTypeValues = [
        { label: 'Полный день', value: 'Полный день' },
        { label: 'Неполный день', value: 'Неполный день' },
    ];

    return (
        <div className="ann-field">
            <h3>Тип работы:</h3>
            <UniversalRadioGroup
                name="job_type"
                radioValues={jobTypeValues}
                register={register}
            />
            <div className="ann-field-err"></div>
        </div>
    );
};
