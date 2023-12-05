import { UseFormRegister } from 'react-hook-form';
import { UniversalRadioGroup } from '../../../entities/universalDropdown/UniversalRadioGroup';
import { FormAddAnn } from '../../../pages/addAnnouncement/libr/AnnouncementFormTypes';

interface Props {
    register: UseFormRegister<FormAddAnn>;
}

export const AnnouncementJobDuration = ({ register }: Props) => {
    const durationValues = [
        { label: 'Разовое задание', value: 'Разовое задание' },
        { label: 'Временная работа', value: 'Временная работа' },
        { label: 'Постоянная работа', value: 'Постоянная работа' },
        { label: 'Другое', value: 'Другое' },
    ];

    return (
        <div className="ann-field">
            <h3>Продолжительность работы:</h3>
            <UniversalRadioGroup
                name="job_duration"
                radioValues={durationValues}
                register={register}
            />
            <div className="ann-field-err"></div>
        </div>
    );
};
