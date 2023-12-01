import { Control, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { FormAddAnn } from '../../../pages/addAnnouncement/libr/AnnouncementFormTypes';
import { AnnouncementFoodDelivery } from './AnnouncementFoodDelivery';
import { AnnouncementFoodEsteblishment } from './AnnouncementFoodEstablishment';
import { AnnouncementFoodType } from './AnnouncementFoodType';
import './libr/announcementFood.scss';

interface Props {
    register: UseFormRegister<FormAddAnn>;
    setValue: UseFormSetValue<FormAddAnn>;
    control: Control<FormAddAnn, string[]>;
}

export const AnnouncementFood = ({ register, control, setValue }: Props) => {
    return (
        <div className="ann-food">
            <AnnouncementFoodType control={control} setValue={setValue} />
            <AnnouncementFoodDelivery register={register} />
            <AnnouncementFoodEsteblishment register={register} />
        </div>
    );
};
