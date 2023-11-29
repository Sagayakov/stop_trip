import { FormAddAnn } from '../../../pages/addAnnouncement/libr/AnnouncementFormTypes';
import { UseFormRegister } from 'react-hook-form';

interface Props {
    register: UseFormRegister<FormAddAnn>;
}

export const AnnouncementDocValidityPeriod = ({ register }: Props) => {
    return (
        <div className="ann-field">
            <h3>Срок действия:</h3>
            <input
                type="text"
                minLength={1}
                maxLength={50}
                placeholder="Срок"
                // style={
                //     errors?.announcementDoc.validityPeriod
                //         ? {
                //               border: '1px solid red',
                //           }
                //         : {}
                // }
                {...register('announcementDoc.validityPeriod', {
                    required: true,
                })}
            />
            <div className="ann-field-err">
                {/* {errors?.announcementDoc.validityPeriod &&
                    'Пожалуйста, введите название объявления'} */}
            </div>
        </div>
    );
};
