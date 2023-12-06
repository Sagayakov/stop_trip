import { UseFormRegister } from 'react-hook-form';
import { FormAddAnn } from '../../../pages/addAnnouncement/libr/AnnouncementFormTypes';

interface Props {
    register: UseFormRegister<FormAddAnn>;
}

export const AnnouncementExchangeRate = ({ register }: Props) => {
    return (
        <div className="ann-field">
            <h3>Курс:</h3>
            <input
                type="text"
                id="ann-field-price"
                placeholder="Курс"
                {...register('exchange_rate', { required: true })}
            />
            <div className="ann-field-err"></div>
        </div>
    );
};
