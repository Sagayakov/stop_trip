import { FormState, UseFormRegister } from 'react-hook-form';
import { UniversalRadioGroup } from 'entity/universalEntites/UniversalRadioGroup';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss';
import { useGetSelectOptionsQuery } from 'app/api/fetchAdverts.ts';
import { useAppSelector } from 'app/store/hooks';

interface Props {
    register: UseFormRegister<FormAddAnn>;
    defaultValue?: string | null | undefined;
    formState: FormState<FormAddAnn>;
}

export const AnnouncementJobDuration = ({
    register,
    defaultValue,
    formState,
}: Props) => {
    const { t } = useTranslation();
    const { data } = useGetSelectOptionsQuery('');
    const lang = useAppSelector((state) => state.setLang.lang);

    const getDefaultValue = () => {
        if (defaultValue) {
            return data?.job_duration.find((el) => el.value === defaultValue);
        }
    };

    return (
        <div className={styles.ann_field}>
            <h3>{t('filters.job_duration')}:</h3>
            {data && (
                <UniversalRadioGroup
                    name="job_duration"
                    radioValues={
                        lang === 'ru'
                            ? data.job_duration
                            : data.job_duration.map((el) => ({
                                  value: el.value,
                                  label: `${el.value[0].toUpperCase()}${el.value.slice(
                                      1
                                  )}`,
                              }))
                    }
                    defaultValue={getDefaultValue()}
                    register={register}
                    className={styles.radio_group}
                />
            )}
            <div className={styles.ann_field_err}>
                {formState?.errors?.job_duration?.message}
            </div>
        </div>
    );
};
