import { FormState, UseFormRegister } from 'react-hook-form';
import { FormAddAnn } from '../../../pages/addAnnouncement/libr/AnnouncementFormTypes';

interface Props {
    register: UseFormRegister<FormAddAnn>;
    formState: FormState<FormAddAnn>;
}

export const AnnouncementNameField = ({ register, formState }: Props) => {
    const { errors } = formState
    console.log(errors)
    return (
        <div className="ann-field">
            <h3>
                Название объявления<span>*</span>:
            </h3>
            <input
                type="text"
                minLength={1}
                maxLength={100}
                placeholder="Название"
                style={errors?.announcementName ? {
                    border: "1px solid red"
                } : {}}
                {...register('announcementName', {required: true})}
            />
            <div className="ann-field-err">
                {errors?.announcementName &&
                    'Пожалуйста, введите название объявления'}
            </div>
        </div>
    );
};
