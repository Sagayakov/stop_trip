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
import { getTokensFromStorage } from 'widgets/header/libr/authentication/getTokensFromStorage.ts';
import { getAccessTokenWithRefresh } from 'shared/model/getAccessTokenWithRefresh.ts';
import { useAppDispatch } from 'app/store/hooks.ts';
import { setLoading } from 'entity/loading/model/setLoadingSlice.ts';
import { createFormDataObjectForSendAnnouncement } from 'shared/utils/createFormDataObjectForSendAnnouncement.ts';
import { useAddAdvertMutation } from 'app/api/fetchAdverts.ts';

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
    const dispatch = useAppDispatch();

    const [selectedImages, setSelectedImages] = useState<File[] | undefined>();
    const [markerPosition, setMarkerPosition] = useState<string | undefined>();
    const [modalSuccess, setModalSuccess] = useState(false);
    const { t } = useTranslation();
    const { refreshToken } = getTokensFromStorage();
    const category = watch('category');

    const [addAdvert, {isSuccess, isError, isLoading}] = useAddAdvertMutation();

    const onsubmit = async (data: FormAddAnn) => {
        setValue('country', 'india');
        setValue('region', "goa");
        dispatch(setLoading(true));
        await getAccessTokenWithRefresh(dispatch, refreshToken); //сначала дожидаемся новый accessToken, затем шлем пост запрос
        const formData = createFormDataObjectForSendAnnouncement(data, 'images');
        try {
            const { accessToken } = getTokensFromStorage();
            await addAdvert({body: formData as FormAddAnn, token: accessToken})
        } catch (error) {
            console.log(error);
            dispatch(setLoading(false));
            toast.error(`${t('errors.add-announcement-error')}`);
        }
    };
    const handleClick = () => {
        setModalSuccess(false);
        scrollToTop();
    };
    const sendButtonDisabled = () => {
        return selectedImages && selectedImages.length > 10;
    };
    useEffect(() => {
        if(isSuccess){
            setModalSuccess(true);
            setSelectedImages(undefined);
            setMarkerPosition(undefined);
            reset();
        }
        if(isError) toast.error(`${t('errors.add-announcement-error')}`);
        setValue('country', 'india');
        setValue('region', "goa");
    }, [isSuccess, isError, reset, t, setValue]);

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
                        />
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
