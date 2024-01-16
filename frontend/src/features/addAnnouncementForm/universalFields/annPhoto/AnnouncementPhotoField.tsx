import { useEffect, useRef, useState } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { MiniLoadPhoto } from 'shared/ui/icons/loadPhoto';
import { useTranslation } from 'react-i18next';
import styles from './annPhoto.module.scss';
import { LoadPhotoBtn } from 'features/addAnnouncementForm/universalFields/annPhoto/annPhotoField/LoadPhotoBtn.tsx';


interface Props {
    selectedImages: File[] | undefined;
    setSelectedImages: React.Dispatch<
        React.SetStateAction<File[] | undefined>
    >;
    setValue: UseFormSetValue<FormAddAnn>;
}

const AnnouncementPhotoField = ({ selectedImages, setSelectedImages, setValue }: Props) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const { t } = useTranslation();
    const [previewImages, setPreviewImages] = useState<string[]>([]);

    const removeImage = (index: number) => {
        if (selectedImages) {
            const newImages = [...selectedImages];
            newImages.splice(index, 1);
            setSelectedImages(newImages);

            const newPreviews = [...previewImages];
            newPreviews.splice(index, 1);
            setPreviewImages(newPreviews);
        }
    };
    useEffect(() => {
        if (selectedImages) {
            setValue('images', selectedImages);
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
                    />
                    <div className={styles.loadphoto_counter}>
                        <div className={styles.loadphoto_counter_wrapper}>
                            <MiniLoadPhoto />
                            {t('add-page.uploaded')}{' '}
                            {(selectedImages && selectedImages.length) || 0}/10
                        </div>
                    </div>
                </div>
                {selectedImages && selectedImages.length > 0 && (
                    <div className={styles.preview}>
                        {previewImages.map((preview, index) => (
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
                    </div>
                )}
            </div>
        </div>
    );
};

export default AnnouncementPhotoField;
