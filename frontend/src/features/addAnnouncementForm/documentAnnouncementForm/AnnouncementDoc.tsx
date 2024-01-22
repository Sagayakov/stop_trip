import { Control, FormState, UseFormSetValue } from 'react-hook-form';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { AnnouncementDocType } from './AnnouncementDocType';
import { AnnouncementDocValidityPeriod } from './AnnouncementDocValidate';
import { ProductType } from 'pages/advertPage/libr/types.ts';

interface Props {
    control: Control<FormAddAnn, string[]>;
    setValue: UseFormSetValue<FormAddAnn>;
    data?: ProductType;
    formState: FormState<FormAddAnn>;
}

export const AnnouncementDoc = ({
    data,
    setValue,
    control,
    formState,
}: Props) => {
    return (
        <>
            <AnnouncementDocType
                control={control}
                setValue={setValue}
                defaultValue={data?.document_type}
                formState={formState}
            />
            <AnnouncementDocValidityPeriod
                control={control}
                setValue={setValue}
                defaultValue={data?.document_duration}
                formState={formState}
            />
        </>
    );
};
