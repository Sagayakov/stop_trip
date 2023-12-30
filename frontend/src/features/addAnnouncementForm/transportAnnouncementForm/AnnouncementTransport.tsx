import { Control, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
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
import { ProductType } from 'pages/advertPage/libr/types.ts';

interface Props {
    register: UseFormRegister<FormAddAnn>;
    setValue: UseFormSetValue<FormAddAnn>;
    control: Control<FormAddAnn, string[]>;
    data?: ProductType;
}

export const AnnouncementTransport = ({ register, control, setValue }: Props) => {
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
