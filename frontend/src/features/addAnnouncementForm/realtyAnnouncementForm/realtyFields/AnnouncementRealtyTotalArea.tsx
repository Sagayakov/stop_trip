import { UseFormRegister } from 'react-hook-form';
import { FormAddAnn } from '../../../../pages/addAnnouncement/libr/AnnouncementFormTypes';

interface Props {
    register: UseFormRegister<FormAddAnn>;
}
export const AnnouncementRealtyTotalArea = ({ register }: Props) => {
    return (
        <div className="ann-field">
            <h3>Общая площадь</h3>
            <div className="inputNumber-group">
                <input
                    type="text"
                    pattern="[0-9]*[.,]?[0-9]+"
                    autoComplete="off"
                    min={0}
                    placeholder="Площадь"
                    {...register('property_area')}
                />
            </div>
            <div className="ann-field-err"></div>
        </div>
    );
};
