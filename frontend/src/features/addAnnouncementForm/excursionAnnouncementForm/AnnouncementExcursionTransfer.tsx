import { UseFormRegister } from 'react-hook-form';
import { FormAddAnn } from '../../../pages/addAnnouncement/libr/AnnouncementFormTypes';

interface Props {
    register: UseFormRegister<FormAddAnn>;
}

export const AnnouncementExcursionTransfer = ({ register }: Props) => {
    return (
        <div className="ann-field">
            <h3>Трансфер:</h3>
            <label>
                <input
                    type="checkbox"
                    {...register('excursion_transfer')}
                    style={{ display: 'none' }}
                />
                <span>Трансфер</span>
            </label>
            <div className="ann-field-err"></div>
        </div>
    );
};
