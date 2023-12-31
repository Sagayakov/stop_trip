import { Control, UseFormSetValue } from 'react-hook-form';
import { UniversalSelectDropdown } from 'entities/universalEntites/UniversalSelectDropdown';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { exchangeValues } from './libr/exchangeValues';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss'

interface Props {
    setValue: UseFormSetValue<FormAddAnn>;
    control: Control<FormAddAnn, string[]>;
    defaultValue?: string | null | undefined;
}

export const AnnouncementExchangeFor = ({ setValue, control, defaultValue }: Props) => {
    const exchangeForValues = exchangeValues.exchangeFor;
    const { t } = useTranslation();

    const getDefaultValue = () => {
        if(defaultValue){
            return exchangeForValues.find((el) => el.value === defaultValue)
        }
    }

    return (
        <div className={styles.ann_field}>
            <h3>{t('filters.exchange_for')}:</h3>
            <UniversalSelectDropdown
                closeMenuOnSelect={true}
                control={control}
                isMulti={false}
                name="exchange_for"
                options={exchangeForValues}
                defaultValue={getDefaultValue()}
                placeholder={t('filters.exchange_for')}
                prefix="filterAnnouncementCategory"
                setValue={setValue}
            />
            <div className={styles.ann_field_err}></div>
        </div>
    );
};
