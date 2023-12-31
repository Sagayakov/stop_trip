import { Control, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { AnnouncementFoodDelivery } from './AnnouncementFoodDelivery';
import { AnnouncementFoodEsteblishment } from './AnnouncementFoodEstablishment';
import { AnnouncementFoodType } from './AnnouncementFoodType';
import './libr/announcementFood.scss';
import { ProductType } from 'pages/advertPage/libr/types.ts';

interface Props {
    register: UseFormRegister<FormAddAnn>;
    setValue: UseFormSetValue<FormAddAnn>;
    control: Control<FormAddAnn, string[]>;
    data?: ProductType;
}

export const AnnouncementFood = ({ register, control, setValue, data }: Props) => {
    return (
        <>
            <AnnouncementFoodType control={control} setValue={setValue} defaultValue={data?.food_type} />
            <AnnouncementFoodDelivery register={register} defaultValue={data?.food_delivery} />
            <AnnouncementFoodEsteblishment register={register} defaultValue={data?.food_establishment} />
        </>
    );
};
