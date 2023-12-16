import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { UseFormRegister, UseFormSetValue, Control } from "react-hook-form";
import { AnnouncementExchangeName } from "./AnnouncementExchangeName";
import { AnnouncementExchangeFor } from "./AnnouncementExchangeFor";
import { AnnouncementExchangeRate } from "./AnnouncementExchangeRate";


interface Props {
    register: UseFormRegister<FormAddAnn>;
    setValue: UseFormSetValue<FormAddAnn>;
    control: Control<FormAddAnn, string[]>;
}

export const AnnouncementExchange = ({ register, control, setValue }: Props) => {
    return (
        <>
            <AnnouncementExchangeName control={control} setValue={setValue} />
            <AnnouncementExchangeFor control={control} setValue={setValue} />
            <AnnouncementExchangeRate register={register} />
        </>
    );
};
