import { UseFormRegister } from 'react-hook-form';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { AnnouncementMarketCondition } from './AnnouncementMarketCondition';

interface Props {
    register: UseFormRegister<FormAddAnn>;
}

export const AnnouncementMarket = ({ register }: Props) => {
    return (
        <>
            <AnnouncementMarketCondition register={register} />
        </>
    );
};
