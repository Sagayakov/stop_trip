import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { UseFormRegister } from "react-hook-form";
import { AnnouncementHomeVisit } from "./AnnouncementHomeVisit";
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss'
import { ProductType } from 'pages/advertPage/libr/types.ts';

interface Props {
    register: UseFormRegister<FormAddAnn>;
    data?: ProductType;
}

export const AnnouncementService = ({ register, data }: Props) => {
    return (
        <div className={styles.ann_service}>
            <AnnouncementHomeVisit register={register} defaultValue={data?.service_home_visit} />
        </div>
    );
};
