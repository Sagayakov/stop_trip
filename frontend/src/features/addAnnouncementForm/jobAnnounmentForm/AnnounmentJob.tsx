import { FormAddAnn } from '../../../pages/addAnnouncement/libr/AnnouncementFormTypes';
import { UseFormRegister, UseFormSetValue, Control } from 'react-hook-form';
import { AnnouncementJobType } from './AnnouncementJobType';
import { AnnouncementJobDuration } from './AnnouncementJobDuration';
import { AnnouncementJobPayment } from './AnnouncementJobPayment';
import { AnnouncementJobWithExp } from './AnnouncementJobWithExp';

interface Props {
    register: UseFormRegister<FormAddAnn>;
    setValue: UseFormSetValue<FormAddAnn>;
    control: Control<FormAddAnn, string[]>;
}

export const AnnouncementJob = ({
    register,
    control,
    setValue,
}: Props) => {
    return (
        <>
            <AnnouncementJobType control={control} setValue={setValue} />
            <AnnouncementJobDuration control={control} setValue={setValue} />
            <AnnouncementJobPayment control={control} setValue={setValue} />
            <AnnouncementJobWithExp register={register} />
        </>
    );
};
