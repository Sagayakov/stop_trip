import { useCallback, useState } from 'react';
import {
    Control,
    FormState,
    UseFormRegister,
    UseFormSetValue,
} from 'react-hook-form';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import {
    AnnouncementPropertyType,
    AnnouncementRealtyAmenities,
    AnnouncementRealtyBalcony,
    AnnouncementRealtyBathroomQuantity,
    AnnouncementRealtyBathroomType,
    AnnouncementRealtyComission,
    AnnouncementRealtyFloorNumber,
    AnnouncementRealtyFloorsQuantity,
    AnnouncementRealtyHasFurniture,
    //AnnouncementRealtyHouseType,
    AnnouncementRealtyLivingArea,
    //AnnouncementRealtyParking,
    AnnouncementRealtyPrepayment,
    AnnouncementRealtyRentalCondition,
    AnnouncementRealtyRentDuration,
    AnnouncementRealtyRoomsQuantity,
    AnnouncementRealtyServise,
    AnnouncementRealtySleepingPlaces,
    AnnouncementRealtyTotalArea,
} from './realtyFields';
import { ProductType } from 'pages/advertPage/libr/types.ts';
import { ShowDetailsButton } from 'entity/showDetailsButton';

interface Props {
    register: UseFormRegister<FormAddAnn>;
    setValue: UseFormSetValue<FormAddAnn>;
    control: Control<FormAddAnn, string[]>;
    data?: ProductType;
    formState: FormState<FormAddAnn>;
}

export const AnnouncementRealty = ({
    register,
    control,
    setValue,
    data,
    formState,
}: Props) => {
    const [showDetails, setShowDetails] = useState(false);

    const toggleShowDetails = useCallback(() => setShowDetails((prev) => !prev), []);
    
    return (
        <>
            <AnnouncementRealtyServise
                register={register}
                defaultValue={data?.property_type_of_service}
                formState={formState}
            />
            <AnnouncementPropertyType
                setValue={setValue}
                control={control}
                defaultValue={data?.property_type}
                formState={formState}
            />
            <AnnouncementRealtyComission
                register={register}
                defaultValue={data?.property_commission}
                formState={formState}
            />
            <AnnouncementRealtyRentDuration
                register={register}
                formState={formState}
                defaultValue={data?.property_rent_duration}
            />
            <ShowDetailsButton isOpen={showDetails} onClick={toggleShowDetails} />
            {showDetails && (
                <>
                    <AnnouncementRealtyPrepayment
                        control={control}
                        setValue={setValue}
                        defaultValue={data?.property_prepayment}
                        errors={formState.errors}
                    />
                    <AnnouncementRealtyRentalCondition
                        control={control}
                        setValue={setValue}
                        defaultValue={data?.property_rental_condition}
                        errors={formState.errors}
                    />
                    {/* <AnnouncementRealtyHouseType
                        control={control}
                        setValue={setValue}
                        defaultValue={data?.property_house_type}
                        errors={formState.errors}
                    /> */}
                    <AnnouncementRealtyFloorsQuantity
                        register={register}
                        defaultValue={data?.property_building_max_floor}
                        errors={formState.errors}
                    />
                    <AnnouncementRealtyFloorNumber
                        register={register}
                        defaultValue={data?.property_floor}
                        formState={formState}
                    />
                    <AnnouncementRealtyTotalArea
                        register={register}
                        defaultValue={data?.property_area}
                        errors={formState.errors}
                    />
                    <AnnouncementRealtyLivingArea
                        register={register}
                        defaultValue={data?.property_living_area}
                        errors={formState.errors}
                    />
                    <AnnouncementRealtyRoomsQuantity
                        register={register}
                        defaultValue={data?.property_rooms_count}
                        formState={formState}
                    />
                    <AnnouncementRealtySleepingPlaces
                        register={register}
                        defaultValue={data?.property_sleeping_places}
                        errors={formState.errors}
                    />
                    <AnnouncementRealtyHasFurniture
                        register={register}
                        defaultValue={data?.property_has_furniture}
                        formState={formState}
                        setValue={setValue}
                    />
                    {/* <AnnouncementRealtyParking
                        register={register}
                        defaultValue={data?.property_has_parking}
                        errors={formState.errors}
                    /> */}
                    <AnnouncementRealtyBalcony
                        register={register}
                        defaultValue={data?.property_balcony}
                        errors={formState.errors}
                    />
                    <AnnouncementRealtyBathroomQuantity
                        register={register}
                        defaultValue={data?.property_bathroom_count}
                        errors={formState.errors}
                    />
                    <AnnouncementRealtyBathroomType
                        register={register}
                        defaultValue={data?.property_bathroom_type}
                        errors={formState.errors}
                    />
                    <AnnouncementRealtyAmenities
                        register={register}
                        defaultValue={data?.property_amenities}
                        errors={formState.errors}
                    />
                </>
            )}
        </>
    );
};
