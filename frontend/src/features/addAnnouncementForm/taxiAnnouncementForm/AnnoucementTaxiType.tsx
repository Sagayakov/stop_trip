import { Control, UseFormSetValue } from 'react-hook-form';
import { UniversalSelectDropdown } from 'entity/universalEntites/UniversalSelectDropdown';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { taxiValues } from './taxiValues';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss';
import { useEffect } from 'react';

interface Props {
    setValue: UseFormSetValue<FormAddAnn>;
    control: Control<FormAddAnn, string[]>;
    defaultValue?: string | null;
}
export const AnnouncementTaxiType = ({
    control,
    setValue,
    defaultValue,
}: Props) => {
    const valuesOfTaxiType = taxiValues.valuesofTaxiType;
    const { t } = useTranslation();

    const getDefaultValue = () => {
        if (defaultValue) {
            return valuesOfTaxiType.find((el) => el.value === defaultValue);
        }
    };
    useEffect(() => {
        if (defaultValue) {
            setValue('taxi_type', getDefaultValue()!.value);
        } //если есть значение по умолчанию, устанавливаем его. Если юзер поменяет выбор, то установится новое значение
    }, []);

    return (
        <div className={styles.ann_field}>
            <h3>{t('filters.taxi_type')}:</h3>
            <UniversalSelectDropdown
                closeMenuOnSelect={true}
                control={control}
                isMulti={false}
                name="taxi_type"
                placeholder={t('filters.taxi_type')}
                options={valuesOfTaxiType}
                defaultValue={getDefaultValue()}
                prefix="filterAnnouncementCategory"
                setValue={setValue}
            />
            <div className={styles.ann_field_err}></div>
        </div>
    );
};
