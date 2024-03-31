import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss';
import 'pages/addAnnouncement/libr/selectAddAnnouncement.scss';
import { useForm } from 'react-hook-form';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { useTranslation } from 'react-i18next';
import {
    fetchAdverts,
    useGetSelectOptionsQuery,
} from 'app/api/fetchAdverts.ts';
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
import { useEffect, useState } from 'react';
import { LoadingWithBackground } from 'entity/loading/LoadingWithBackground.tsx';
import { AnnouncementSubmitButton } from 'entity/addAnnouncementForm/universalFields';
import { scrollToTop } from 'shared/utils/scrollToTop.ts';
import { toast } from 'react-toastify';
import { useAppDispatch } from 'app/store/hooks.ts';
import { useGetUserQuery } from 'app/api/fetchUser.ts';
import { setLoading } from 'entity/loading/model/setLoadingSlice.ts';
import { YoutubeField } from 'features/addAnnouncementForm/youtubeFiled';
import {
    useEditAdvertMutation,
    useGetAdvertBySlugQuery,
} from 'app/api/authFetchAdverts.ts';
import { LoadingWithBackgroundUpload } from 'entity/loading/LoadingWithBackgroundUpload';

const AdvertisementEditing = () => {
    const { t } = useTranslation();
    const {
        register,
        handleSubmit,
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

    const path = useLocation().pathname.split('/');
    const slug = path[path.length - 1];

    const { data: dataAdvert, isLoading } = useGetAdvertBySlugQuery(slug);
    const { data: user } = useGetUserQuery('');

    useGetSelectOptionsQuery(''); //запрашиваем данные, потом будем доставать из кэша
    const [
        editAdvert,
        {
            isLoading: isSendLoading,
            isSuccess,
            isError: isSendError,
            error: sendError,
        },
    ] = useEditAdvertMutation();
    const [markerPosition, setMarkerPosition] = useState<string | undefined>(
        dataAdvert?.coordinates
    );

    const addSlug = dataAdvert ? dataAdvert.slug : '';
    const navigate = useNavigate();

    if (!isLoading && user && user.id !== dataAdvert?.owner.id) {
        navigate({ pathname: '/404' }); //если прошла загрузка, мы получили id хозяина объявления и он не равен нашему id, то отправляем на 404
    }

    const onsubmit = async (data: FormAddAnn) => {
        setValue('country', 'india');

        try {
            const nonNullableData = Object.entries(data).filter(
                (el) => el[1] !== null && el[1] !== undefined && el[1] !== ''
            );
            await editAdvert({
                body: {
                    ...Object.fromEntries(nonNullableData),
                    start_date: data.start_date
                        ? `${data.start_date}T${data.start_time ?? ''}`
                        : undefined,
                    end_date: data.end_date
                        ? `${data.end_date}T${data.end_time ?? ''}`
                        : undefined,
                    region: data.region || 'north-goa',
                },
                addSlug,
            });
        } catch (error) {
            console.log(error);
            const toastId = 'edit advert error toast';
            toast.error(`${t('errors.add-announcement-error')}`, { toastId });
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        setValue('country', 'india');

        dataAdvert && setMarkerPosition(dataAdvert.coordinates);
        dataAdvert?.slug && setValue('slug', dataAdvert?.slug);
        if (path[1] !== 'advertisement-editing')
            setValue('category', dataAdvert?.category);
    }, [dataAdvert, isSuccess, isSendError, path]);

    useEffect(() => {
        if (isSuccess) {
            const toastId = 'edit advert success toast';
            toast.success(`${t('add-page.edit-success')}`, { toastId });
            scrollToTop();
            setMarkerPosition(undefined);
            dispatch(
                fetchAdverts.util?.invalidateTags([
                    'Adverts',
                    'MyAnnouncements',
                ])
            );
            //очищаем кэш, чтобы обновить данные по объявлениям
            navigate('/my-announcements');
        }
        if (isSendError) {
            if (isSendError && sendError && 'data' in sendError) {
                Object.entries(
                    sendError.data as Record<keyof FormAddAnn, string[]>
                ).forEach((el) => {
                    const toastId = `edit advert ${el[0]} error toast`;
                    toast.error(`${t(`filters.${el[0]}`)}: ${el[1][0]}`, {
                        toastId,
                    });
                    setError(el[0] as keyof FormAddAnn, { message: el[1][0] });
                });
            }
        }
    }, [t, isSendError, isSuccess]); //чтобы уведомление всплыло один раз

    useEffect(() => {
        if (formState.errors) {
            const firstErrorKey = Object.keys(formState.errors)[0];
            const errorField = document.querySelector(
                `input[name="${firstErrorKey}"]`
            );
            if (errorField) {
                if (navigator.userAgent === 'safari') {
                    errorField.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                    });
                } else {
                    const y =
                        errorField.getBoundingClientRect().top +
                        window.scrollY -
                        80;

                    window.scrollTo({ top: y, behavior: 'smooth' });
                }
            }
        }
    }, [formState]);

    return (
        <>
            {isSendLoading && <LoadingWithBackgroundUpload />}
            {dataAdvert && (
                <section className={styles.add_ann}>
                    <form
                        className={styles.add_ann_form}
                        onSubmit={handleSubmit(onsubmit)}
                        id="form-edit-announcement"
                    >
                        <h1>{t('add-page.edit')}</h1>
                        {isLoading && user?.id && <LoadingWithBackground />}
                        {isLoading && <LoadingWithBackground />}
                        <>
                            {path[1] !== 'advertisement-editing' && (
                                <AnnouncementCategoryField
                                    setValue={setValue}
                                    control={control}
                                    formState={formState}
                                    defaultValue={dataAdvert.category}
                                />
                            )}
                            <AnnouncementRegion
                                setValue={setValue}
                                control={control}
                                defaultValue={dataAdvert.region}
                                formState={formState}
                            />
                            <AnnouncementCity
                                setValue={setValue}
                                control={control}
                                defaultRegion={dataAdvert.region}
                                defaultValue={dataAdvert.city}
                                formState={formState}
                                watch={watch}
                            />
                            <AnnouncementNameField
                                register={register}
                                formState={formState}
                                defaultValue={dataAdvert.title}
                            />
                            {dataAdvert?.category !== 'exchange_rate' && (
                                <AnnouncementPriceField
                                    register={register}
                                    formState={formState}
                                    defaultValue={dataAdvert.price}
                                    category={dataAdvert?.category}
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
                                setValue={setValue}
                                clearErrors={clearErrors}
                                setError={setError}
                                watch={watch}
                                editImages={dataAdvert?.images}
                            />
                            <YoutubeField
                                register={register}
                                defaultValue={dataAdvert?.youtube}
                                errors={formState.errors}
                            />
                            <AnnouncementLocationField
                                setValue={setValue}
                                markerPosition={markerPosition}
                                setMarkerPosition={setMarkerPosition}
                            />
                        </>
                        {/*)}*/}
                        <AnnouncementSubmitButton value="edit-advert" />
                    </form>
                </section>
            )}
        </>
    );
};
export default AdvertisementEditing;
