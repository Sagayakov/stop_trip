import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import {
    UseFormRegister,
    UseFormSetValue,
    Control,
    FormState,
} from 'react-hook-form';
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
    formState: FormState<FormAddAnn>;
}

export const AnnouncementJob = ({
    register,
    control,
    setValue,
    data,
    formState,
}: Props) => {
    return (
        <>
            <AnnouncementJobType
                register={register}
                defaultValue={data?.job_type}
                formState={formState}
            />
            <AnnouncementJobDuration
                register={register}
                defaultValue={data?.job_duration}
                formState={formState}
            />
            <AnnouncementJobPayment
                control={control}
                setValue={setValue}
                defaultValue={data?.job_payment_type}
                formState={formState}
            />
            <AnnouncementJobWithExp
                register={register}
                defaultValue={data?.job_experience}
                formState={formState}
                setValue={setValue}
            />
        </>
    );
};
