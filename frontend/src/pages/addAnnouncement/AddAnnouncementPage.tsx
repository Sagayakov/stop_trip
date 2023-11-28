import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AnnouncementSubmitButton } from '../../entities/addAnnouncementForm/universalFields';
import {
    AnnouncementCategoryField,
    AnnouncementDescriptionField,
    AnnouncementLocationField,
    AnnouncementNameField,
    AnnouncementPhotoField,
    AnnouncementPriceField,
} from '../../features/addAnnouncementForm/universalFields';
import { FormAddAnn } from './libr/AnnouncementFormTypes';
import './libr/addAnnouncement.scss';

export const AddAnnouncementPage = () => {
    const { register, handleSubmit, reset, control, setValue } = useForm<FormAddAnn>();
    const [selectedImages, setSelectedImages] = useState<File[] | undefined>();
    const onsubmit = async (data: FormAddAnn) => {
        try {
            const url = import.meta.env.VITE_BASE_URL
            const response = await fetch(`${url}/api/advertisements/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            console.log(response)
        } catch (error) {
            console.log(error)
        }
        reset();
    };

    return (
        <>
            <section className="add-ann">
                <form
                    className="add-ann-form"
                    onSubmit={handleSubmit(onsubmit)}
                >
                    <h1>Размещение объявления</h1>
                    <AnnouncementCategoryField
                        control={control}
                        setValue={setValue}
                    />
                    <AnnouncementNameField register={register} />
                    <AnnouncementPriceField register={register} />
                    <AnnouncementDescriptionField register={register} />
                    <AnnouncementPhotoField
                        selectedImages={selectedImages}
                        setSelectedImages={setSelectedImages}
                        setValue={setValue}
                    />
                    <AnnouncementLocationField register={register} />
                    <AnnouncementSubmitButton />
                </form>
            </section>
        </>
    );
};
