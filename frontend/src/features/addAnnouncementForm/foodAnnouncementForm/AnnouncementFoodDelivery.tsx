import { FormAddAnn } from "../../../pages/addAnnouncement/libr/AnnouncementFormTypes";
import { UseFormRegister } from "react-hook-form";

interface Props {
    register: UseFormRegister<FormAddAnn>;
}

export const AnnouncementFoodDelivery = ({ register }: Props) => {
    return (
        <div className="ann-field">
            <h3>Доставка:</h3>
            <label>
                <input
                    type="checkbox"
                    {...register('announcementFood.delivery')}
                />
                <span>Доставка</span>
            </label>
            <div className="ann-field-err"></div>
        </div>
    );
};
