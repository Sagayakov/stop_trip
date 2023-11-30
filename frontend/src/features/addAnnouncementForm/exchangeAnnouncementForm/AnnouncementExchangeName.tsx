import { UniversalSelectDropdown } from '../../../entities/universalDropdown/UniversalSelectDropdown';
import { Control, UseFormSetValue } from 'react-hook-form';
import { FormAddAnn } from '../../../pages/addAnnouncement/libr/AnnouncementFormTypes';
import { exchangeValues } from './libr/exchangeValues';

interface Props {
    setValue: UseFormSetValue<FormAddAnn>;
    control: Control<FormAddAnn, string[]>;
}

export const AnnouncementExchangeName = ({ setValue, control }: Props) => {
    const exchangeNameValues = exchangeValues.name;

    return (
        <div className="ann-field">
            <h3>Предлагаемая валюта:</h3>
            <UniversalSelectDropdown
                closeMenuOnSelect={true}
                control={control}
                isMulti={false}
                name="announcementExchange.name"
                options={exchangeNameValues}
                placeholder="Предлагаемая валюта"
                prefix="filterAnnouncementCategory"
                setValue={setValue}
            />
            <div className="ann-field-err"></div>
        </div>
    );
};
