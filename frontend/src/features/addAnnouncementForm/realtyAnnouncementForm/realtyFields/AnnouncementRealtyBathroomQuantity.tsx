import { UseFormRegister } from 'react-hook-form';
import { FormAddAnn } from '../../../../pages/addAnnouncement/libr/AnnouncementFormTypes';

interface Props {
    register: UseFormRegister<FormAddAnn>;
}
export const AnnouncementRealtyBathroomQuantity = ({ register }: Props) => {
    return (
        <div className="ann-field">
            <h3>Количество санузлов</h3>
            <div className="inputNumber-group">
                <input
                    type="text"
                    pattern="[0-9]*[.,]?[0-9]+"
                    autoComplete="off"
                    min={0}
                    placeholder="Количество санузлов"
                    {...register('property_bathroom_count')}
                />
            </div>
            <div className="ann-field-err"></div>
        </div>
    );
};
