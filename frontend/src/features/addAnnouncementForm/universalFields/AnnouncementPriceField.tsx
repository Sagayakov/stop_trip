import { FormState, UseFormRegister } from 'react-hook-form';
import { FormAddAnn } from '../../../pages/addAnnouncement/libr/AnnouncementFormTypes';

interface Props {
    register: UseFormRegister<FormAddAnn>;
    formState: FormState<FormAddAnn>;
}

export const AnnouncementPriceField = ({ register, formState }: Props) => {
    const { errors } = formState

    return (
        <div className="ann-field">
            <h3>
                Цена<span>*</span>:
            </h3>
            <input
                type="text"
                id="ann-field-price"
                placeholder="Цена"
                style={
                    errors?.announcementPrice
                        ? {
                              border: '1px solid red',
                          }
                        : {}
                }
                {...register('announcementPrice', { required: true })}
            />
            <div className="ann-field-err">{errors?.announcementPrice && "Пожалуйста, установите цену"}</div>
        </div>
    );
};
