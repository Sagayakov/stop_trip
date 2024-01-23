import {
    Control,
    FormState,
    UseFormRegister,
    UseFormSetValue,
} from 'react-hook-form';
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
    formState: FormState<FormAddAnn>;
}

export const AnnouncementTransport = ({
    register,
    control,
    setValue,
    data,
    formState,
}: Props) => {
    return (
        <>
            <AnnouncementTransportTypeOfService
                register={register}
                defaultValue={data?.transport_type_of_service}
                formState={formState}
            />
            <AnnouncementTransportTypeOfTransport
                register={register}
                defaultValue={data?.transport_type}
                formState={formState}
            />
            <AnnouncementTransportTranspCategory
                control={control}
                setValue={setValue}
                defaultValue={data?.transport_category}
                formState={formState}
            />
            <AnnouncementTransportMark
                control={control}
                setValue={setValue}
                defaultValue={data?.transport_brand}
                formState={formState}
            />
            <AnnouncementTransportModelOfTransport
                control={control}
                setValue={setValue}
                defaultValue={data?.transport_model}
                formState={formState}
            />
            <AnnouncementTransportEngineType
                control={control}
                setValue={setValue}
                defaultValue={data?.transport_engine_type}
            />
            <AnnouncementTransportEngineCapacity
                register={register}
                defaultValue={data?.transport_engine_volume}
            />
            <AnnoucementTransportDriveType
                register={register}
                defaultValue={data?.transport_drive_type}
            />
            <AnnouncementTransportYear
                register={register}
                defaultValue={data?.transport_year_of_production}
            />
            <AnnouncementTransportTransmission
                register={register}
                defaultValue={data?.transport_transmission_type}
                formState={formState}
            />
            <AnnouncementTransportBodyType
                control={control}
                setValue={setValue}
                defaultValue={data?.transport_body_type}
            />
            <AnnoucementTransportCondition
                register={register}
                defaultValue={data?.transport_condition}
            />
            <AnnouncementTransportComission
                register={register}
                defaultValue={data?.transport_commission}
            />
        </>
    );
};
