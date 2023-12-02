import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { OptionalFields } from '../../widgets';
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
import { useGetFieldsData } from './libr/getFieldsData';
interface Image {
    image: string;
}

export const AddAnnouncementPage = () => {
    const {
        register, handleSubmit, reset, control, setValue, formState, watch,
    } = useForm<FormAddAnn>({
        reValidateMode: 'onBlur',
    });
    const { categoryList } = useGetFieldsData()

    const [selectedImages, setSelectedImages] = useState<Image[] |undefined>();
    const [markerPosition, setMarkerPosition] = useState<string | undefined>();
    const [descript, setDescript] = useState<string | undefined>();

    const onsubmit = async (data: FormAddAnn) => {
        descript && setValue('description', descript);

        console.log(data);
        setSelectedImages(undefined);
        setMarkerPosition(undefined);
        setDescript(undefined);
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
                        formState={formState}
                        categoryList={categoryList}
                    />
                    <AnnouncementNameField
                        register={register}
                        formState={formState}
                    />
                    <AnnouncementPriceField
                        register={register}
                        formState={formState}
                    />
                    <AnnouncementDescriptionField
                        descript={descript}
                        setDescript={setDescript}
                    />
                    <OptionalFields
                        control={control}
                        register={register}
                        setValue={setValue}
                        watch={watch}
                    />
                    <AnnouncementPhotoField
                        selectedImages={selectedImages}
                        setSelectedImages={setSelectedImages}
                        setValue={setValue}
                    />
                    <AnnouncementLocationField
                        setValue={setValue}
                        markerPosition={markerPosition}
                        setMarkerPosition={setMarkerPosition}
                    />
                    <AnnouncementSubmitButton />
                </form>
            </section>
        </>
    );
};
