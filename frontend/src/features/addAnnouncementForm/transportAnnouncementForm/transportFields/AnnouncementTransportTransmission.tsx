import { UseFormRegister } from 'react-hook-form';
import { UniversalRadioGroup } from '../../../../entities/universalDropdown/UniversalRadioGroup';
import { FormAddAnn } from '../../../../pages/addAnnouncement/libr/AnnouncementFormTypes';
import { valuesOfTransportForm } from '../../../../widgets/settingForm/settingTransport/libr/valuesOfTransportForm';

interface Props {
    register: UseFormRegister<FormAddAnn>;
}

export const AnnouncementTransportTransmission = ({ register }: Props) => {
    const transmissionValues = valuesOfTransportForm.transmissionType;
    return (
        <div className="ann-field">
            <h3>Коробка передач</h3>
            <UniversalRadioGroup
                register={register}
                name="transportTransmissionType"
                radioValues={transmissionValues}
            />
            <div className="ann-field-err"></div>
        </div>
    );
};
