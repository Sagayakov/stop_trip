import { UseFormRegister } from 'react-hook-form';
import { FormAddAnn } from '../../../../pages/addAnnouncement/libr/AnnouncementFormTypes';
import { valuesOfPropertyForm } from '../../../../widgets/settingForm/settingRealty/libr/valuesOfPropertyForm';

interface Props {
    register: UseFormRegister<FormAddAnn>;
}

export const AnnouncementRealtyRoomsQuantity = ({ register }: Props) => {
    const optionValues = valuesOfPropertyForm.roomsQuantity
    return (
        <div className="ann-field">
            <h3>Количество комнат</h3>
            <div className="radio-group">
                {optionValues.map((el) => (
                    <label className="form-checkbox" key={el}>
                        <input
                            type="radio"
                            value={el}
                            {...register('RoomsQuantity')}
                        />
                        <span>{el}</span>
                    </label>
                ))}
            </div>
            <div className="ann-field-err"></div>
        </div>
    );
};
