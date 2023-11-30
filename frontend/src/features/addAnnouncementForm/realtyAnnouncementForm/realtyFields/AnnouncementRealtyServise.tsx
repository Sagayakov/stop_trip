import { UseFormRegister } from 'react-hook-form';
import { FormAddAnn } from '../../../../pages/addAnnouncement/libr/AnnouncementFormTypes';

interface Props {
    register: UseFormRegister<FormAddAnn>;
}
export const AnnouncementRealtyServise = ({ register }: Props) => {
    return (
        <div className="ann-field">
            <h3>Тип услуги</h3>
            <div className="radio-group">
                <label>
                    <input
                        type="radio"
                        {...register('transportTypeOfService')}
                        value="Аренда"
                        style={{ display: 'none' }}
                    />
                    <span>Аренда</span>
                </label>
                <label>
                    <input
                        type="radio"
                        {...register('transportTypeOfService')}
                        value="Продажа"
                        style={{ display: 'none' }}
                    />
                    <span>Продажа</span>
                </label>
            </div>
            <div className="ann-field-err"></div>
        </div>
    );
};
