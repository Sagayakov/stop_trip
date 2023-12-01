import { UseFormRegister } from 'react-hook-form';
import { FormAddAnn } from '../../../../pages/addAnnouncement/libr/AnnouncementFormTypes';

interface Props {
    register: UseFormRegister<FormAddAnn>;
}
export const AnnouncementRealtyLivingArea = ({ register }: Props) => {
    return (
        <div className="ann-field">
            <h3>Жилая площадь</h3>
            <div className="inputNumber-group">
                <input
                    type="text"
                    pattern="[0-9]*[.,]?[0-9]+"
                    autoComplete="off"
                    min={0}
                    placeholder="Площадь"
                    {...register('LivingSpace.min')}
                />
                {/* <input
                    type="text"
                    pattern="[0-9]*[.,]?[0-9]+"
                    autoComplete="off"
                    min={0}
                    placeholder="До"
                    {...register('LivingSpace.max')}
                /> */}
            </div>
            <div className="ann-field-err"></div>
        </div>
    );
};
