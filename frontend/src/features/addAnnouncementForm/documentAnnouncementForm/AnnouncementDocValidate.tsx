import { Control, UseFormSetValue } from 'react-hook-form';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss';
import { UniversalSelectDropdown } from 'entity/universalEntites/UniversalSelectDropdown.tsx';
import { getDefaultValue } from 'features/addAnnouncementForm/getDefaultValue.ts';
import { useEffect } from 'react';

interface Props {
    setValue: UseFormSetValue<FormAddAnn>;
    control: Control<FormAddAnn, string[]>;
    defaultValue?: string | null | undefined;
}

export const AnnouncementDocValidityPeriod = ({
    control,
    setValue,
    defaultValue,
}: Props) => {
    const { t } = useTranslation();
    const options = [
        { value: 'month', label: 'Месяц' },
        { value: 'quarter', label: 'Квартал' },
        { value: 'year', label: 'Год' },
        { value: 'years_5', label: '5 лет' },
        { value: 'other', label: 'Другое' },
    ];
    useEffect(() => {
        if(defaultValue){
            setValue('document_duration', String(getDefaultValue(defaultValue, options)!.value))
        }//если есть значение по умолчанию, устанавливаем его. Если юзер поменяет выбор, то установится новое значение
    }, []);

    return (
        <div className={styles.ann_field}>
            <h3>{t('filters.document_duration')}:</h3>
            <UniversalSelectDropdown
                setValue={setValue}
                control={control}
                name="document_duration"
                prefix="filterAnnouncementCategory"
                placeholder={t('filters.document_duration')}
                closeMenuOnSelect={true}
                isMulti={false}
                defaultValue={getDefaultValue(defaultValue, options)}
                options={options}
            />
            <div className={styles.ann_field_err}></div>
        </div>
    );
};
