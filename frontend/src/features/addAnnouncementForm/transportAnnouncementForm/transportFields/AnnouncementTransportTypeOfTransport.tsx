import { UseFormRegister } from 'react-hook-form';
import { UniversalRadioGroup } from '../../../../entities/universalDropdown/UniversalRadioGroup';
import { FormAddAnn } from '../../../../pages/addAnnouncement/libr/AnnouncementFormTypes';

interface Props {
    register: UseFormRegister<FormAddAnn>;
}
export const AnnouncementTransportTypeOfTransport = ({ register }: Props) => {
    const values = [
        { label: 'Наземный', value: 'Наземный' },
        { label: 'Водный', value: 'Водный' },
    ];
    return (
        <div className="ann-field">
            <h3>Тип транспорта</h3>
            <UniversalRadioGroup
                name="transport_type"
                radioValues={values}
                register={register}
            />
            <div className="ann-field-err"></div>
        </div>
    );
};
