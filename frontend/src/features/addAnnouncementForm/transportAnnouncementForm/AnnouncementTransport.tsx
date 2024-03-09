import {
    Control,
    FormState,
    UseFormRegister,
    UseFormSetValue,
    UseFormWatch,
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
    watch: UseFormWatch<FormAddAnn>;
}

export const AnnouncementTransport = ({
    register,
    control,
    setValue,
    data,
    formState,
    watch,
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
                watch={watch}
            />
            <AnnouncementTransportEngineType
                control={control}
                setValue={setValue}
                defaultValue={data?.transport_engine_type}
                errors={formState.errors}
            />
            <AnnouncementTransportEngineCapacity
                register={register}
                defaultValue={data?.transport_engine_volume}
                formState={formState}
            />
            <AnnoucementTransportDriveType
                register={register}
                defaultValue={data?.transport_drive_type}
                errors={formState.errors}
            />
            <AnnouncementTransportYear
                register={register}
                defaultValue={data?.transport_year_of_production}
                errors={formState.errors}
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
                errors={formState.errors}
            />
            <AnnoucementTransportCondition
                register={register}
                defaultValue={data?.transport_condition}
                errors={formState.errors}
            />
            <AnnouncementTransportComission
                register={register}
                defaultValue={data?.transport_commission}
                errors={formState.errors}
            />
        </>
    );
};
