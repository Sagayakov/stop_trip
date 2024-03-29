import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { FormState, UseFormRegister, UseFormWatch } from 'react-hook-form';
import { AnnouncementEventStart } from './AnnouncementEventStart';
import { AnnouncementEventEnd } from './AnnouncementEventEnd';
import { AnnouncementEventOnline } from './AnnouncementEventOnline';
import './announcementEvent.scss';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss';
import { ProductType } from 'pages/advertPage/libr/types.ts';
interface Props {
    register: UseFormRegister<FormAddAnn>;
    data?: ProductType;
    formState: FormState<FormAddAnn>;
    watch: UseFormWatch<FormAddAnn>;
}

export const AnnouncementEvent = ({
    register,
    data,
    formState,
    watch,
}: Props) => {
    return (
        <div className={styles.ann_event}>
            <AnnouncementEventStart
                register={register}
                defaultValue={data?.start_date}
                formState={formState}
                watch={watch}
            />
            <AnnouncementEventEnd
                register={register}
                defaultValue={data?.end_date}
                formState={formState}
                watch={watch}
            />
            <AnnouncementEventOnline
                register={register}
                defaultValue={data?.is_online}
                formState={formState}
            />
        </div>
    );
};
