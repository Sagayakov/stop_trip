import { FormState, UseFormRegister } from 'react-hook-form';
import { UniversalRadioGroup } from 'entity/universalEntites/UniversalRadioGroup';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss';

interface Props {
    register: UseFormRegister<FormAddAnn>;
    defaultValue?: string | null | undefined;
    formState: FormState<FormAddAnn>;
}

export const AnnouncementJobDuration = ({ register, defaultValue, formState }: Props) => {
    const { t } = useTranslation();

    const durationValues = [
        { label: 'Разовое задание', value: 'one_time_task' },
        { label: 'Временная работа', value: 'temporary' },
        { label: 'Постоянная работа', value: 'permanent' },
        { label: 'Другое', value: 'other' },
    ];

    const getDefaultValue = () => {
        if (defaultValue) {
            return durationValues.find((el) => el.value === defaultValue);
        }
    };

    return (
        <div className={styles.ann_field}>
            <h3>{t('filters.job_duration')}<span>*</span>:</h3>
            <UniversalRadioGroup
                name="job_duration"
                radioValues={durationValues}
                defaultValue={getDefaultValue()}
                register={register}
                className={styles.radio_group}
                requiredField={true}
            />
            <div className={styles.ann_field_err}>{formState?.errors?.job_duration?.message}</div>
        </div>
    );
};
