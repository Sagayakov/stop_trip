import { UseFormRegister } from 'react-hook-form';
import { FormAddAnn } from '../../../pages/addAnnouncement/libr/AnnouncementFormTypes';
import { conditionValues } from './libr/conditionValues';

interface Props {
    register: UseFormRegister<FormAddAnn>;
}

export const AnnouncementMarketCondition = ({ register }: Props) => {
    return (
        <div className="ann-field">
            <h3>Состояние:</h3>
            <div className="radio-group">
                {conditionValues.map((el) => (
                    <label className="form-checkbox" key={el}>
                        <input
                            type="radio"
                            value={el}
                            {...register('announcementJob.duration')}
                        />
                        <span>{el}</span>
                    </label>
                ))}
            </div>
            <div className="ann-field-err"></div>
        </div>
    );
};
