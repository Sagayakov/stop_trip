import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import {
    UseFormRegister,
    UseFormSetValue,
    Control,
    FormState,
} from 'react-hook-form';
import { AnnouncementExchangeName } from './AnnouncementExchangeName';
import { AnnouncementExchangeFor } from './AnnouncementExchangeFor';
import { AnnouncementExchangeRate } from './AnnouncementExchangeRate';
import { ProductType } from 'pages/advertPage/libr/types.ts';

interface Props {
    register: UseFormRegister<FormAddAnn>;
    setValue: UseFormSetValue<FormAddAnn>;
    control: Control<FormAddAnn, string[]>;
    data?: ProductType;
    formState: FormState<FormAddAnn>;
}

export const AnnouncementExchange = ({
    register,
    control,
    setValue,
    data,
    formState,
}: Props) => {
    return (
        <>
            <AnnouncementExchangeName
                control={control}
                setValue={setValue}
                defaultValue={data?.proposed_currency}
                formState={formState}
            />
            <AnnouncementExchangeFor
                control={control}
                setValue={setValue}
                defaultValue={data?.exchange_for}
                formState={formState}
            />
            <AnnouncementExchangeRate
                register={register}
                defaultValue={data?.exchange_rate}
            />
        </>
    );
};
