import { Control, UseFormSetValue } from 'react-hook-form';
import { UniversalSelectDropdown } from '../../../entities/universalDropdown/UniversalSelectDropdown';
import { FormAddAnn } from '../../../pages/addAnnouncement/libr/AnnouncementFormTypes';
import { exchangeValues } from './libr/exchangeValues';

interface Props {
    setValue: UseFormSetValue<FormAddAnn>;
    control: Control<FormAddAnn, string[]>;
}

export const AnnouncementExchangeFor = ({ setValue, control }: Props) => {
    const exchangeForValues = exchangeValues.exchangeFor;

    return (
        <div className="ann-field">
            <h3>Обмен на:</h3>
            <UniversalSelectDropdown
                closeMenuOnSelect={true}
                control={control}
                isMulti={false}
                name="exchange_for"
                options={exchangeForValues}
                placeholder="Обмен на"
                prefix="filterAnnouncementCategory"
                setValue={setValue}
            />
            <div className="ann-field-err"></div>
        </div>
    );
};
