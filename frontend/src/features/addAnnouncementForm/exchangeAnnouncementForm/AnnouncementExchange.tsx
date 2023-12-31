import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { UseFormRegister, UseFormSetValue, Control } from "react-hook-form";
import { AnnouncementExchangeName } from "./AnnouncementExchangeName";
import { AnnouncementExchangeFor } from "./AnnouncementExchangeFor";
import { AnnouncementExchangeRate } from "./AnnouncementExchangeRate";
import { ProductType } from 'pages/advertPage/libr/types.ts';


interface Props {
    register: UseFormRegister<FormAddAnn>;
    setValue: UseFormSetValue<FormAddAnn>;
    control: Control<FormAddAnn, string[]>;
    data?: ProductType;
}

export const AnnouncementExchange = ({ register, control, setValue, data }: Props) => {
    return (
        <>
            <AnnouncementExchangeName control={control} setValue={setValue} defaultValue={data?.proposed_currency} />
            <AnnouncementExchangeFor control={control} setValue={setValue} defaultValue={data?.exchange_for} />
            <AnnouncementExchangeRate register={register} defaultValue={data?.exchange_rate} />
        </>
    );
};
