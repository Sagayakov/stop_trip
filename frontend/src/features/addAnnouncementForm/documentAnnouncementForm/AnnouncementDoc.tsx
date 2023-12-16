import { UseFormRegister } from 'react-hook-form';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { AnnouncementDocType } from './AnnouncementDocType';
import { AnnouncementDocValidityPeriod } from './AnnouncementDocValidate';

interface Props {
    register: UseFormRegister<FormAddAnn>;
}

export const AnnouncementDoc = ({ register }: Props) => {
    return (
        <>
            <AnnouncementDocType register={register} />
            <AnnouncementDocValidityPeriod register={register} />
        </>
    );
};
