import { UseFormRegister } from 'react-hook-form';
import { UniversalRadioGroup } from '../../../entities/universalDropdown/UniversalRadioGroup';
import { FormAddAnn } from '../../../pages/addAnnouncement/libr/AnnouncementFormTypes';
import { useTranslation } from 'react-i18next';

interface Props {
    register: UseFormRegister<FormAddAnn>;
}

export const AnnouncementJobDuration = ({ register }: Props) => {
    const { t } = useTranslation();

    const durationValues = [
        { label: 'Разовое задание', value: 'one_time_task' },
        { label: 'Временная работа', value: 'temporary' },
        { label: 'Постоянная работа', value: 'permanent' },
        { label: 'Другое', value: 'other' },
    ];

    return (
        <div className="ann-field">
            <h3>{t('filters.job_duration')}:</h3>
            <UniversalRadioGroup
                name="job_duration"
                radioValues={durationValues}
                register={register}
            />
            <div className="ann-field-err"></div>
        </div>
    );
};
