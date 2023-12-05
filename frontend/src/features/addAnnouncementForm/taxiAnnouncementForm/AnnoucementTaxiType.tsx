import { Control, UseFormSetValue } from 'react-hook-form';
import { UniversalSelectDropdown } from '../../../entities/universalDropdown/UniversalSelectDropdown';
import { FormAddAnn } from '../../../pages/addAnnouncement/libr/AnnouncementFormTypes';
import { taxiValues } from './taxiValues';

interface Props {
    setValue: UseFormSetValue<FormAddAnn>;
    control: Control<FormAddAnn, string[]>;
}
export const AnnouncementTaxiType = ({ control, setValue }: Props) => {
    const valuesOfTaxiType = taxiValues.valuesofTaxiType;

    return (
        <div className="ann-field">
            <h3>Вид такси:</h3>
            <UniversalSelectDropdown
                closeMenuOnSelect={true}
                control={control}
                isMulti={false}
                name="taxi_type"
                placeholder="Вид такси"
                options={valuesOfTaxiType}
                prefix="filterAnnouncementCategory"
                setValue={setValue}
            />
            <div className="ann-field-err"></div>
        </div>
    );
};
