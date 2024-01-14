import { Control, UseFormSetValue } from 'react-hook-form';
import { UniversalSelectDropdown } from 'entities/universalEntites/UniversalSelectDropdown';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { valuesOfTransportForm } from 'widgets/settingForm/settingTransport/libr/valuesOfTransportForm.ts';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss'
import { getDefaultValue } from 'features/addAnnouncementForm/getDefaultValue.ts';
import { useEffect } from 'react';

interface Props {
    setValue: UseFormSetValue<FormAddAnn>;
    control: Control<FormAddAnn, string[]>;
    defaultValue?: string | null | undefined;
}

export const AnnouncementTransportTranspCategory = ({
    setValue,
    control,
    defaultValue
}: Props) => {
    const { t } = useTranslation();

    const optionValues = valuesOfTransportForm.transport_category;

    useEffect(() => {
        if(defaultValue){
            setValue('transport_category', String(getDefaultValue(defaultValue, optionValues)!.value))
        }//если есть значение по умолчанию, устанавливаем его. Если юзер поменяет выбор, то установится новое значение
    }, []);

    return (
        <div className={styles.ann_field}>
            <h3>{t('filters.transport_category')}</h3>
            <UniversalSelectDropdown<FormAddAnn>
                closeMenuOnSelect={true}
                control={control}
                isMulti={false}
                name="transport_category"
                options={optionValues}
                placeholder={t('filters.choose-category')}
                defaultValue={getDefaultValue(defaultValue, optionValues)}
                prefix="filterAnnouncementCategory"
                setValue={setValue}
            />
            <div className={styles.ann_field_err}></div>
        </div>
    );
};
