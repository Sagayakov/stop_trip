import { Control, FormState, UseFormSetValue } from 'react-hook-form';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss';
import { UniversalSelectDropdown } from 'entity/universalEntites/UniversalSelectDropdown.tsx';
import { getDefaultValue } from 'features/addAnnouncementForm/getDefaultValue.ts';
import { useEffect } from 'react';
import { useGetSelectOptionsQuery } from 'app/api/fetchAdverts.ts';
import { StringOptions } from 'app/api/types/selectOptionValues.ts';

interface Props {
    setValue: UseFormSetValue<FormAddAnn>;
    control: Control<FormAddAnn, string[]>;
    defaultValue?: string | null | undefined;
    formState: FormState<FormAddAnn>;
}

export const AnnouncementDocValidityPeriod = ({
    control,
    setValue,
    defaultValue,
    formState
}: Props) => {
    const { t } = useTranslation();
    const { data } = useGetSelectOptionsQuery('');

    useEffect(() => {
        if(defaultValue){
            setValue('document_duration', String(
                getDefaultValue(
                    defaultValue,
                    data?.document_duration)!.value
                )
            )
        }//если есть значение по умолчанию, устанавливаем его. Если юзер поменяет выбор, то установится новое значение
    }, []);

    return (
        <div className={styles.ann_field}>
            <h3>{t('filters.document_duration')}<span>*</span>:</h3>
            <UniversalSelectDropdown
                setValue={setValue}
                control={control}
                name="document_duration"
                prefix="filterAnnouncementCategory"
                placeholder={t('filters.document_duration')}
                closeMenuOnSelect={true}
                isMulti={false}
                defaultValue={getDefaultValue(defaultValue, data?.document_duration) as StringOptions}
                options={data?.document_duration}
                requiredFiled={true}
            />
            <div className={styles.ann_field_err}>{formState?.errors?.document_duration?.message}</div>
        </div>
    );
};
