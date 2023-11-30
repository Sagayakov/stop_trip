//AnnouncementTransportComission
import { UseFormRegister } from 'react-hook-form';
import { FormAddAnn } from '../../../../pages/addAnnouncement/libr/AnnouncementFormTypes';

interface Props {
    register: UseFormRegister<FormAddAnn>;
}
export const AnnouncementRealtyComission = ({ register }: Props) => {
    return (
        <div className="ann-field">
            <h3>Комиссия</h3>
            <div className="inputNumber-group">
                <input
                    type="text"
                    pattern="[0-9]*[.,]?[0-9]+"
                    autoComplete="off"
                    {...register('Comission.min')}
                    min={1}
                    placeholder="От"
                />
                <input
                    type="text"
                    pattern="[0-9]*[.,]?[0-9]+"
                    autoComplete="off"
                    {...register('Comission.max')}
                    min={1}
                    placeholder="До"
                />
            </div>
            <div className="ann-field-err"></div>
        </div>
    );
};
