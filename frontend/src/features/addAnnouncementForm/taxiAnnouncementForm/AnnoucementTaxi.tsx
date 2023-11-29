import { Control, UseFormSetValue } from 'react-hook-form';
import { FormAddAnn } from '../../../pages/addAnnouncement/libr/AnnouncementFormTypes';
import { AnnouncementTaxiType } from './AnnoucementTaxiType';
import { AnnouncementTaxiUnit } from './AnnoucementTaxiUnit';

interface Props {
    setValue: UseFormSetValue<FormAddAnn>;
    control: Control<FormAddAnn, string[]>;
}

export const AnnouncementTaxi = ({ control, setValue }: Props) => {
    return (
        <div className="ann-taxi">
            <AnnouncementTaxiUnit control={control} setValue={setValue} />
            <AnnouncementTaxiType control={control} setValue={setValue} />
        </div>
    );
};
