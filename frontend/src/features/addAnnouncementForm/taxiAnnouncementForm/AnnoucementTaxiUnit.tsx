import { UseFormRegister } from 'react-hook-form';
import { UniversalRadioGroup } from '../../../entities/universalDropdown/UniversalRadioGroup';
import { FormAddAnn } from '../../../pages/addAnnouncement/libr/AnnouncementFormTypes';
import { taxiValues } from './taxiValues';

interface Props {
    register: UseFormRegister<FormAddAnn>;
}

export const AnnouncementTaxiUnit = ({ register }: Props) => {
    const valuesOfTaxiUnit = taxiValues.valuesOfTaxiUnit;

    return (
        <div className="ann-field">
            <h3>Единица измерения:</h3>
            <UniversalRadioGroup
                register={register}
                name="annoucementTaxi.unit"
                radioValues={valuesOfTaxiUnit}
            />
            <div className="ann-field-err"></div>
        </div>
    );
};
