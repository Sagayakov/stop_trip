import { FormState, UseFormRegister } from 'react-hook-form';
import { UniversalRadioGroup } from 'entity/universalEntites/UniversalRadioGroup';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss';
import { categorySubTypesDictionary } from 'shared/const/categorySubTypesDictionary.ts';

interface Props {
    register: UseFormRegister<FormAddAnn>;
    defaultValue?: null | keyof typeof categorySubTypesDictionary;
    formState: FormState<FormAddAnn>;
}

export const AnnouncementJobType = ({ register, defaultValue, formState }: Props) => {
    const { t } = useTranslation();

    const jobTypeValues = [
        { label: 'Полный день', value: 'full_time' },
        { label: 'Неполный день', value: 'part_time' },
    ];

    const getDefaultValue = () => {
        if (defaultValue) {
            return jobTypeValues.find((el) => el.value === defaultValue);
        }
    };

    return (
        <div className={styles.ann_field}>
            <h3>{t('filters.job_type')}<span>*</span>:</h3>
            <UniversalRadioGroup
                name="job_type"
                radioValues={jobTypeValues}
                defaultValue={getDefaultValue()}
                register={register}
                className={styles.radio_group}
                requiredField={true}
            />
            <div className={styles.ann_field_err}>{formState?.errors?.job_type?.message}</div>
        </div>
    );
};
