import { Control, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { FormAddAnn } from '../../../pages/addAnnouncement/libr/AnnouncementFormTypes';
import {
    AnnoucementTransportCondition,
    AnnoucementTransportDriveType,
    AnnouncementTransportBodyType,
    AnnouncementTransportComission,
    AnnouncementTransportEngineCapacity,
    AnnouncementTransportEngineType,
    AnnouncementTransportMark,
    AnnouncementTransportModelOfTransport,
    AnnouncementTransportTransmission,
    AnnouncementTransportTranspCategory,
    AnnouncementTransportTypeOfService,
    AnnouncementTransportTypeOfTransport,
    AnnouncementTransportYear,
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
            <AnnouncementTransportEngineType
                control={control}
                setValue={setValue}
            />
            <AnnouncementTransportEngineCapacity register={register} />
            <AnnoucementTransportDriveType register={register} />
            <AnnouncementTransportYear register={register} />
            <AnnouncementTransportTransmission register={register} />
            <AnnouncementTransportBodyType
                control={control}
                setValue={setValue}
            />
            <AnnoucementTransportCondition register={register} />
            <AnnouncementTransportComission register={register} />
        </>
    );
};
