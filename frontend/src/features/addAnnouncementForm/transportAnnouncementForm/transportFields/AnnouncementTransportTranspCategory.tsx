import { Control, FormState, UseFormSetValue } from 'react-hook-form';
import { UniversalSelectDropdown } from 'entity/universalEntites/UniversalSelectDropdown';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss';
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

export const AnnouncementTransportTranspCategory = ({
    setValue,
    control,
    defaultValue,
    formState
}: Props) => {
    const { t } = useTranslation();
    const { data } = useGetSelectOptionsQuery('');

    useEffect(() => {
        if(defaultValue){
            setValue('transport_category', String(getDefaultValue(defaultValue, data?.transport_category as StringOptions[])!.value))
        }//если есть значение по умолчанию, устанавливаем его. Если юзер поменяет выбор, то установится новое значение
    }, []);

    return (
        <div className={styles.ann_field}>
            <h3>{t('filters.transport_category')}<span>*</span>:</h3>
            <UniversalSelectDropdown<FormAddAnn>
                closeMenuOnSelect={true}
                control={control}
                isMulti={false}
                name="transport_category"
                options={data?.transport_category}
                placeholder={t('filters.choose-category')}
                defaultValue={getDefaultValue(defaultValue, data?.transport_category) as StringOptions}
                prefix="filterAnnouncementCategory"
                setValue={setValue}
                requiredFiled={true}
            />
            <div className={styles.ann_field_err}>{formState?.errors?.transport_category?.message}</div>
        </div>
    );
};
