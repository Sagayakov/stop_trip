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

export const AnnouncementTransport = ({ register, control, setValue, data }: Props) => {
    return (
        <>
            <AnnouncementTransportTypeOfService register={register} defaultValue={data?.transport_type_of_service} />
            <AnnouncementTransportTypeOfTransport register={register} defaultValue={data?.transport_type} />
            <AnnouncementTransportTranspCategory
                control={control}
                setValue={setValue}
                defaultValue={data?.transport_category}
            />
            <AnnouncementTransportMark control={control} setValue={setValue} defaultValue={data?.transport_brand} />
            <AnnouncementTransportModelOfTransport
                control={control}
                setValue={setValue}
                defaultValue={data?.transport_model}
            />
            <AnnouncementTransportEngineType
                control={control}
                setValue={setValue}
                defaultValue={data?.transport_engine_type}
            />
            <AnnouncementTransportEngineCapacity register={register} defaultValue={data?.transport_engine_volume} />
            <AnnoucementTransportDriveType register={register} defaultValue={data?.transport_drive_type} />
            <AnnouncementTransportYear register={register} defaultValue={data?.transport_year_of_production} />
            <AnnouncementTransportTransmission register={register} defaultValue={data?.transport_transmission_type} />
            <AnnouncementTransportBodyType
                control={control}
                setValue={setValue}
                defaultValue={data?.transport_body_type}
            />
            <AnnoucementTransportCondition register={register} defaultValue={data?.transport_condition} />
            <AnnouncementTransportComission register={register} defaultValue={data?.transport_commission} />
        </>
    );
};
