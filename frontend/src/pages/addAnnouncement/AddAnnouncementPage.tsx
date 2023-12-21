import { Suspense, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AnnouncementSubmitButton } from 'entities/addAnnouncementForm/universalFields';
import { AnnouncementCategoryField, AnnouncementPhotoField, AnnouncementNameField, AnnouncementLocationField, AnnouncementPriceField, AnnouncementDescriptionField, OptionalFields } from 'pages/addAnnouncement/lazyFields/lazyFields.ts';
import { FormAddAnn } from './libr/AnnouncementFormTypes';
import './libr/addAnnouncement.scss';
import { LoadingWithBackground } from 'entities/loading/LoadingWithBackground';
import { useTranslation } from 'react-i18next';
import { useAddAdvertMutation } from 'app/api/fetchAdverts.ts';
import { scrollToTop } from 'shared/utils/scrollToTop.ts';

interface Image {
    image: string;
}

export const AddAnnouncementPage = () => {
    const {
        register,
        handleSubmit,
        reset,
        control,
        setValue,
        formState,
        watch,
    } = useForm<FormAddAnn>({
        reValidateMode: 'onBlur',
    });

    const [selectedImages, setSelectedImages] = useState<Image[] | undefined>();
    const [markerPosition, setMarkerPosition] = useState<string | undefined>();
    const [descript, setDescript] = useState<string | undefined>();
    const { t } = useTranslation();
    const [ addAdvert, { isSuccess, isLoading } ] = useAddAdvertMutation();
    const onsubmit = async (data: FormAddAnn) => {
        try {

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            await addAdvert(data);
            if(isSuccess){
                descript && setValue('description', descript);
                setSelectedImages(undefined);
                setMarkerPosition(undefined);
                setDescript(undefined);
                reset();
                setValue('category', data.category);
                scrollToTop()
            }
        } catch (error){
            console.log(error)
        }
    };

    return (
        <>
            {isLoading && <LoadingWithBackground />}
            <section className="add-ann">
                <form
                    className="add-ann-form"
                    onSubmit={handleSubmit(onsubmit)}
                >
                    <Suspense fallback={<LoadingWithBackground />}>
                        <h1>{t('add-page.post')}</h1>
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
                    </Suspense>
                </form>
            </section>
        </>
    );
};
