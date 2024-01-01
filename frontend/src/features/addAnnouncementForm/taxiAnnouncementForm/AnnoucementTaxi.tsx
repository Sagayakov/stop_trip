import { Control, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { AnnouncementTaxiType } from './AnnoucementTaxiType';
import { AnnouncementTaxiUnit } from './AnnoucementTaxiUnit';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss'
import { ProductType } from 'pages/advertPage/libr/types.ts';

interface Props {
    register: UseFormRegister<FormAddAnn>;
    setValue: UseFormSetValue<FormAddAnn>;
    control: Control<FormAddAnn, string[]>;
    data?: ProductType;
}

export const AnnouncementTaxi = ({ control, setValue, register, data }: Props) => {
    return (
        <div className={styles.ann_taxi}>
            <AnnouncementTaxiUnit register={register} defaultValue={data?.taxi_unit}/>
            <AnnouncementTaxiType control={control} setValue={setValue} defaultValue={data?.taxi_type} />
        </div>
    );
};
