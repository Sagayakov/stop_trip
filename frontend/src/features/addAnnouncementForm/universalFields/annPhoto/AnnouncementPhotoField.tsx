import { SetStateAction, useEffect, useRef, useState } from 'react';
import { ErrorOption, FieldPath, UseFormSetValue } from 'react-hook-form';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { MiniLoadPhoto } from 'shared/ui/icons/loadPhoto';
import { useTranslation } from 'react-i18next';
import styles from './annPhoto.module.scss';
import { LoadPhotoBtn } from 'features/addAnnouncementForm/universalFields/annPhoto/annPhotoField/LoadPhotoBtn.tsx';
import { LastAdvertsImages } from 'app/api/types/lastAdvertsTypes.ts';
import { useLocation } from 'react-router-dom';
import { toFixed } from 'ol/math';


interface Props {
    selectedImages: File[] | undefined;
    setSelectedImages: React.Dispatch<React.SetStateAction<File[] | undefined>>;
    setValue: UseFormSetValue<FormAddAnn>;
    editImages?: LastAdvertsImages[] | undefined;
    setEditImages?: React.Dispatch<React.SetStateAction<LastAdvertsImages[] | undefined>>
    imgSize: number;
    setImgSize: React.Dispatch<SetStateAction<number>>;
    setError: (name: (FieldPath<FormAddAnn> | `root.${string}` | "root"), error: ErrorOption, options?: {shouldFocus: boolean}) => void;
    clearErrors: (name?: (FieldPath<FormAddAnn> | FieldPath<FormAddAnn>[] | `root.${string}` | "root")) => void
}

const AnnouncementPhotoField = ({
    selectedImages,
    setSelectedImages,
    setValue,
    editImages,
    setEditImages,
    setImgSize,
    imgSize,
    setError,
    clearErrors
}: Props) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const { t } = useTranslation();
    const [previewImages, setPreviewImages] = useState<string[]>([]);
    const [deleteIdArray, setDeleteIdArray] = useState<number[]>([]);
    const path = useLocation().pathname.split('/');

    const removeImageUpload = (index: number) => {
        if (selectedImages) {
            const newImages = [...selectedImages];
            newImages.splice(index, 1);
            setSelectedImages(newImages);

            const newPreviews = [...previewImages];
            newPreviews.splice(index, 1);
            setPreviewImages(newPreviews);
        }
    };

    const removeImageEdid = (id: number) => {
        if(editImages && editImages.length > 0){
            setEditImages && setEditImages(prevImages => prevImages!.filter(img => img.id !== id));
            setDeleteIdArray([...deleteIdArray, id]);
        }
    };

    const photoCounter = () => {
        if(path[1] == 'advertisement-editing'){
            if(editImages && selectedImages){
                return selectedImages.length + editImages.length
            } else if (editImages){
                return editImages.length
            } else if(selectedImages){
                return selectedImages.length
            } else return 0
        } else{
            return selectedImages?.length || 0
        }
    }

    useEffect(() => {
        if (selectedImages) {
            if(path[1] === 'advertisement-editing'){
                setValue('upload_images', selectedImages)
            }else{
                setValue('images', selectedImages);
            }
        }//если добаляем картинки, то их присваиваем полю upload_images
        // если же находимся на странице добавления объявлений, то присваиваем полю
        if(editImages){
            setValue('delete_images', deleteIdArray); //на бэк передаем массив id картинок, которые удаляем
        }
    }, [selectedImages, setValue, deleteIdArray]);
    
    useEffect(() => {
        if(selectedImages) {
            const size = selectedImages.reduce((acc, img) => {
                acc += img.size;
                return acc;
            }, 0)
            if(size > 52428800) {
                setError('upload_images', {});
                setError('images', {});
            } else{
                clearErrors('images');
                clearErrors('upload_images');
            }
            setImgSize(size);
        }
    }, [selectedImages]);


    return (
        <div className={`${styles.ann_field} ${styles.mobile_add_photo}`}>
            <h3>{`${t('add-page.photo')}:`}</h3>
            <div className={styles.loadphoto}>
                <div className={styles.loadphoto_btn_view}>
                    <LoadPhotoBtn
                        inputRef={inputRef}
                        selectedImages={selectedImages}
                        setSelectedImages={setSelectedImages}
                        setPreviewImages={setPreviewImages}
                        imgSize={imgSize}
                    />
                    <div className={styles.loadphoto_counter}>
                        <div className={styles.loadphoto_counter_wrapper}>
                            <MiniLoadPhoto />
                            {t('add-page.uploaded')} {photoCounter()}/10
                        </div>
                        <div>
                            {toFixed((imgSize / 1024 / 1024), 2)}/50mb
                        </div>
                    </div>
                </div>
                {((selectedImages && selectedImages.length > 0) ||
                    editImages) && (
                    //если при редактировании есть старые фотки, или если добавляем новые, то отрисовываем их
                    <div className={styles.preview}>
                        {editImages?.map((img) => (
                            <div
                                key={img.id}
                                className={styles.btn_view_delete}
                                onClick={() => removeImageEdid(img.id)}
                            >
                                <img
                                    key={img.id}
                                    src={img.image}
                                    alt={`Preview ${img.id}`}
                                    style={{
                                        maxWidth: '100px',
                                        margin: '5px',
                                    }}
                                />
                                <span>&#x2716;</span>
                            </div>
                        ))}
                        {previewImages?.map((preview, index) => (
                            <div
                                key={index}
                                className={styles.btn_view_delete}
                                onClick={() => removeImageUpload(index)}
                            >
                                <img
                                    key={index}
                                    src={preview}
                                    alt={`Preview ${index}`}
                                    style={{
                                        maxWidth: '100px',
                                        margin: '5px',
                                    }}
                                />
                                <span>&#x2716;</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AnnouncementPhotoField;
