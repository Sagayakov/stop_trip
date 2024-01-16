import { LoadPhotoIcon } from 'shared/ui/icons/loadPhoto';
import { RefObject } from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../annPhoto.module.scss'

interface Props{
    inputRef: RefObject<HTMLInputElement>;
    selectedImages: File[] | undefined;
    setSelectedImages: React.Dispatch<React.SetStateAction<File[] | undefined>>;
    setPreviewImages: React.Dispatch<React.SetStateAction<string[]>>;
}

export const LoadPhotoBtn = ({ inputRef, setSelectedImages, selectedImages, setPreviewImages }:Props) => {
    const { t } = useTranslation();

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = event.target.files
        if(fileList){
            if(selectedImages){
                setSelectedImages((prevImg) => [...prevImg as File[], ...fileList]);
            } else {
                setSelectedImages([...fileList]);
            }

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
                {selectedImages &&
                    selectedImages.length > 10 &&
                    `${t('add-page.please-select')}`}
            </div>
        </div>
    );
};