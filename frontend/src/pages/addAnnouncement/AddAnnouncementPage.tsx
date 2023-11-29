import { LatLng } from 'leaflet';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AnnouncementSubmitButton } from '../../entities/addAnnouncementForm/universalFields';
import { AnnouncementDoc } from '../../features/addAnnouncementForm/documentAnnouncementForm';
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
import { AnnouncementEvent } from '../../features/addAnnouncementForm/eventAnnouncementForm';

export const AddAnnouncementPage = () => {
    const {
        register,
        handleSubmit,
        reset,
        control,
        setValue,
        formState,
        watch
    } = useForm<FormAddAnn>({
        reValidateMode: 'onBlur',
    });
    const [selectedImages, setSelectedImages] = useState<File[] | undefined>();
    const [markerPosition, setMarkerPosition] = useState<LatLng | undefined>();
    const [descript, setDescript] = useState<string | undefined>();

    const category = watch('announcementCategory');
    const getCategoryValue = (cat: string) => {
        if(category){
            return category[0] === cat
        }
    }

    const onsubmit = async (data: FormAddAnn) => {
        descript && setValue('announcementDescription', descript);
        // try {
        //     const url = import.meta.env.VITE_BASE_URL;
        //     const response = await fetch(`${url}/api/advertisements/`, {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(data),
        //     });
        //     console.log(response);
        // } catch (error) {
        //     console.log(error);
        // }
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
                    {getCategoryValue('Документы') && <AnnouncementDoc register={register} />}
                    {getCategoryValue('Мероприятия') && <AnnouncementEvent register={register}/>}
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
