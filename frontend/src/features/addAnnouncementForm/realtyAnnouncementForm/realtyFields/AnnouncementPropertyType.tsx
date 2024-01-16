import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { getDefaultValue } from 'features/addAnnouncementForm/getDefaultValue.ts';
import { Control, UseFormSetValue } from 'react-hook-form';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss';
import { UniversalSelectDropdown } from 'entities/universalEntites/UniversalSelectDropdown.tsx';

interface Props {
    setValue: UseFormSetValue<FormAddAnn>;
    control: Control<FormAddAnn, string[]>;
    defaultValue?: string | null | undefined;
}

export const AnnouncementPropertyType = ({ setValue, control, defaultValue }: Props) => {
    const { t } = useTranslation();
    const optionValues = [
        {value: 'flat', label: 'Квартира'},
        {value: 'house', label: 'Дом'},
        {value: 'room', label: 'Комната'},
        {value: 'bed_place', label: 'Кровать'},
        {value: 'parking', label: 'Парковочное место'},
        {value: 'commercial', label: 'Коммерческое помещение'},
    ]

    useEffect(() => {
        if(defaultValue){
            setValue('property_house_type', String(getDefaultValue(defaultValue, optionValues)!.value))
        }//если есть значение по умолчанию, устанавливаем его. Если юзер поменяет выбор, то установится новое значение
    }, []);

    return (
        <div className={styles.ann_field}>
            <h3>{t('filters.property-type')}</h3>
            <UniversalSelectDropdown<FormAddAnn>
                closeMenuOnSelect={true}
                control={control}
                isMulti={false}
                name="property_type"
                options={optionValues}
                placeholder={t('filters.property-type')}
                defaultValue={getDefaultValue(defaultValue, optionValues)}
                prefix="filterAnnouncementCategory"
                setValue={setValue}
            />
            <div className={styles.ann_field_err}></div>
        </div>
    );
};