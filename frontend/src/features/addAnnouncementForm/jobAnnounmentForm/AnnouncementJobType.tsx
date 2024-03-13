import { FormState, UseFormRegister } from 'react-hook-form';
import { UniversalRadioGroup } from 'entity/universalEntites/UniversalRadioGroup';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss';
import { useGetSelectOptionsQuery } from 'app/api/fetchAdverts.ts';

interface Props {
    register: UseFormRegister<FormAddAnn>;
    defaultValue?: string | null | undefined;
    formState: FormState<FormAddAnn>;
}

export const AnnouncementJobType = ({
    register,
    defaultValue,
    formState,
}: Props) => {
    const { t } = useTranslation();
    const { data } = useGetSelectOptionsQuery('');

    const getDefaultValue = () => {
        if (defaultValue) {
            return data?.job_type.find((el) => el.value === defaultValue);
        }
    };

    return (
        <div className={styles.ann_field}>
            <h3>
                {t('filters.job_type')}
                <span>*</span>:
            </h3>
            {data && (
                <UniversalRadioGroup
                    name="job_type"
                    radioValues={data.job_type}
                    defaultValue={getDefaultValue()}
                    register={register}
                    className={styles.radio_group}
                    requiredField={true}
                />
            )}
            <div className={styles.ann_field_err}>
                {formState?.errors?.job_type?.message}
            </div>
        </div>
    );
};
