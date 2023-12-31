import { Control, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import {
    AnnouncementRealtyAmenities,
    AnnouncementRealtyBalcony,
    AnnouncementRealtyBathroomQuantity,
    AnnouncementRealtyBathroomType,
    AnnouncementRealtyCity,
    AnnouncementRealtyComission,
    AnnouncementRealtyDistrict,
    AnnouncementRealtyFloorNumber,
    AnnouncementRealtyFloorsQuantity,
    AnnouncementRealtyHasFurniture,
    AnnouncementRealtyHouseType,
    AnnouncementRealtyLivingArea,
    AnnouncementRealtyParking,
    AnnouncementRealtyPrepayment,
    AnnouncementRealtyRentalCondition,
    AnnouncementRealtyRoomsQuantity,
    AnnouncementRealtyServise,
    AnnouncementRealtySleepingPlaces,
    AnnouncementRealtyTotalArea,
} from './realtyFields';
import { ProductType } from 'pages/advertPage/libr/types.ts';

interface Props {
    register: UseFormRegister<FormAddAnn>;
    setValue: UseFormSetValue<FormAddAnn>;
    control: Control<FormAddAnn, string[]>;
    data?: ProductType;
}

export const AnnouncementRealty = ({ register, control, setValue, data }: Props) => {
    return (
        <>
            <AnnouncementRealtyServise register={register} defaultValue={data?.property_type_of_service} />
            <AnnouncementRealtyCity control={control} setValue={setValue} />
            <AnnouncementRealtyDistrict control={control} setValue={setValue} />
            <AnnouncementRealtyHouseType control={control} setValue={setValue} />
            <AnnouncementRealtyPrepayment control={control} setValue={setValue} />
            <AnnouncementRealtyRentalCondition control={control} setValue={setValue} />
            <AnnouncementRealtyFloorsQuantity register={register} />
            <AnnouncementRealtyFloorNumber register={register} />
            <AnnouncementRealtyTotalArea register={register} />
            <AnnouncementRealtyLivingArea register={register} />
            <AnnouncementRealtyRoomsQuantity register={register} />
            <AnnouncementRealtySleepingPlaces register={register} />
            <AnnouncementRealtyHasFurniture register={register} />
            <AnnouncementRealtyParking register={register} />
            <AnnouncementRealtyBalcony register={register} />
            <AnnouncementRealtyBathroomQuantity register={register} />
            <AnnouncementRealtyBathroomType register={register} />
            <AnnouncementRealtyAmenities register={register}/>
            <AnnouncementRealtyComission register={register} />
        </>
    );
};
