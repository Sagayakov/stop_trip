import { Suspense, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AnnouncementSubmitButton } from 'entities/addAnnouncementForm/universalFields';
import { AnnouncementCategoryField, AnnouncementPhotoField, AnnouncementNameField, AnnouncementLocationField, AnnouncementPriceField, AnnouncementDescriptionField, OptionalFields } from 'pages/addAnnouncement/lazyFields/lazyFields.ts';
import { FormAddAnn } from './libr/AnnouncementFormTypes';
import styles from './libr/addAnnouncement.module.scss';
import { LoadingWithBackground } from 'entities/loading/LoadingWithBackground';
import { useTranslation } from 'react-i18next';
import { useAddAdvertMutation } from 'app/api/fetchAdverts.ts';
import { scrollToTop } from 'shared/utils/scrollToTop.ts';
import './libr/selectAddAnnouncement.scss'
import { BackgroundModal } from 'shared/utils/BackgroundModal.tsx';
import { SuccessAddAnnouncement } from 'features/addAnnouncementForm/universalFields/SuccessAddAnnouncement.tsx';
import { toast } from 'react-toastify';
import { getTokensFromStorage } from 'widgets/header/libr/authentication/getTokensFromStorage.ts';

interface Image {
    image: string;
}

const AddAnnouncementPage = () => {
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
    const [modalSuccess, setModalSuccess] = useState(false);
    const { t } = useTranslation();
    const [ addAdvert, { isLoading } ] = useAddAdvertMutation();
    const { accessToken } = getTokensFromStorage();

    const onsubmit = async (data: FormAddAnn) => {
        try {
            const result = await addAdvert({ body: data, token: accessToken });
            if ('data' in result) {
                descript && setValue('description', descript);
                setSelectedImages(undefined);
                setMarkerPosition(undefined);
                setDescript(undefined);
                reset();
                setValue('category', data.category);
                setModalSuccess(true);
            }
        } catch (error){
            console.log(error);
            toast.error(`${t('errors.add-announcement-error')}`)
        }
    };
    const handleClick = () => {
        setModalSuccess(false)
        scrollToTop()
    }

    return (
        <>
            {isLoading && <LoadingWithBackground />}
            {modalSuccess && (
                <BackgroundModal className={styles.background} callback={handleClick}>
                    <SuccessAddAnnouncement onClick={handleClick} />
                </BackgroundModal>
            )}
            <section className={styles.add_ann}>
                <form
                    className={styles.add_ann_form}
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
                        <AnnouncementDescriptionField descript={descript} setDescript={setDescript} />
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

export default AddAnnouncementPage;