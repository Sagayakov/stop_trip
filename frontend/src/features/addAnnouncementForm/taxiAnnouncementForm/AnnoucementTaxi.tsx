import { Control, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { AnnouncementTaxiType } from './AnnoucementTaxiType';
import { AnnouncementTaxiUnit } from './AnnoucementTaxiUnit';

interface Props {
    register: UseFormRegister<FormAddAnn>;
    setValue: UseFormSetValue<FormAddAnn>;
    control: Control<FormAddAnn, string[]>;
}

export const AnnouncementTaxi = ({ control, setValue, register }: Props) => {
    return (
        <div className="ann-taxi">
            <AnnouncementTaxiUnit register={register} />
            <AnnouncementTaxiType control={control} setValue={setValue} />
        </div>
    );
};
