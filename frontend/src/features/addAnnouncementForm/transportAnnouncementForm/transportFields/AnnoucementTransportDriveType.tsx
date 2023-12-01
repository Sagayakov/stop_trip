import { UseFormRegister } from 'react-hook-form';
import { UniversalRadioGroup } from '../../../../entities/universalDropdown/UniversalRadioGroup';
import { FormAddAnn } from '../../../../pages/addAnnouncement/libr/AnnouncementFormTypes';
import { valuesOfTransportForm } from '../../../../widgets/settingForm/settingTransport/libr/valuesOfTransportForm';

interface Props {
    register: UseFormRegister<FormAddAnn>;
}

export const AnnoucementTransportDriveType = ({ register }: Props) => {
    const driveValue = valuesOfTransportForm.drive;
    return (
        <div className="ann-field">
            <h3>Привод</h3>
            <UniversalRadioGroup
                register={register}
                name="transportDrive"
                radioValues={driveValue}
            />
            <div className="ann-field-err"></div>
        </div>
    );
};
