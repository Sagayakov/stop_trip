import { Control, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import {
    AnnouncementRealtyAmenities,
    AnnouncementRealtyBalcony,
    AnnouncementRealtyBathroomQuantity,
    AnnouncementRealtyBathroomType,
    AnnouncementRealtyComission,
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
            <AnnouncementRealtyHouseType control={control} setValue={setValue} defaultValue={data?.property_house_type} />
            <AnnouncementRealtyPrepayment control={control} setValue={setValue} defaultValue={data?.property_prepayment} />
            <AnnouncementRealtyRentalCondition control={control} setValue={setValue} defaultValue={data?.property_rental_condition} />
            <AnnouncementRealtyFloorsQuantity register={register} defaultValue={data?.property_building_max_floor} />
            <AnnouncementRealtyFloorNumber register={register} defaultValue={data?.property_floor} />
            <AnnouncementRealtyTotalArea register={register} defaultValue={data?.property_area} />
            <AnnouncementRealtyLivingArea register={register} defaultValue={data?.property_living_area} />
            <AnnouncementRealtyRoomsQuantity register={register} defaultValue={data?.property_rooms_count} />
            <AnnouncementRealtySleepingPlaces register={register} defaultValue={data?.property_sleeping_places} />
            <AnnouncementRealtyHasFurniture register={register} defaultValue={data?.property_has_furniture} />
            <AnnouncementRealtyParking register={register} defaultValue={data?.property_has_parking} />
            <AnnouncementRealtyBalcony register={register} defaultValue={data?.property_balcony} />
            <AnnouncementRealtyBathroomQuantity register={register} defaultValue={data?.property_bathroom_count} />
            <AnnouncementRealtyBathroomType register={register} defaultValue={data?.property_bathroom_type} />
            <AnnouncementRealtyAmenities register={register} defaultValue={data?.property_amenities} />
            <AnnouncementRealtyComission register={register} defaultValue={data?.property_commission} />
        </>
    );
};
