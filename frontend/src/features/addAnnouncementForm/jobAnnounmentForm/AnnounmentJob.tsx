import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { UseFormRegister, UseFormSetValue, Control } from 'react-hook-form';
import { AnnouncementJobType } from './AnnouncementJobType';
import { AnnouncementJobDuration } from './AnnouncementJobDuration';
import { AnnouncementJobPayment } from './AnnouncementJobPayment';
import { AnnouncementJobWithExp } from './AnnouncementJobWithExp';
import { ProductType } from 'pages/advertPage/libr/types.ts';

interface Props {
    register: UseFormRegister<FormAddAnn>;
    setValue: UseFormSetValue<FormAddAnn>;
    control: Control<FormAddAnn, string[]>;
    data?: ProductType;
}

export const AnnouncementJob = ({
    register,
    control,
    setValue,
    data
}: Props) => {
    return (
        <>
            <AnnouncementJobType register={register} defaultValue={data?.job_type} />
            <AnnouncementJobDuration register={register} defaultValue={data?.job_duration} />
            <AnnouncementJobPayment control={control} setValue={setValue} defaultValue={data?.job_payment_type} />
            <AnnouncementJobWithExp register={register} defaultValue={data?.job_experience} />
        </>
    );
};
