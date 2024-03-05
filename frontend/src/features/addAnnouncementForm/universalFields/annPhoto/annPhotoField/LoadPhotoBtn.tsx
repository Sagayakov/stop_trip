import { LoadPhotoIcon } from 'shared/ui/icons/loadPhoto';
import { RefObject } from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../annPhoto.module.scss'
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { convertFilesToBase64Strings } from 'pages/addAnnouncement/libr/convertFileToBinary.ts';
import { useLocation } from 'react-router-dom';

interface Props{
    inputRef: RefObject<HTMLInputElement>;
    setPreviewImages: React.Dispatch<React.SetStateAction<string[]>>;
    imgSize: number;
    setValue: UseFormSetValue<FormAddAnn>;
    previewImages: string[];
    watch: UseFormWatch<FormAddAnn>;
}

export const LoadPhotoBtn = ({
    inputRef,
    setPreviewImages,
    imgSize,
    setValue,
    previewImages,
    watch,
}:Props) => {
    const { t } = useTranslation();
    const path = useLocation().pathname.split('/');
    const images = watch('images');
    const uploadImages = watch('upload_images');
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = event.target.files
        console.log(uploadImages);
        if(fileList){
            if(path[1] === 'advertisement-editing'){
                convertFilesToBase64Strings(fileList)
                    .then((base64Strings) => {
                        if(uploadImages){
                            base64Strings.push(...uploadImages);//если что-то было, пушим в массив
                        }
                        setValue('upload_images', base64Strings as string[]);
                    })
                    .catch((error) => {
                        console.error('Ошибка:', error);
                    });
            } else {
                convertFilesToBase64Strings(fileList)
                    .then((base64Strings) => {
                        if (images) {
                            base64Strings.push(...images);//если что-то было, пушим в массив
                        }
                        setValue('images', base64Strings as string[])
                    })
                    .catch((error) => {
                        console.error('Ошибка:', error);
                    });
            }//если мы на странице редактирования, то setValue для поля upload_images
            //если на странице добавления объявлений, то для поля images

            Array.from(fileList).forEach((file) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = () => {
                    setPreviewImages((prevPreviews) => [...prevPreviews, reader.result as string]);
                }; //для предпросмотра
            });
        }
    };


    return (
        <div>
            <div
                className={styles.loadphoto_btn}
                onClick={() => inputRef.current?.click()}
            >
                <LoadPhotoIcon />
                {t('add-page.choose-photo')}
                <input
                    className={styles.loadphoto_btn_hidden}
                    type="file"
                    ref={inputRef}
                    accept="image/*,.img,.png,.jpeg,.jpg"
                    multiple={true}
                    max={11}
                    onChange={handleImageChange}
                />
            </div>
            <div className={styles.ann_field_err}>
                {previewImages &&
                    previewImages.length > 10 &&
                    `${t('add-page.please-select')}`}
                {imgSize > 52428800 && <p>{t('add-page.limit')}</p>}
            </div>
        </div>
    );
};