// import { Controls } from '../../features/controls';
import { useForm } from 'react-hook-form';
import { AnnouncementCategoryField, AnnouncementDescriptionField, AnnouncementLocationField, AnnouncementNameField, AnnouncementPhotoField, AnnouncementPriceField } from '../../features/addAnnouncementForm/universalFields';
import { FormAddAnn } from './libr/AnnouncementFormTypes';
import './libr/addAnnouncement.scss';
import { AnnouncementSubmitButton } from '../../entities/addAnnouncementForm/universalFields';

export const AddAnnouncementPage = () => {
    const { register, handleSubmit, control, setValue } = useForm<FormAddAnn>();

    const onsubmit = (data: FormAddAnn) => {
        console.log(data);
    };

    return (
        <>
            <section className="add-ann">
                <form
                    className="add-ann-form"
                    onSubmit={handleSubmit(onsubmit)}
                >
                    <h1>Размещение объявления</h1>
                    <AnnouncementCategoryField control={control} setValue={setValue}/>
                    <AnnouncementNameField register={register} />
                    <AnnouncementPriceField register={register} />
                    <AnnouncementDescriptionField register={register} />
                    <AnnouncementPhotoField register={register}/>
                    <AnnouncementLocationField register={register}/>
                    <AnnouncementSubmitButton />
                </form>
            </section>
        </>
    );
};
