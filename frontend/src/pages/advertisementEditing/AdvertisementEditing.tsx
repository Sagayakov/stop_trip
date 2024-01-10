import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss';
import 'pages/addAnnouncement/libr/selectAddAnnouncement.scss';
import { useForm } from 'react-hook-form';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { useTranslation } from 'react-i18next';
import {
    useEditAdvertMutation,
    useGetAdvertByIdQuery,
} from 'app/api/fetchAdverts.ts';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    AnnouncementCategoryField, AnnouncementCity,
    AnnouncementDescriptionField,
    AnnouncementLocationField,
    AnnouncementNameField,
    AnnouncementPriceField, AnnouncementRegion,
    OptionalFields,
} from 'pages/addAnnouncement/lazyFields/lazyFields.ts';
import { useEffect, useState } from 'react';
import { LoadingWithBackground } from 'entities/loading/LoadingWithBackground.tsx';
import { getTokensFromStorage } from 'widgets/header/libr/authentication/getTokensFromStorage.ts';
import { AnnouncementSubmitButton } from 'entities/addAnnouncementForm/universalFields';
import { scrollToTop } from 'shared/utils/scrollToTop.ts';
import { toast } from 'react-toastify';
import { getAccessTokenWithRefresh } from 'shared/model/getAccessTokenWithRefresh.ts';
import { useAppDispatch } from 'app/store/hooks.ts';
const AdvertisementEditing = () => {
    const { t } = useTranslation();
    const {
        register,
        handleSubmit,
        // reset,
        control,
        setValue,
        formState,
        watch,
    } = useForm<FormAddAnn>({
        reValidateMode: 'onBlur',
    });
    const dispatch = useAppDispatch();

    const path = useLocation().pathname.split('/');
    const id = path[path.length - 1];
    const { data: dataAdvert, isLoading } = useGetAdvertByIdQuery(id);
    const [editAdvert, { isLoading: isSendLoading }] = useEditAdvertMutation();
    const [descript, setDescript] = useState<string | undefined>(
        dataAdvert?.description
    );
    const [markerPosition, setMarkerPosition] = useState<string | undefined>(
        dataAdvert?.coordinates
    );
    const [ownerId, setOwnerId] = useState<number | undefined>(undefined);
    const { refreshToken } = getTokensFromStorage();
    const addId = dataAdvert ? dataAdvert.id : 0;
    const navigate = useNavigate();

    useEffect(() => {
        const url = import.meta.env.VITE_BASE_URL;
        getAccessTokenWithRefresh(dispatch, refreshToken);//сначала дожидаемся новый accessToken
        const { accessToken } = getTokensFromStorage();
        const getOwnerId = async (token: string) => {
            try {
                const response = await fetch(`${url}/api/auth/users/me/`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.status === 200) {
                    const data = await response.json();
                    setOwnerId(data.id);
                }
            } catch (error) {
                console.log(error);
            }
        };
        getOwnerId(accessToken);
    }, []);

    if (!isLoading && ownerId && ownerId !== dataAdvert?.owner.id) {
        navigate({ pathname: '/404' }); //если прошла загрузка, мы получили id хозяина объявления и он не равен нашему id, то отправляем на 404
    }

    const onsubmit = async (data: FormAddAnn) => {
        // setValue('country', 'Индия');
        // const
        await getAccessTokenWithRefresh(dispatch, refreshToken);//сначала дожидаемся новый accessToken, затем шлем пост запрос
        const { accessToken } = getTokensFromStorage();
        try {
            const res = await editAdvert({ body: data, addId, accessToken });
            res && toast.success(t('advert-page.advertisement-added'));
            scrollToTop();
        } catch (errors) {
            console.log(errors);
            toast.error(`${t('errors.add-announcement-error')}`);
        }
    };

    useEffect(() => {
        dataAdvert && setMarkerPosition(dataAdvert.coordinates)
    }, [dataAdvert]);

    return (
        <>
            <section className={styles.add_ann}>
                <h1>{t('add-page.edit')}</h1>
                <form
                    className={styles.add_ann_form}
                    onSubmit={handleSubmit(onsubmit)}
                    id="form-edit-announcement"
                >
                    {isLoading && ownerId && <LoadingWithBackground />}
                    {isSendLoading && <LoadingWithBackground />}
                    {dataAdvert && (
                        <>
                            <AnnouncementCategoryField
                                setValue={setValue}
                                control={control}
                                formState={formState}
                                defaultValue={dataAdvert.category}
                            />
                            <AnnouncementRegion setValue={setValue} control={control} defaultValue={dataAdvert.region} />
                            <AnnouncementCity setValue={setValue} control={control} defaultValue={dataAdvert.city} />
                            <AnnouncementNameField
                                register={register}
                                formState={formState}
                                defaultValue={dataAdvert.title}
                            />
                            <AnnouncementPriceField
                                register={register}
                                formState={formState}
                                defaultValue={dataAdvert.price}
                            />
                            <AnnouncementDescriptionField
                                descript={descript}
                                setDescript={setDescript}
                                defaultValue={dataAdvert.description}
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
                    {/*<input type="submit" />*/}
                </form>
            </section>
        </>
    );
};
export default AdvertisementEditing;
