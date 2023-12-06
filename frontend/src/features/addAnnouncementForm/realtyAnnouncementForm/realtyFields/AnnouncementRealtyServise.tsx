import { UseFormRegister } from 'react-hook-form';
import { UniversalRadioGroup } from '../../../../entities/universalDropdown/UniversalRadioGroup';
import { FormAddAnn } from '../../../../pages/addAnnouncement/libr/AnnouncementFormTypes';

interface Props {
    register: UseFormRegister<FormAddAnn>;
}
export const AnnouncementRealtyServise = ({ register }: Props) => {
    const radioValues = [{label: 'Продажа', value: 'Продажа'}, {label: 'Аренда', value: 'Аренда'}];
    return (
        <div className="ann-field">
            <h3>Тип услуги</h3>
            <UniversalRadioGroup
                name="property_type_of_service"
                radioValues={radioValues}
                register={register}
            />
            <div className="ann-field-err"></div>
        </div>
    );
};
