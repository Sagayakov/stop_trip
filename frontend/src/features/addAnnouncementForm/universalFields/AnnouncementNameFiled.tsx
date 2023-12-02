import { FormState, UseFormRegister } from 'react-hook-form';
import { FormAddAnn } from '../../../pages/addAnnouncement/libr/AnnouncementFormTypes';

interface Props {
    register: UseFormRegister<FormAddAnn>;
    formState: FormState<FormAddAnn>;
}

export const AnnouncementNameField = ({ register, formState }: Props) => {
    const { errors } = formState

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
                style={errors?.title ? {
                    border: "1px solid red"
                } : {}}
                {...register('title', {required: true})}
            />
            <div className="ann-field-err">
                {errors?.title &&
                    'Пожалуйста, введите название объявления'}
            </div>
        </div>
    );
};
