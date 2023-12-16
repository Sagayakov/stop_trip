import { Control, UseFormSetValue } from 'react-hook-form';
import { UniversalSelectDropdown } from 'entities/universalEntites/UniversalSelectDropdown';
import { FormAddAnn } from '../../../pages/addAnnouncement/libr/AnnouncementFormTypes';
import { useTranslation } from 'react-i18next';

interface Props {
    setValue: UseFormSetValue<FormAddAnn>;
    control: Control<FormAddAnn, string[]>;
}

export const AnnouncementExchangeName = ({ setValue, control }: Props) => {
    const { t } = useTranslation();

    const exchangeNameValues = [
        { label: 'Доллар', value: 'USD' },
        { label: 'Рубль', value: 'RUB' },
        { label: 'Рупий', value: 'Рупий' },
        { label: 'Евро', value: 'EUR' },
    ];

    return (
        <div className="ann-field">
            <h3>{t('filters.proposed_currency')}:</h3>
            <UniversalSelectDropdown
                closeMenuOnSelect={true}
                control={control}
                isMulti={false}
                name="proposed_currency"
                options={exchangeNameValues}
                placeholder={t('filters.proposed_currency')}
                prefix="filterAnnouncementCategory"
                setValue={setValue}
            />
            <div className="ann-field-err"></div>
        </div>
    );
};
