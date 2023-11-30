import { UseFormRegister } from 'react-hook-form';
import { FormAddAnn } from '../../../pages/addAnnouncement/libr/AnnouncementFormTypes';
import { AnnouncementExcursionFood } from './AnnouncementExcursionFood';
import { AnnouncementExcursionTransfer } from './AnnouncementExcursionTransfer';

interface Props {
    register: UseFormRegister<FormAddAnn>;
}

export const AnnouncementExcursion = ({ register }: Props) => {
    return (
        <>
            <AnnouncementExcursionFood register={register} />
            <AnnouncementExcursionTransfer register={register} />
        </>
    );
};
