import { UseFormRegister } from 'react-hook-form';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { AnnouncementMarketCondition } from './AnnouncementMarketCondition';
import { ProductType } from 'pages/advertPage/libr/types.ts';

interface Props {
    register: UseFormRegister<FormAddAnn>;
    data?: ProductType;
}

export const AnnouncementMarket = ({ register, data }: Props) => {
    return (
        <>
            <AnnouncementMarketCondition register={register} defaultValue={data?.market_condition} />
        </>
    );
};
