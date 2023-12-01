import { FormAddAnn } from "../../../pages/addAnnouncement/libr/AnnouncementFormTypes";
import { UseFormRegister } from "react-hook-form";
import { AnnouncementHomeVisit } from "./AnnouncementHomeVisit";

interface Props {
    register: UseFormRegister<FormAddAnn>;
}

export const AnnouncementService = ({ register }: Props) => {
    return (
        <div className="ann-service">
            <AnnouncementHomeVisit register={register}/>
        </div>
    );
};
