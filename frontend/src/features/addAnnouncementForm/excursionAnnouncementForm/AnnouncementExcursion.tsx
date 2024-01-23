import { FormState, UseFormRegister } from 'react-hook-form';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { AnnouncementExcursionFood } from './AnnouncementExcursionFood';
import { AnnouncementExcursionTransfer } from './AnnouncementExcursionTransfer';
import { ProductType } from 'pages/advertPage/libr/types.ts';

interface Props {
    register: UseFormRegister<FormAddAnn>;
    data?: ProductType;
    formState: FormState<FormAddAnn>;
}

export const AnnouncementExcursion = ({ register, data, formState }: Props) => {
    return (
        <>
            <AnnouncementExcursionFood register={register} defaultValue={data?.excursion_food} formState={formState} />
            <AnnouncementExcursionTransfer register={register} defaultValue={data?.excursion_transfer} formState={formState} />
        </>
    );
};
