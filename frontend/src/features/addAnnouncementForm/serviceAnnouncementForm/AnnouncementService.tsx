import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { UseFormRegister } from "react-hook-form";
import { AnnouncementHomeVisit } from "./AnnouncementHomeVisit";
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss'

interface Props {
    register: UseFormRegister<FormAddAnn>;
}

export const AnnouncementService = ({ register }: Props) => {
    return (
        <div className={styles.ann_service}>
            <AnnouncementHomeVisit register={register}/>
        </div>
    );
};
