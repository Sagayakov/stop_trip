import { Suspense, lazy, useState } from 'react';
import { useForm } from 'react-hook-form';
// import { useGetFiltersQuery } from '../../app/api/fetchAdverts';
// import { FiltersType } from '../../app/api/types/filtersType';
import { AnnouncementSubmitButton } from '../../entities/addAnnouncementForm/universalFields';
const AnnouncementCategoryField = lazy(() => import('../../features/addAnnouncementForm/universalFields/AnnouncementCategoryField'));
const AnnouncementNameField = lazy(() => import('../../features/addAnnouncementForm/universalFields/AnnouncementNameFiled'));
const AnnouncementPriceField = lazy(() => import('../../features/addAnnouncementForm/universalFields/AnnouncementPriceField'));
const AnnouncementDescriptionField = lazy(() => import('../../features/addAnnouncementForm/universalFields/AnnouncementDescriptionField'));
const AnnouncementPhotoField = lazy(() => import('../../features/addAnnouncementForm/universalFields/AnnouncementPhotoField'));
const AnnouncementLocationField = lazy(() => import('../../features/addAnnouncementForm/universalFields/AnnouncementLocationField'));
const OptionalFields = lazy(() => import('../../widgets/addAnnouncement/OptionalFields'));
import { FormAddAnn, /*SelectOption*/ } from './libr/AnnouncementFormTypes';
import './libr/addAnnouncement.scss';
import { LoadingWithBackground } from '../../entities/loading/LoadingWithBackground';

interface Image {
    image: string;
}

export const AddAnnouncementPage = () => {
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
    // const { data } = useGetFiltersQuery('');

    const [selectedImages, setSelectedImages] = useState<Image[] | undefined>();
    const [markerPosition, setMarkerPosition] = useState<string | undefined>();
    const [descript, setDescript] = useState<string | undefined>();

    const onsubmit = async (data: FormAddAnn) => {
        descript && setValue('description', descript);

        console.log(data);
        setSelectedImages(undefined);
        setMarkerPosition(undefined);
        setDescript(undefined);
        reset()
        setValue('category', data.category);
    };

    // interface IFieldData {
    //     job?: Record<string, SelectOption[]>;
    //     property?: Record<string, SelectOption[]>;
    //     categoryList: SelectOption[] | undefined;
    // }

    // type ChoicesType = {
    //     name: string;
    //     choices: SelectOption[];
    // };

    // const useGetFieldsData = (data: FiltersType | undefined) => {
    //     // eslint-disable-next-line prefer-const
    //     let fieldData: IFieldData = {
    //         categoryList: [],
    //     };

    //     function transform(
    //         objects: ChoicesType[]
    //     ): Record<string, SelectOption[]> {
    //         const transformedObject: Record<string, SelectOption[]> = {};

    //         for (const obj of objects) {
    //             transformedObject[obj.name] = obj.choices;
    //         }

    //         return transformedObject;
    //     }

    //     if (data) {
    //         // console.log(data);
    //         const params = data.params;
    //         const job: ChoicesType[] = [];
    //         const property: ChoicesType[] = [];
    //         for (let i = 0; i < params.length; i++) {
    //             if (params[i].name.includes('job')) {
    //                 job.push(params[i] as ChoicesType);
    //             }
    //             fieldData.job = transform(job);
    //             if (params[i].name === 'category') {
    //                 const categoryList = (params[i] as ChoicesType)
    //                     .choices as SelectOption[];
    //                 fieldData.categoryList = categoryList;
    //             }
    //             if (params[i].name.includes('property')) {
    //                 property.push(params[i] as ChoicesType);
    //             }
    //             fieldData.property = transform(property);
    //         }
    //     }
    //     // console.log(fieldData)
    //     return fieldData;
    // };

    // const { categoryList } = useGetFieldsData(data);
    return (
        <>
            <section className="add-ann">
                <form
                    className="add-ann-form"
                    onSubmit={handleSubmit(onsubmit)}
                >
                    <Suspense fallback={<LoadingWithBackground />}>
                        <h1>Размещение объявления</h1>
                        <AnnouncementCategoryField
                            control={control}
                            setValue={setValue}
                            formState={formState}
                            // categoryList={categoryList}
                        />
                        <AnnouncementNameField
                            register={register}
                            formState={formState}
                        />
                        <AnnouncementPriceField
                            register={register}
                            formState={formState}
                        />
                        <AnnouncementDescriptionField
                            descript={descript}
                            setDescript={setDescript}
                        />
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
