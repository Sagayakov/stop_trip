import { UseFormRegister } from 'react-hook-form';
import { UniversalRadioGroup } from '../../../../entities/universalDropdown/UniversalRadioGroup';
import { FormAddAnn } from '../../../../pages/addAnnouncement/libr/AnnouncementFormTypes';
import { valuesOfTransportForm } from '../../../../widgets/settingForm/settingTransport/libr/valuesOfTransportForm';

interface Props {
    register: UseFormRegister<FormAddAnn>;
}

export const AnnoucementTransportCondition = ({ register }: Props) => {
    const conditionValue = valuesOfTransportForm.condition;
    return (
        <div className="ann-field">
            <h3>Состояние</h3>
            <UniversalRadioGroup
                register={register}
                name="transportCondition"
                radioValues={conditionValue}
            />
            <div className="ann-field-err"></div>
        </div>
    );
};
