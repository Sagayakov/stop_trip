import { FormAddAnn } from "../../../pages/addAnnouncement/libr/AnnouncementFormTypes";
import { UseFormRegister } from "react-hook-form";

interface Props {
    register: UseFormRegister<FormAddAnn>;
}

export const AnnouncementDocType = ({ register }: Props) => {
    return (
        <div className="ann-field">
            <h3>Тип документа:</h3>
            <input
                type="text"
                minLength={1}
                maxLength={50}
                placeholder="Тип документа"
                // style={
                //     errors?.announcementDoc.docType
                //         ? {
                //               border: '1px solid red',
                //           }
                //         : {}
                // }
                {...register('announcementDoc.docType', { required: true })}
            />
            <div className="ann-field-err">
                {/* {errors?.announcementDoc.docType &&
                    'Пожалуйста, введите тип документа'} */}
            </div>
        </div>
    );
};
