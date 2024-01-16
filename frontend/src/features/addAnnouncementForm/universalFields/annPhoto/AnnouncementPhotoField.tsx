import { useEffect, useRef } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { MiniLoadPhoto } from 'shared/ui/icons/loadPhoto';
import { useTranslation } from 'react-i18next';
import styles from './annPhoto.module.scss';
import { LoadPhotoBtn } from 'features/addAnnouncementForm/universalFields/annPhoto/annPhotoField/LoadPhotoBtn.tsx';
import { LoadPhotoIcons } from 'features/addAnnouncementForm/universalFields/annPhoto/annPhotoField/LoadPhotoIcons.tsx';

interface Props {
    selectedImages: File | undefined;
    setSelectedImages: React.Dispatch<
        React.SetStateAction<File | undefined>
    >;
    setValue: UseFormSetValue<FormAddAnn>;
}
// interface Image {
//     image: string;
// }

const AnnouncementPhotoField = ({
    selectedImages,
    setSelectedImages,
    setValue,
}: Props) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const { t } = useTranslation();

    // const removeImage = (index: number) => {
    //     if (selectedImages) {
    //         const newImages = [...selectedImages];
    //         newImages.splice(index, 1);
    //         setSelectedImages(newImages);
    //     }
    // };

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
                        setSelectedImages={setSelectedImages}
                    />
                    {selectedImages &&
                        <div className={styles.loadphoto_btn_view_list}>
                            <div
                                className={styles.loadphoto_btn_view_delete}
                                // onClick={() => removeImage(index)}
                            >
                                <p>{selectedImages.name}</p>
                                <span>&#x2716;</span>
                            </div>
                        </div>
                    }
                    {/*{selectedImages && selectedImages.length > 0 && (*/}
                    {/*    <div className={styles.loadphoto_btn_view_list}>*/}
                    {/*         {selectedImages.map((image, index) => (*/}
                    {/*                 <div*/}
                    {/*                     key={index}*/}
                    {/*                     className={*/}
                    {/*                         styles.loadphoto_btn_view_delete*/}
                    {/*                     }*/}
                    {/*                     onClick={() => removeImage(index)}*/}
                    {/*                 >*/}
                    {/*                     <p>{image.name}</p>*/}
                    {/*                     <span>&#x2716;</span>*/}
                    {/*                 </div>*/}
                    {/*             ))}*/}
                    {/*     </div>*/}
                    {/* )}*/}
                </div>
                <LoadPhotoIcons selectedImages={selectedImages} />
                <div className={styles.loadphoto_counter}>
                    <div className={styles.loadphoto_counter_wrapper}>
                        <MiniLoadPhoto />
                        {t('add-page.uploaded')}{' '}
                        {/*{(selectedImages && selectedImages.length) || 0}/10*/}
                    </div>
                </div>
            </div>
            <div className={styles.ann_field_err}>
                {/*{selectedImages &&*/}
                {/*    selectedImages.length > 10 &&*/}
                {/*    `${t('add-page.please-select')}`}*/}
            </div>
        </div>
    );
};

export default AnnouncementPhotoField;
