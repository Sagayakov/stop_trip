import { Control, UseFormSetValue } from 'react-hook-form';
import { UniversalSelectDropdown } from 'entities/universalEntites/UniversalSelectDropdown';
import { FormAddAnn } from '../../../pages/addAnnouncement/libr/AnnouncementFormTypes';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss'
interface Props {
    setValue: UseFormSetValue<FormAddAnn>;
    control: Control<FormAddAnn, string[]>;
    defaultValue?: string | null | undefined;
}

export const AnnouncementExchangeName = ({ setValue, control, defaultValue }: Props) => {
    const { t } = useTranslation();

    const exchangeNameValues = [
        { label: 'Доллар', value: 'USD' },
        { label: 'Рубль', value: 'RUB' },
        { label: 'Рупий', value: 'Рупий' },
        { label: 'Евро', value: 'EUR' },
    ];
    const getDefaultValue = () => {
        if(defaultValue){
            return exchangeNameValues.find((el) => el.value === defaultValue)
        }
    }

    return (
        <div className={styles.ann_field}>
            <h3>{t('filters.proposed_currency')}:</h3>
            <UniversalSelectDropdown
                closeMenuOnSelect={true}
                control={control}
                isMulti={false}
                name="proposed_currency"
                options={exchangeNameValues}
                placeholder={t('filters.proposed_currency')}
                defaultValue={getDefaultValue()}
                prefix="filterAnnouncementCategory"
                setValue={setValue}
            />
            <div className={styles.ann_field_err}></div>
        </div>
    );
};
