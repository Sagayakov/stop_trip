import { UseFormRegister } from 'react-hook-form';
import { FormAddAnn } from '../../../../pages/addAnnouncement/libr/AnnouncementFormTypes';

interface Props {
    register: UseFormRegister<FormAddAnn>;
}
export const AnnouncementTransportTypeOfTransport = ({ register }: Props) => {
    return (
        <div className="ann-field">
            <h3>Тип транспорта</h3>
            <label>
                <input
                    type="radio"
                    {...register('transportTypeOfTransport')}
                    value="Наземный"
                    style={{ display: 'none' }}
                />
                <span>Наземный</span>
            </label>
            <label>
                <input
                    type="radio"
                    {...register('transportTypeOfTransport')}
                    value="Водный"
                    style={{ display: 'none' }}
                />
                <span>Водный</span>
            </label>
            <div className="ann-field-err"></div>
        </div>
    );
};
