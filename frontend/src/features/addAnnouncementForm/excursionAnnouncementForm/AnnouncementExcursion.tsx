import { UseFormRegister } from 'react-hook-form';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { AnnouncementExcursionFood } from './AnnouncementExcursionFood';
import { AnnouncementExcursionTransfer } from './AnnouncementExcursionTransfer';
import { ProductType } from 'pages/advertPage/libr/types.ts';

interface Props {
    register: UseFormRegister<FormAddAnn>;
    data?: ProductType;
}

export const AnnouncementExcursion = ({ register, data }: Props) => {
    return (
        <>
            <AnnouncementExcursionFood register={register} defaultValue={data?.excursion_food} />
            <AnnouncementExcursionTransfer register={register} defaultValue={data?.excursion_transfer} />
        </>
    );
};
