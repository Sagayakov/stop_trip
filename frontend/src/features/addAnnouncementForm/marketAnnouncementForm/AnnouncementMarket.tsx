import { Control, UseFormSetValue } from 'react-hook-form';
import { FormAddAnn } from '../../../pages/addAnnouncement/libr/AnnouncementFormTypes';
import { AnnouncementMarketCondition } from './AnnouncementMarketCondition';

interface Props {
    setValue: UseFormSetValue<FormAddAnn>;
    control: Control<FormAddAnn, string[]>;
}

export const AnnouncementMarket = ({ setValue, control }: Props) => {
    return (
        <>
            <AnnouncementMarketCondition
                control={control}
                setValue={setValue}
            />
        </>
    );
};
