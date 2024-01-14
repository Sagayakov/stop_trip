import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss';
import 'pages/addAnnouncement/libr/selectAddAnnouncement.scss';
import { useForm } from 'react-hook-form';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { useTranslation } from 'react-i18next';
import {
    useEditAdvertMutation,
    useGetAdvertBySlugQuery,
} from 'app/api/fetchAdverts.ts';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    AnnouncementCategoryField,
    AnnouncementCity,
    AnnouncementDescriptionField,
    AnnouncementLocationField,
    AnnouncementNameField,
    AnnouncementPriceField,
    AnnouncementRegion,
    OptionalFields,
} from 'pages/addAnnouncement/lazyFields/lazyFields.ts';
import { useEffect, useLayoutEffect, useState } from 'react';
import { LoadingWithBackground } from 'entities/loading/LoadingWithBackground.tsx';
import { getTokensFromStorage } from 'widgets/header/libr/authentication/getTokensFromStorage.ts';
import { AnnouncementSubmitButton } from 'entities/addAnnouncementForm/universalFields';
import { scrollToTop } from 'shared/utils/scrollToTop.ts';
import { toast } from 'react-toastify';
import { getAccessTokenWithRefresh } from 'shared/model/getAccessTokenWithRefresh.ts';
import { useAppDispatch } from 'app/store/hooks.ts';
import { useGetUserQuery } from 'app/api/fetchUser.ts';

const AdvertisementEditing = () => {
    const { t } = useTranslation();
    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState,
        watch,
    } = useForm<FormAddAnn>({
        reValidateMode: 'onBlur',
    });
    const dispatch = useAppDispatch();

    const category = watch('category');

    const path = useLocation().pathname.split('/');
    const slug = path[path.length - 1];

    const { data: dataAdvert, isLoading } = useGetAdvertBySlugQuery(slug);
    const { accessToken } = getTokensFromStorage();
    const { data: user } = useGetUserQuery(accessToken);

    const [editAdvert, { isLoading: isSendLoading }] = useEditAdvertMutation();
    const [markerPosition, setMarkerPosition] = useState<string | undefined>(
        dataAdvert?.coordinates
    );

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
        const { refreshToken } = getTokensFromStorage();
        await getAccessTokenWithRefresh(dispatch, refreshToken); //сначала дожидаемся новый accessToken, затем шлем пост запрос
        const { accessToken } = getTokensFromStorage();
        try {
            const res = await editAdvert({ body: data, addSlug, accessToken });
            res && toast.success(t('advert-page.advertisement-added'));
            scrollToTop();
        } catch (errors) {
            console.log(errors);
            toast.error(`${t('errors.add-announcement-error')}`);
        }
    };

    useEffect(() => {
        dataAdvert && setMarkerPosition(dataAdvert.coordinates);
        setValue('country', 'india');
    }, [dataAdvert, setValue]);

    return (
        <>
            <section className={styles.add_ann}>
                <h1>{t('add-page.edit')}</h1>
                <form
                    className={styles.add_ann_form}
                    onSubmit={handleSubmit(onsubmit)}
                    id="form-edit-announcement"
                >
                    {isLoading && user?.id && <LoadingWithBackground />}
                    {isSendLoading && <LoadingWithBackground />}
                    {dataAdvert && (
                        <>
                            <AnnouncementCategoryField
                                setValue={setValue}
                                control={control}
                                formState={formState}
                                defaultValue={dataAdvert.category}
                            />
                            <AnnouncementRegion
                                setValue={setValue}
                                control={control}
                                defaultValue={dataAdvert.region}
                            />
                            <AnnouncementCity
                                setValue={setValue}
                                control={control}
                                defaultValue={dataAdvert.city}
                            />
                            <AnnouncementNameField
                                register={register}
                                formState={formState}
                                defaultValue={dataAdvert.title}
                            />
                            {category !== "exchange_rate" && <AnnouncementPriceField
                                register={register}
                                formState={formState}
                                defaultValue={dataAdvert.price}
                                watch={watch}
                            />}
                            <AnnouncementDescriptionField
                                // descript={descript}
                                // setDescript={setDescript}
                                defaultValue={dataAdvert.description}
                                control={control}
                            />
                            <OptionalFields
                                control={control}
                                register={register}
                                setValue={setValue}
                                watch={watch}
                                data={dataAdvert}
                            />
                            {/*photo*/}
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
        </>
    );
};
export default AdvertisementEditing;
