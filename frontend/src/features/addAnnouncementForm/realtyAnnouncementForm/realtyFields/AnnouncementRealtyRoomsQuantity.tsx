import { UseFormRegister } from 'react-hook-form';
import { FormAddAnn } from '../../../../pages/addAnnouncement/libr/AnnouncementFormTypes';
import { valuesOfPropertyForm } from '../../../../widgets/settingForm/settingRealty/libr/valuesOfPropertyForm';
import { UniversalRadioGroup } from '../../../../entities/universalDropdown/UniversalRadioGroup';

interface Props {
    register: UseFormRegister<FormAddAnn>;
}

export const AnnouncementRealtyRoomsQuantity = ({ register }: Props) => {
    const optionValues = valuesOfPropertyForm.roomsQuantity
    return (
        <div className="ann-field">
            <h3>Количество комнат</h3>
            <div className="radio-group">
                <UniversalRadioGroup radioValues={optionValues} name='RoomsQuantity' register={register} />
            </div>
            <div className="ann-field-err"></div>
        </div>
    );
};
