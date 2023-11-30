import { UseFormRegister } from 'react-hook-form';
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
            <div className="radio-group">
                {conditionValue.map((el) => (
                    <label className="form-checkbox" key={el}>
                        <input
                            type="radio"
                            value={el}
                            {...register('transportCondition')}
                        />
                        <span>{el}</span>
                    </label>
                ))}
            </div>
            <div className="ann-field-err"></div>
        </div>
    );
};
