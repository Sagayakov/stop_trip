import { LoadPhotoIcon } from 'shared/ui/icons/loadPhoto';
import { RefObject } from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../annPhoto.module.scss'

interface Props{
    inputRef: RefObject<HTMLInputElement>
    setSelectedImages: React.Dispatch<
        React.SetStateAction<File[] | undefined>
    >;
}

export const LoadPhotoBtn = ({ inputRef, setSelectedImages }:Props) => {
    const { t } = useTranslation();

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = event.target.files
        if (fileList) {
            setSelectedImages([...fileList])
        }
    };

    return (
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
    );
};