import { Control, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { AnnouncementTaxiType } from './AnnoucementTaxiType';
import { AnnouncementTaxiUnit } from './AnnoucementTaxiUnit';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss'

interface Props {
    register: UseFormRegister<FormAddAnn>;
    setValue: UseFormSetValue<FormAddAnn>;
    control: Control<FormAddAnn, string[]>;
}

export const AnnouncementTaxi = ({ control, setValue, register }: Props) => {
    return (
        <div className={styles.ann_taxi}>
            <AnnouncementTaxiUnit register={register} />
            <AnnouncementTaxiType control={control} setValue={setValue} />
        </div>
    );
};
