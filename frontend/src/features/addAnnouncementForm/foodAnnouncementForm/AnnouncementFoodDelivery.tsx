import { FormAddAnn } from "../../../pages/addAnnouncement/libr/AnnouncementFormTypes";
import { UseFormRegister } from "react-hook-form";

interface Props {
    register: UseFormRegister<FormAddAnn>;
}

export const AnnouncementFoodDelivery = ({ register }: Props) => {
    return (
        <div className="ann-field ann-food">
            <h3>Доставка:</h3>
            <label className="form-checkbox">
                <input type="checkbox" {...register('food_delivery')} />
                <span>Доставка</span>
            </label>
            <div className="ann-field-err"></div>
        </div>
    );
};
