import { UseFormRegister } from 'react-hook-form';
import { UniversalRadioGroup } from '../../../../entities/universalDropdown/UniversalRadioGroup';
import { FormAddAnn } from '../../../../pages/addAnnouncement/libr/AnnouncementFormTypes';

interface Props {
    register: UseFormRegister<FormAddAnn>;
}

export const AnnouncementRealtyBalcony = ({ register }: Props) => {
    const optionValues = [
        { label: 'Лоджия', value: 'Лоджия' },
        { label: 'Нет', value: 'Нет' },
        { label: 'Есть', value: 'Есть' },
    ];
    return (
        <div className="ann-field">
            <h3>Балкон</h3>
            <UniversalRadioGroup
                name="property_balcony"
                radioValues={optionValues}
                register={register}
            />
            <div className="ann-field-err"></div>
        </div>
    );
};
