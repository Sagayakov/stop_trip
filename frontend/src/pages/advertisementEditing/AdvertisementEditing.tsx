import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss';
import 'pages/addAnnouncement/libr/selectAddAnnouncement.scss'
import { useForm } from 'react-hook-form';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { useTranslation } from 'react-i18next';
import { useGetAdvertByIdQuery } from 'app/api/fetchAdverts.ts';
import { useLocation } from 'react-router-dom';
import {
    AnnouncementCategoryField, AnnouncementDescriptionField,
    AnnouncementNameField,
    AnnouncementPriceField,
} from 'pages/addAnnouncement/lazyFields/lazyFields.ts';
import { useState } from 'react';
const AdvertisementEditing = () => {
    const { t } = useTranslation();
    const {
        register,
        handleSubmit,
        // reset,
        control,
        setValue,
        formState,
    } = useForm<FormAddAnn>({
        reValidateMode: 'onBlur',
    });
    const path = useLocation().pathname.split('/');
    const id = path[path.length - 1];
    const { data } = useGetAdvertByIdQuery(id);
    const [descript, setDescript] = useState<string | undefined>(data?.description);
    console.log(data);
    const onsubmit = () => {};

    return (
        <section className={styles.add_ann}>
            <h1>{t('add-page.edit')}</h1>
            <form
                className={styles.add_ann_form}
                onSubmit={handleSubmit(onsubmit)}
            >
                {data && (
                    <>
                        <AnnouncementCategoryField
                            setValue={setValue}
                            control={control}
                            formState={formState}
                            defaultValue={data.category}
                        />
                        <AnnouncementNameField register={register} formState={formState} defaultValue={data.title} />
                        <AnnouncementPriceField register={register} formState={formState} defaultValue={data.price} />
                        <AnnouncementDescriptionField descript={descript} setDescript={setDescript} defaultValue={data.description} />

                    </>
                )}
            </form>
        </section>
    );
};
export default AdvertisementEditing;
