import { UseFormRegister } from 'react-hook-form';
import { UniversalRadioGroup } from 'entities/universalEntites/UniversalRadioGroup';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { useTranslation } from 'react-i18next';

interface Props {
    register: UseFormRegister<FormAddAnn>;
}

export const AnnouncementJobType = ({ register }: Props) => {
    const { t } = useTranslation();

    const jobTypeValues = [
        { label: 'Полный день', value: 'full_time' },
        { label: 'Неполный день', value: 'part_time' },
    ];

    return (
        <div className="ann-field">
            <h3>{t('filters.job_type')}:</h3>
            <UniversalRadioGroup
                name="job_type"
                radioValues={jobTypeValues}
                register={register}
            />
            <div className="ann-field-err"></div>
        </div>
    );
};
