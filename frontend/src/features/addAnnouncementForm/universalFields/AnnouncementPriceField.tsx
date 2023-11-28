import { UseFormRegister } from 'react-hook-form';
import { FormAddAnn } from '../../../pages/addAnnouncement/libr/AnnouncementFormTypes';

interface Props {
    register: UseFormRegister<FormAddAnn>;
}

export const AnnouncementPriceField = ({ register }: Props) => {
    return (
        <div className="ann-field">
            <h3>
                Цена<span>*</span>:
            </h3>
            <input
                type="text"
                id="ann-field-price"
                placeholder="Цена"
                {...register('announcementPrice')}
            />
            <div className="ann-field-err"></div>
        </div>
    );
};
