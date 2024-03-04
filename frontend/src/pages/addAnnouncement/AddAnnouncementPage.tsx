import { Suspense, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AnnouncementSubmitButton } from 'entity/addAnnouncementForm/universalFields';
import {
    AnnouncementCategoryField,
    AnnouncementPhotoField,
    AnnouncementNameField,
    AnnouncementLocationField,
    AnnouncementPriceField,
    AnnouncementDescriptionField,
    OptionalFields,
    AnnouncementRegion,
    AnnouncementCity,
    AnnouncementCountry,
} from 'pages/addAnnouncement/lazyFields/lazyFields.ts';
import { FormAddAnn } from './libr/AnnouncementFormTypes';
import styles from './libr/addAnnouncement.module.scss';
import { LoadingWithBackground } from 'entity/loading/LoadingWithBackground';
import { useTranslation } from 'react-i18next';
import { scrollToTop } from 'shared/utils/scrollToTop.ts';
import './libr/selectAddAnnouncement.scss';
import { BackgroundModal } from 'shared/utils/BackgroundModal.tsx';
import { SuccessAddAnnouncement } from 'features/addAnnouncementForm/universalFields/SuccessAddAnnouncement.tsx';
import { toast } from 'react-toastify';
import { useAppDispatch } from 'app/store/hooks.ts';
import { setLoading } from 'entity/loading/model/setLoadingSlice.ts';
import {
    fetchAdverts,
    useGetSelectOptionsQuery,
} from 'app/api/fetchAdverts.ts';
import { YoutubeField } from 'features/addAnnouncementForm/youtubeFiled';
import { useAddAdvertMutation } from 'app/api/authFetchAdverts.ts';
import { convertFilesToBase64Strings } from 'pages/addAnnouncement/libr/convertFileToBinary.ts';
// import { createFormDataObjectForSendAnnouncement } from 'shared/utils/createFormDataObjectForSendAnnouncement.ts';
// import { convertFilesToBinaryStrings } from 'pages/addAnnouncement/libr/convertFileToBinary.ts';

const AddAnnouncementPage = () => {
    const {
        register,
        handleSubmit,
        reset,
        control,
        setValue,
        formState,
        watch,
        setError,
        clearErrors,
    } = useForm<FormAddAnn>({
        reValidateMode: 'onBlur',
    });
    const dispatch = useAppDispatch();

    const [selectedImages, setSelectedImages] = useState<File[] | undefined>();
    const [imgSize, setImgSize] = useState(0);
    const [markerPosition, setMarkerPosition] = useState<string | undefined>();
    const [modalSuccess, setModalSuccess] = useState(false);
    const { t } = useTranslation();
    const category = watch('category');

    const [addAdvert, { isSuccess, isError, isLoading }] =
        useAddAdvertMutation();

    useGetSelectOptionsQuery(''); //запрашиваем данные, потом будем доставать из кэша

    useEffect(() => {
        if (selectedImages) {
            convertFilesToBase64Strings(selectedImages)
                .then((base64Strings) => {
                    console.log('Конвертация прошла');
                    setValue('images', base64Strings as string[]);
                })
                .catch((error) => {
                    console.error('Ошибка:', error);
                });
        }
    }, [selectedImages]);

    const onsubmit = async (data: FormAddAnn) => {
        setValue('country', 'india');
        // const formData = createFormDataObjectForSendAnnouncement(
        //     data,
        //     'images'
        // );
        //если раскомментировать, то в запросе убрать JSON.stringify
        try {
            await addAdvert(data);
            // await addAdvert(formData as FormAddAnn);
        } catch (error) {
            console.log(error);
            toast.error(`${t('errors.add-announcement-error')}`);
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handleClick = () => {
        setModalSuccess(false);
        scrollToTop();
    };

    const sendButtonDisabled = () => {
        return (
            (selectedImages && selectedImages.length > 10) || imgSize > 52428800
        );
    };

    useEffect(() => {
        if (isSuccess) {
            setModalSuccess(true);
            setSelectedImages(undefined);
            setMarkerPosition(undefined);
            setImgSize(0);
            dispatch(
                fetchAdverts.util?.invalidateTags([
                    'Adverts',
                    'MyAnnouncements',
                ])
            );
            //очищаем кэш, чтобы обновить данные по объявлениям
            reset();
        }
        if (isError) {
            toast.error(`${t('errors.add-announcement-error')}`);
        }
        setValue('country', 'india');
    }, [isSuccess, isError]);

    return (
        <>
            {isLoading && <LoadingWithBackground />}
            {modalSuccess && (
                <BackgroundModal
                    className={styles.background}
                    callback={handleClick}
                >
                    <SuccessAddAnnouncement onClick={handleClick} />
                </BackgroundModal>
            )}
            <section className={styles.add_ann}>
                <form
                    className={styles.add_ann_form}
                    onSubmit={handleSubmit(onsubmit)}
                    id="form-add-announcement"
                >
                    <Suspense fallback={<LoadingWithBackground />}>
                        <h1>{t('add-page.post')}</h1>
                        <AnnouncementCategoryField
                            control={control}
                            setValue={setValue}
                            formState={formState}
                        />
                        <AnnouncementCountry
                            setValue={setValue}
                            control={control}
                        />
                        <AnnouncementRegion
                            setValue={setValue}
                            control={control}
                            formState={formState}
                        />
                        <AnnouncementCity
                            setValue={setValue}
                            control={control}
                            formState={formState}
                        />
                        <AnnouncementNameField
                            register={register}
                            formState={formState}
                        />
                        {category !== 'exchange_rate' && (
                            <AnnouncementPriceField
                                register={register}
                                formState={formState}
                            />
                        )}
                        <AnnouncementDescriptionField control={control} />
                        <OptionalFields
                            control={control}
                            register={register}
                            setValue={setValue}
                            watch={watch}
                            formState={formState}
                        />
                        <AnnouncementPhotoField
                            selectedImages={selectedImages}
                            setSelectedImages={setSelectedImages}
                            setValue={setValue}
                            imgSize={imgSize}
                            setImgSize={setImgSize}
                            setError={setError}
                            clearErrors={clearErrors}
                        />
                        <YoutubeField register={register} />
                        <AnnouncementLocationField
                            setValue={setValue}
                            markerPosition={markerPosition}
                            setMarkerPosition={setMarkerPosition}
                        />
                        <AnnouncementSubmitButton
                            isDisabled={sendButtonDisabled()}
                        />
                    </Suspense>
                </form>
            </section>
        </>
    );
};

export default AddAnnouncementPage;
