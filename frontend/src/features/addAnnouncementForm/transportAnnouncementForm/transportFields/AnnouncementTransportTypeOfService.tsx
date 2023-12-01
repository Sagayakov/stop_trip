import { UseFormRegister } from 'react-hook-form';
import { UniversalRadioGroup } from '../../../../entities/universalDropdown/UniversalRadioGroup';
import { FormAddAnn } from '../../../../pages/addAnnouncement/libr/AnnouncementFormTypes';

interface Props {
    register: UseFormRegister<FormAddAnn>;
}
export const AnnouncementTransportTypeOfService = ({ register }: Props) => {
    const radioValues = ['Аренда', 'Продажа'];
    return (
        <div className="ann-field">
            <h3>Тип услуги</h3>
            <UniversalRadioGroup
                register={register}
                name="transportTypeOfService"
                radioValues={radioValues}
            />
            <div className="ann-field-err"></div>
        </div>
    );
};
