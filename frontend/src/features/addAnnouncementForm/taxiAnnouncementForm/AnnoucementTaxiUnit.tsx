import { UseFormRegister } from 'react-hook-form';
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
            <div className="radio-group">
                {valuesOfTaxiUnit.map((el) => (
                    <label className="form-checkbox" key={el}>
                        <input
                            type="radio"
                            value={el}
                            {...register('annoucementTaxi.unit')}
                        />
                        <span>{el}</span>
                    </label>
                ))}
            </div>
            <div className="ann-field-err"></div>
        </div>
    );
};
