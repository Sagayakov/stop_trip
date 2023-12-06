import { Control, UseFormSetValue } from 'react-hook-form';
import { UniversalSelectDropdown } from '../../../entities/universalDropdown/UniversalSelectDropdown';
import { FormAddAnn } from '../../../pages/addAnnouncement/libr/AnnouncementFormTypes';

interface Props {
    setValue: UseFormSetValue<FormAddAnn>;
    control: Control<FormAddAnn, string[]>;
}

export const AnnouncementExchangeName = ({ setValue, control }: Props) => {
    const exchangeNameValues = [
        { label: 'Доллар', value: 'Доллар' },
        { label: 'Рубль', value: 'Рубль' },
        { label: 'Рупий', value: 'Рупий' },
        { label: 'Евро', value: 'Евро' },
    ];

    return (
        <div className="ann-field">
            <h3>Предлагаемая валюта:</h3>
            <UniversalSelectDropdown
                closeMenuOnSelect={true}
                control={control}
                isMulti={false}
                name="proposed_currency"
                options={exchangeNameValues}
                placeholder="Предлагаемая валюта"
                prefix="filterAnnouncementCategory"
                setValue={setValue}
            />
            <div className="ann-field-err"></div>
        </div>
    );
};
