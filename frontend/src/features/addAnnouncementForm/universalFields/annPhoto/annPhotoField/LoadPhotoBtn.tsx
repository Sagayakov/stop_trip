import { LoadPhotoIcon } from 'shared/ui/icons/loadPhoto';
import { RefObject } from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../annPhoto.module.scss';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { convertFilesToBase64Strings } from 'pages/addAnnouncement/libr/convertFileToBinary.ts';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import heic2any from 'heic2any';
import { useState } from 'react';
import { LoadingWithBackground } from 'entity/loading/LoadingWithBackground';

const allowableExtensions = [
    'image/png',
    'image/heic',
    'image/heif',
    'image/jpg',
    'image/jpeg',
    'image/img',
    'png',
    'heic',
    'HEIC',
    'heif',
    'jpg',
    'jpeg',
    'img',
];

interface Props {
    inputRef: RefObject<HTMLInputElement>;
    setPreviewImages: React.Dispatch<React.SetStateAction<string[]>>;
    imgSize: number;
    setValue: UseFormSetValue<FormAddAnn>;
    previewImages: string[];
    watch: UseFormWatch<FormAddAnn>;
}

const LoadPhotoBtn = ({
    inputRef,
    setPreviewImages,
    setValue,
    previewImages,
    watch,
    imgSize,
}: Props) => {
    const { t } = useTranslation();
    const path = useLocation().pathname.split('/');
    const images = watch('images');
    const uploadImages = watch('upload_images');
    const [isLoading, setIsLoading] = useState(false);

    const handleImageChange = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setIsLoading(true);
        const fileList = event.target.files;
        if (fileList) {
            for (const file of fileList) {
                //const fileType = file.type.split('.');
                //const extension = fileType[fileType.length - 1];

                const fileTypeFromName = file.name.split('.');
                const extensionFromName =
                    fileTypeFromName[fileTypeFromName.length - 1];

                if (
                    /* !allowableExtensions.includes(extension) || */
                    !allowableExtensions.includes(extensionFromName)
                ) {
                    const toastId = 'load photo ext toast';
                    toast.error(t('add-page.extension'), { toastId });
                    return;
                }
            } // проверяем расширение файла
            if (path[1] === 'advertisement-editing') {
                const base64Strings =
                    await convertFilesToBase64Strings(fileList);
                if (uploadImages) {
                    base64Strings.push(...uploadImages); //если что-то было, пушим в массив
                }
                setValue('upload_images', base64Strings as string[]);
            } else {
                const base64Strings =
                    await convertFilesToBase64Strings(fileList);
                if (images) {
                    base64Strings.push(...images); //если что-то было, пушим в массив
                }
                setValue('images', base64Strings as string[]);
            } //если мы на странице редактирования, то setValue для поля upload_images
            //если на странице добавления объявлений, то для поля images

            Array.from(fileList).forEach(async (file) => {
                if (
                    file.name.includes('.HEIC') ||
                    file.name.includes('.HEIF')
                ) {
                    const fileURL = URL.createObjectURL(file);

                    const blobRes = await fetch(fileURL);
                    const blob = await blobRes.blob();

                    const converted = await heic2any({
                        blob,
                        toType: 'image/jpeg',
                        quality: 0.5,
                    });

                    file = new File([converted as Blob], `image.jpeg`, {
                        type: 'image/jpeg',
                    });
                    URL.revokeObjectURL(fileURL);
                }

                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = () => {
                    setPreviewImages((prevPreviews) => [
                        ...prevPreviews,
                        reader.result as string,
                    ]);
                }; //для предпросмотра
            });
        }
        setIsLoading(false);
    };

    return isLoading ? (
        <LoadingWithBackground />
    ) : (
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
                    accept="image/*,.img,.png,.jpeg,.jpg,.heic,.HEIC,.heif"
                    multiple={true}
                    max={11}
                    onChange={handleImageChange}
                />
            </div>
            <div className={styles.ann_field_err}>
                {previewImages &&
                    previewImages.length > 10 &&
                    `${t('add-page.please-select')}`}
                {imgSize > 60 && <p>{t('add-page.limit')}</p>}
            </div>
        </div>
    );
};
//62914560
export default LoadPhotoBtn;
