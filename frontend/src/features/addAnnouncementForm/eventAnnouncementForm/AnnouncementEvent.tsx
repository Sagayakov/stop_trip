import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { UseFormRegister } from "react-hook-form";
import { AnnouncementEventStart } from "./AnnouncementEventStart";
import { AnnouncementEventEnd } from "./AnnouncementEventEnd";
import { AnnouncementEventOnline } from "./AnnouncementEventOnline";
import './announcementEvent.scss'
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss'
interface Props {
    register: UseFormRegister<FormAddAnn>;
}

export const AnnouncementEvent = ({ register }: Props) => {
    return (
        <div className={styles.ann_event}>
            <AnnouncementEventStart register={register}/>
            <AnnouncementEventEnd register={register} />
            <AnnouncementEventOnline register={register} />
        </div>
    );
};
