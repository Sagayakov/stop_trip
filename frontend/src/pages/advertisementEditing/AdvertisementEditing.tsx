import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss';
import 'pages/addAnnouncement/libr/selectAddAnnouncement.scss';
import { useForm } from 'react-hook-form';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { useTranslation } from 'react-i18next';
import { fetchAdverts, useEditAdvertMutation, useGetAdvertBySlugQuery } from 'app/api/fetchAdverts.ts';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    AnnouncementCategoryField,
    AnnouncementCity,
    AnnouncementDescriptionField,
    AnnouncementLocationField,
    AnnouncementNameField,
    AnnouncementPhotoField,
    AnnouncementPriceField,
    AnnouncementRegion,
    OptionalFields,
} from 'pages/addAnnouncement/lazyFields/lazyFields.ts';
import { useEffect, useLayoutEffect, useState } from 'react';
import { LoadingWithBackground } from 'entity/loading/LoadingWithBackground.tsx';
import { getTokensFromStorage } from 'widgets/header/libr/authentication/getTokensFromStorage.ts';
import { AnnouncementSubmitButton } from 'entity/addAnnouncementForm/universalFields';
import { scrollToTop } from 'shared/utils/scrollToTop.ts';
import { toast } from 'react-toastify';
import { getAccessTokenWithRefresh } from 'shared/model/getAccessTokenWithRefresh.ts';
import { useAppDispatch } from 'app/store/hooks.ts';
import { useGetUserQuery } from 'app/api/fetchUser.ts';
import { setLoading } from 'entity/loading/model/setLoadingSlice.ts';
import { LastAdvertsImages } from 'app/api/types/lastAdvertsTypes.ts';
import { createFormDataObjectForSendAnnouncement } from 'shared/utils/createFormDataObjectForSendAnnouncement.ts';

const AdvertisementEditing = () => {
    const { t } = useTranslation();
    const { register, handleSubmit, control, setValue, formState, watch } =
        useForm<FormAddAnn>({
            reValidateMode: 'onBlur',
        });
    const dispatch = useAppDispatch();

    const category = watch('category');

    const path = useLocation().pathname.split('/');
    const slug = path[path.length - 1];

    const { data: dataAdvert, isLoading } = useGetAdvertBySlugQuery(slug);
    const { accessToken, refreshToken } = getTokensFromStorage();
    const { data: user } = useGetUserQuery(accessToken);

    const [editAdvert, { isLoading: isSendLoading, isSuccess, isError: isSendError }] = useEditAdvertMutation();
    const [markerPosition, setMarkerPosition] = useState<string | undefined>(
        dataAdvert?.coordinates
    );
    const [selectedImages, setSelectedImages] = useState<File[] | undefined>();
    const [editImages, setEditImages] = useState<LastAdvertsImages[] | undefined>(dataAdvert?.images)

    const addSlug = dataAdvert ? dataAdvert.slug : '';
    const navigate = useNavigate();

    useLayoutEffect(() => {
        const { refreshToken } = getTokensFromStorage();
        getAccessTokenWithRefresh(dispatch, refreshToken); //перед отрисовкой получаем новый accessToken
    }, [dispatch]);

    if (!isLoading && user && user.id !== dataAdvert?.owner.id) {
        navigate({ pathname: '/404' }); //если прошла загрузка, мы получили id хозяина объявления и он не равен нашему id, то отправляем на 404
    }

    const onsubmit = async (data: FormAddAnn) => {
        dispatch(setLoading(true));
        setValue('country', 'india');
        setValue('region', "goa");
        await getAccessTokenWithRefresh(dispatch, refreshToken); //сначала дожидаемся новый accessToken, затем шлем пост запрос
        const formData = createFormDataObjectForSendAnnouncement(data, 'upload_images');
        try {
            const { accessToken } = getTokensFromStorage();
            await editAdvert({body: formData as FormAddAnn, addSlug, accessToken})
            dispatch(setLoading(false));
        } catch (error) {
            console.log(error);
            dispatch(setLoading(false));
            toast.error(`${t('errors.add-announcement-error')}`);
        }
    };

    useEffect(() => {
        setValue('country', 'india');
        setValue('region', "goa");
        dataAdvert && setMarkerPosition(dataAdvert.coordinates);
        dataAdvert?.slug && setValue('slug', dataAdvert?.slug);
        dataAdvert?.images && setEditImages(dataAdvert.images)
        if(path[1] !== "advertisement-editing") setValue('category', dataAdvert?.category)
        return () => {
            setEditImages(undefined);
            setSelectedImages(undefined);
            setMarkerPosition(undefined);
        }
    }, [dataAdvert, setValue, isSuccess, isSendError,  path]);

    useEffect(() => {
        if(isSuccess){
            toast.success(`${t('add-page.edit-success')}`)
            scrollToTop();
            dispatch(fetchAdverts.util?.invalidateTags(['Adverts', 'MyAnnouncements']))
            //очищаем кэш, чтобы обновить данные по объявлениям
        }
        if(isSendError){
            toast.error(`${t('errors.add-announcement-error')}`);
        }
    }, [t, isSendError, isSuccess]);//чтобы уведомление всплыло один раз

    return (
        <section className={styles.add_ann}>
            <form
                className={styles.add_ann_form}
                onSubmit={handleSubmit(onsubmit)}
                id="form-edit-announcement"
            >
                <h1>{t('add-page.edit')}</h1>
                {isLoading && user?.id && <LoadingWithBackground />}
                {(isSendLoading || isLoading) && <LoadingWithBackground />}
                {dataAdvert && (
                    <>
                        {(path[1] !== "advertisement-editing") && <AnnouncementCategoryField
                            setValue={setValue}
                            control={control}
                            formState={formState}
                            defaultValue={dataAdvert.category}
                        />}
                        <AnnouncementRegion
                            setValue={setValue}
                            control={control}
                            defaultValue={dataAdvert.region}
                            formState={formState}
                        />
                        <AnnouncementCity
                            setValue={setValue}
                            control={control}
                            defaultValue={dataAdvert.city}
                            formState={formState}
                        />
                        <AnnouncementNameField
                            register={register}
                            formState={formState}
                            defaultValue={dataAdvert.title}
                        />
                        {category !== 'exchange_rate' && (
                            <AnnouncementPriceField
                                register={register}
                                formState={formState}
                                defaultValue={dataAdvert.price}
                            />
                        )}
                        <AnnouncementDescriptionField
                            defaultValue={dataAdvert.description}
                            control={control}
                        />
                        <OptionalFields
                            control={control}
                            register={register}
                            setValue={setValue}
                            watch={watch}
                            data={dataAdvert}
                            formState={formState}
                        />
                        <AnnouncementPhotoField
                            selectedImages={selectedImages}
                            setSelectedImages={setSelectedImages}
                            setValue={setValue}
                            // images={dataAdvert?.images}
                            setEditImages={setEditImages}
                            editImages={editImages}
                        />
                        <AnnouncementLocationField
                            setValue={setValue}
                            markerPosition={markerPosition}
                            setMarkerPosition={setMarkerPosition}
                        />
                    </>
                )}
                <AnnouncementSubmitButton />
            </form>
        </section>
    );
};
export default AdvertisementEditing;
