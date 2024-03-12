import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import {
    UseFormRegister,
    UseFormSetValue,
    Control,
    FormState,
    UseFormWatch,
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
    watch: UseFormWatch<FormAddAnn>;
}

export const AnnouncementExchange = ({
    register,
    control,
    setValue,
    data,
    formState,
    watch,
}: Props) => {
    return (
        <>
            <AnnouncementExchangeName
                control={control}
                setValue={setValue}
                defaultValue={data?.proposed_currency}
                formState={formState}
                watch={watch}
            />
            <AnnouncementExchangeFor
                control={control}
                setValue={setValue}
                defaultValue={data?.exchange_for}
                formState={formState}
                watch={watch}
            />
            <AnnouncementExchangeRate
                register={register}
                defaultValue={data?.exchange_rate}
                formState={formState}
            />
        </>
    );
};
