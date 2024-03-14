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
import { useNavigate } from 'react-router-dom';

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

    const [markerPosition, setMarkerPosition] = useState<string | undefined>();
    const [modalSuccess, setModalSuccess] = useState(false);
    const { t } = useTranslation();
    const category = watch('category');
    const navigate = useNavigate();

    const [addAdvert, { isSuccess, isError, isLoading, error }] =
        useAddAdvertMutation();

    useGetSelectOptionsQuery(''); //запрашиваем данные, потом будем доставать из кэша

    const onsubmit = async (data: FormAddAnn) => {
        setValue('country', 'india');
        console.log(data);
        try {
            const nonNullableData = Object.entries(data).filter(
                (el) => el[1] !== null && el[1] !== undefined && el[1] !== ''
            );
            await addAdvert({
                ...Object.fromEntries(nonNullableData),
                start_date: data.start_date
                    ? `${data.start_date}T${data.start_time ?? ''}`
                    : undefined,
                end_date: data.end_date
                    ? `${data.end_date}T${data.end_time ?? ''}`
                    : undefined,
                region: data.region || 'north-goa',
            });
        } catch (error) {
            console.log(error);
            const toastId = 'add advert error toast';
            toast.error(`${t('errors.add-announcement-error')}`, { toastId });
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handleClick = () => {
        setModalSuccess(false);
        navigate('/my-announcements');
    };

    useEffect(() => {
        if (isSuccess) {
            setModalSuccess(true);
            setMarkerPosition(undefined);
            dispatch(
                fetchAdverts.util?.invalidateTags([
                    'Adverts',
                    'MyAnnouncements',
                ])
            );
            //очищаем кэш, чтобы обновить данные по объявлениям
            reset();
        }
        if (isError && error && 'data' in error) {
            Object.entries(
                error.data as Record<keyof FormAddAnn, string[]>
            ).forEach((el) => {
                const toastId = `add advert ${el[0]} error toast`;
                toast.error(`${t(`filters.${el[0]}`)}: ${el[1][0]}`, {
                    toastId,
                });
                setError(el[0] as keyof FormAddAnn, { message: el[1][0] });
            });
        }
        setValue('country', 'india');
    }, [isSuccess, isError]);

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
    }, [formState]); // для скролла в сафари

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
                            watch={watch}
                        />
                        <AnnouncementNameField
                            register={register}
                            formState={formState}
                        />
                        {category !== 'exchange_rate' && (
                            <AnnouncementPriceField
                                register={register}
                                formState={formState}
                                category={category}
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
                            watch={watch}
                            setValue={setValue}
                            setError={setError}
                            clearErrors={clearErrors}
                        />
                        <YoutubeField
                            register={register}
                            errors={formState.errors}
                        />
                        <AnnouncementLocationField
                            setValue={setValue}
                            markerPosition={markerPosition}
                            setMarkerPosition={setMarkerPosition}
                        />
                        <AnnouncementSubmitButton
                            isDisabled={!formState.isValid}
                        />
                    </Suspense>
                </form>
            </section>
        </>
    );
};

export default AddAnnouncementPage;
