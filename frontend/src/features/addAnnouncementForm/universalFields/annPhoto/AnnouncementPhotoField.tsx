import { useCallback, useEffect, useRef, useState } from 'react';
import {
    ErrorOption,
    FieldPath,
    UseFormSetValue,
    UseFormWatch,
} from 'react-hook-form';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { MiniLoadPhoto } from 'shared/ui/icons/loadPhoto';
import { useTranslation } from 'react-i18next';
import styles from './annPhoto.module.scss';
import { LastAdvertsImages } from 'app/api/types/lastAdvertsTypes.ts';
import { toFixed } from 'ol/math';
import LoadPhotoBtn from './annPhotoField/LoadPhotoBtn';

interface Props {
    watch: UseFormWatch<FormAddAnn>;
    setValue: UseFormSetValue<FormAddAnn>;
    setError: (
        name: FieldPath<FormAddAnn> | `root.${string}` | 'root',
        error: ErrorOption,
        options?: { shouldFocus: boolean }
    ) => void;
    clearErrors: (
        name?:
            | FieldPath<FormAddAnn>
            | FieldPath<FormAddAnn>[]
            | `root.${string}`
            | 'root'
    ) => void;
    editImages?: LastAdvertsImages[];
}

const AnnouncementPhotoField = ({
    watch,
    setValue,
    editImages: img,
    setError,
    clearErrors,
}: Props) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const { t } = useTranslation();
    const [previewImages, setPreviewImages] = useState<string[]>([]);
    const [deleteIdArray, setDeleteIdArray] = useState<number[]>([]);
    const [editImages, setEditImages] = useState<
        LastAdvertsImages[] | undefined
    >(img);
    const [imgSize, setImgSize] = useState(0);
    const images = watch('images');
    const uploadImg = watch('upload_images');

    const removeImage = (index: number) => {
        if (images) {
            const newImages = [...images];
            newImages.splice(index, 1); //удаляем элемент по индексу
            setValue('images', newImages);

            const newPreviews = [...previewImages];
            newPreviews.splice(index, 1);

            setPreviewImages(newPreviews);
        }
        if (uploadImg) {
            const newImages = [...uploadImg];
            newImages.splice(index, 1); //удаляем элемент по индексу
            setValue('upload_images', newImages);

            const newPreviews = [...previewImages];
            newPreviews.splice(index, 1);

            setPreviewImages(newPreviews);
        }
    }; //удаление фотографий при загрузке

    const removeImageEdit = (id: number) => {
        setEditImages((prevImages) =>
            prevImages!.filter((img) => img.id !== id)
        );
        setDeleteIdArray([...deleteIdArray, id]);
    }; //удаление фотографий при редактировании

    const photoCounter = () => {
        return previewImages?.length || 0;
    };

    useEffect(() => {
        setValue('delete_images', deleteIdArray);
    }, [deleteIdArray]); //на бэк передаем массив id картинок, которые удаляем

    /* const getImgSize = useCallback(() => {
        let imgSize = 0;
        let uploadImgSize = 0;
        images?.forEach((img) => (imgSize += img.length));
        uploadImg?.forEach((img) => (uploadImgSize += img.length));
        const size = toFixed((imgSize + uploadImgSize) / 1024 / 1024, 2);
        setImgSize(size);
        return size;
    }, [images, uploadImg]);

    useEffect(() => {
        getImgSize();
        if (imgSize > 60) {
            setError('upload_images', { type: 'max' });
            setError('images', { type: 'max' });
        } else {
            clearErrors('images');
            clearErrors('upload_images');
        }
    }, [images, uploadImg]); */

    return (
        <div className={`${styles.ann_field} ${styles.mobile_add_photo}`}>
            <h3>{`${t('add-page.photo')}:`}</h3>
            <p className={styles.iphone_warning}>
                {t('add-page.iphone_warning')}
            </p>
            <div className={styles.loadphoto}>
                <div className={styles.loadphoto_btn_view}>
                    <LoadPhotoBtn
                        setValue={setValue}
                        inputRef={inputRef}
                        setPreviewImages={setPreviewImages}
                        imgSize={imgSize}
                        previewImages={previewImages}
                        watch={watch}
                    />
                    <div className={styles.loadphoto_counter}>
                        <div className={styles.loadphoto_counter_wrapper}>
                            <MiniLoadPhoto />
                            {t('add-page.uploaded')} {photoCounter()}/10
                        </div>
                        <div>{imgSize}/60mb</div>
                    </div>
                </div>
                <div className={styles.preview}>
                    {' '}
                    {/*это редактируемые фотографии*/}
                    {editImages?.map((img) => (
                        <div
                            key={img.id}
                            className={styles.btn_view_delete}
                            onClick={() => removeImageEdit(img.id)}
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
                            onClick={() => removeImage(index)}
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
                    {/*это загружаемые фотографии*/}
                </div>
            </div>
        </div>
    );
};

export default AnnouncementPhotoField;
