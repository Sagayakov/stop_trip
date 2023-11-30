import { Control, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { FormAddAnn } from '../../../pages/addAnnouncement/libr/AnnouncementFormTypes';
import {
    AnnouncementTransportMark,
    AnnouncementTransportModelOfTransport,
    AnnouncementTransportTranspCategory,
    AnnouncementTransportTypeOfService,
    AnnouncementTransportTypeOfTransport,
} from './transportFields';

interface Props {
    register: UseFormRegister<FormAddAnn>;
    setValue: UseFormSetValue<FormAddAnn>;
    control: Control<FormAddAnn, string[]>;
}

export const AnnouncementTransport = ({
    register,
    control,
    setValue,
}: Props) => {
    return (
        <>
            <AnnouncementTransportTypeOfService register={register} />
            <AnnouncementTransportTypeOfTransport register={register} />
            <AnnouncementTransportTranspCategory
                control={control}
                setValue={setValue}
            />
            <AnnouncementTransportMark control={control} setValue={setValue} />
            <AnnouncementTransportModelOfTransport
                control={control}
                setValue={setValue}
            />
        </>
    );
};
