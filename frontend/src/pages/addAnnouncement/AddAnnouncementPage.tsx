import { Suspense, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AnnouncementSubmitButton } from 'entities/addAnnouncementForm/universalFields';
import {
    AnnouncementCategoryField,
    AnnouncementPhotoField,
    AnnouncementNameField,
    AnnouncementLocationField,
    AnnouncementPriceField,
    AnnouncementDescriptionField,
    OptionalFields,
    AnnouncementRegion, AnnouncementCity, AnnouncementCountry,
} from 'pages/addAnnouncement/lazyFields/lazyFields.ts';
import { FormAddAnn } from './libr/AnnouncementFormTypes';
import styles from './libr/addAnnouncement.module.scss';
import { LoadingWithBackground } from 'entities/loading/LoadingWithBackground';
import { useTranslation } from 'react-i18next';
// import { useAddAdvertMutation } from 'app/api/fetchAdverts.ts';
import { scrollToTop } from 'shared/utils/scrollToTop.ts';
import './libr/selectAddAnnouncement.scss';
import { BackgroundModal } from 'shared/utils/BackgroundModal.tsx';
import { SuccessAddAnnouncement } from 'features/addAnnouncementForm/universalFields/SuccessAddAnnouncement.tsx';
import { toast } from 'react-toastify';
import { getTokensFromStorage } from 'widgets/header/libr/authentication/getTokensFromStorage.ts';
import { getAccessTokenWithRefresh } from 'shared/model/getAccessTokenWithRefresh.ts';
import { useAppDispatch, useAppSelector } from 'app/store/hooks.ts';
import { setLoading } from 'entities/loading/model/setLoadingSlice.ts';

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
    const isLoading = useAppSelector((state) => state.setLoading.loading);
    const { t } = useTranslation();

    const { refreshToken } = getTokensFromStorage();
    const category = watch('category');
    const onsubmit = async (data: FormAddAnn) => {
        dispatch(setLoading(true));
        await getAccessTokenWithRefresh(dispatch, refreshToken)//сначала дожидаемся новый accessToken, затем шлем пост запрос
        const formData = new FormData();
        Object.entries(data).forEach(([field, value]) => {
            switch (field) {
                case 'images':
                    // Если это поле с изображениями, добавляем каждый файл поочередно
                    if (value instanceof Array && value[0] instanceof File) {
                        value.forEach((file, index) => {
                            formData.append('images', file, `image_${index}`);
                        });
                    }
                    break;
                default:
                    // Добавляем остальные поля
                    console.log(`${field}: ${typeof value}`);
                    if(value === undefined || value === null){
                        break;//иначе присваивается 'undefined' если поле не заполнено
                    }
                    formData.append(field, value);
                    break;
            }
        });

        try {
            const { accessToken } = getTokensFromStorage();
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/advertisements/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: formData,
            })
            if(response.ok){
                setSelectedImages(undefined);
                setMarkerPosition(undefined);
                reset();
                setValue('category', data.category);
                dispatch(setLoading(false));
                setModalSuccess(true);
            } else {
                dispatch(setLoading(false));
                toast.error(`${t('errors.add-announcement-error')}`);
            }
        } catch (error) {
            console.log(error)
            dispatch(setLoading(false));
            toast.error(`${t('errors.add-announcement-error')}`);
        }
    };
    const handleClick = () => {
        setModalSuccess(false);
        scrollToTop();
    };

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
                        <AnnouncementCountry setValue={setValue} control={control} />
                        <AnnouncementRegion setValue={setValue} control={control} />
                        <AnnouncementCity setValue={setValue} control={control} />
                        <AnnouncementNameField
                            register={register}
                            formState={formState}
                        />
                        {category !== "exchange_rate" && <AnnouncementPriceField
                            register={register}
                            formState={formState}
                            watch={watch}
                        />}
                        <AnnouncementDescriptionField control={control} />
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