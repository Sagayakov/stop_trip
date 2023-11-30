import { UseFormRegister } from 'react-hook-form';
import { FormAddAnn } from '../../../../pages/addAnnouncement/libr/AnnouncementFormTypes';

interface Props {
    register: UseFormRegister<FormAddAnn>;
}
export const AnnouncementTransportYear = ({ register }: Props) => {
    const max = Number(new Date().getFullYear);
    return (
        <div className="ann-field">
            <h3>Год производства</h3>
            <div className="inputNumber-group">
                <input
                    type="text"
                    pattern="[0-9]*[.,]?[0-9]+"
                    autoComplete="off"
                    min={1970}
                    placeholder="От"
                    {...register('transportYearOfProduction.min')}
                />
                <input
                    type="text"
                    pattern="[0-9]*[.,]?[0-9]+"
                    autoComplete="off"
                    max={max}
                    {...register('transportYearOfProduction.max')}
                    placeholder="До"
                />
            </div>
            <div className="ann-field-err"></div>
        </div>
    );
};
