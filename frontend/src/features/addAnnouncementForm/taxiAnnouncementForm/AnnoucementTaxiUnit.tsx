import { UseFormRegister } from 'react-hook-form';
import { UniversalRadioGroup } from '../../../entities/universalDropdown/UniversalRadioGroup';
import { FormAddAnn } from '../../../pages/addAnnouncement/libr/AnnouncementFormTypes';

interface Props {
    register: UseFormRegister<FormAddAnn>;
}

export const AnnouncementTaxiUnit = ({ register }: Props) => {
    const valuesOfTaxiUnit = [{label: 'Маршрут', value: 'Маршрут'},{label: 'Час', value: 'Час'},{label: 'Км', value: 'Км'}];

    return (
        <div className="ann-field">
            <h3>Единица измерения:</h3>
            <UniversalRadioGroup
                register={register}
                name="taxi_unit"
                radioValues={valuesOfTaxiUnit}
            />
            <div className="ann-field-err"></div>
        </div>
    );
};
